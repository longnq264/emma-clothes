import { Pagination } from "antd";
import { useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import { NavLink, useParams } from "react-router-dom";
import {
  getCategory,
  getProductByCategoryId,
  getProducts,
  getProductsByPriceRange,
} from "../../api/api-server.js";
import DropdownItem from "../../components/UI/Home/DropDownItem.jsx";
import { formatCurrency } from "../../utils/helperFunction.js";

const priceRanges = [
  { label: "Dưới 350.000đ", min: 0, max: 350000 },
  { label: "350.000đ - 750.000đ", min: 350000, max: 750000 },
  { label: "750.000đ - 1.000.000đ", min: 750000, max: 1000000 },
];

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [quantityProduct, setQuantityProduct] = useState(0);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2; // Số lượng sản phẩm hiển thị trên mỗi trang
  console.log(products);

  const { id } = useParams();

  const fetchProducts = async () => {
    try {
      let response;
      if (selectedPriceRange) {
        response = await getProductsByPriceRange(
          selectedPriceRange.min,
          selectedPriceRange.max
        );
      } else if (id) {
        response = await getProductByCategoryId(id);
      } else {
        response = await getProducts();
      }
      const productsData = response.data;
      setProducts(productsData);
      setQuantityProduct(productsData.length);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategory = async (id) => {
    const response = await getCategory(id);
    setCategoryId(response.data);
  };

  useEffect(() => {
    fetchProducts();
    if (id) {
      fetchCategory(id);
    }
  }, [id, selectedPriceRange]);

  const handlePriceRangeChange = (item) => {
    if (selectedPriceRange && selectedPriceRange.label === item.label) {
      setSelectedPriceRange(null);
    } else {
      setSelectedPriceRange(item);
    }
  };

  // Tính toán danh sách sản phẩm cho trang hiện tại
  const paginatedProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <div className="container mx-auto py-2">
        <Breadcrumb
          items={[
            {
              title: <NavLink to="/">Trang chủ</NavLink>,
            },
            {
              title: (
                <NavLink to="/products/:role" className="capitalize text-black">
                  {categoryId ? categoryId.name : "Tất cả sản phẩm"}
                </NavLink>
              ),
            },
          ]}
        />
      </div>

      <div className="container mx-auto py-4">
        <div className="flex">
          <div className="basis-1/5 overflow-y-auto max-h-90">
            <h1 className="uppercase font-bold text-2xl text-stone-700 mb-14">
              {id ? (
                <span className="text-4xl">{categoryId?.name}</span>
              ) : (
                "Tất cả sản phẩm"
              )}
            </h1>
            <div className="my-2">
              <h1 className="font-bold text-2xl">Bộ lọc</h1>
              <div>
                <ul className="text-stone-800">
                  <DropdownItem title="Gender">
                    <label className="flex items-center my-2 hover:bg-stone-100 py-2 rounded-lg">
                      <input
                        type="checkbox"
                        className="mr-4 w-4 h-4 border-slate-500"
                      />
                      Unisex
                    </label>
                    <label className="flex items-center my-2 hover:bg-stone-100 py-2 rounded-lg">
                      <input
                        type="checkbox"
                        className="mr-4 w-4 h-4 border-slate-500"
                      />
                      Men
                    </label>
                    <label className="flex items-center my-2 hover:bg-stone-100 py-2 rounded-lg">
                      <input
                        type="checkbox"
                        className="mr-4 w-4 h-4 border-slate-100"
                      />
                      Women
                    </label>
                  </DropdownItem>
                  <DropdownItem title="Màu sắc">
                    <p>Red</p>
                    <p>Blue</p>
                    <p>Green</p>
                  </DropdownItem>
                  <DropdownItem title="Kích thước">
                    <p>Small</p>
                    <p>Medium</p>
                    <p>Large</p>
                  </DropdownItem>
                  <DropdownItem title="Theo giá">
                    {priceRanges.map((item) => (
                      <label
                        key={item.label}
                        className="flex items-center my-2 hover:bg-stone-100 py-2 rounded-lg"
                      >
                        <input
                          type="checkbox"
                          className="mr-4 w-4 h-4 border-slate-500"
                          checked={
                            selectedPriceRange
                              ? selectedPriceRange.label === item.label
                              : false
                          }
                          onChange={() => handlePriceRangeChange(item)}
                        />
                        {item.label}
                      </label>
                    ))}
                  </DropdownItem>
                </ul>
              </div>
            </div>
          </div>

          <div className="basis-4/5 pl-10 min-h-screen">
            <div className="mx-2 py-2">
              <p className="font-bold text-stone-600">
                {quantityProduct} sản phẩm
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {paginatedProducts.map((res) => (
                <NavLink key={res.id} to={`/products/${res.id}`}>
                  <div className="mx-2 my-2 pb-8 shadow-md">
                    <img src="https://res.cloudinary.com/da7r4robk/image/upload/v1717590011/Products/product3_rymfed.png" />
                    <div className="content-product px-4">
                      <h3 className="h-10 box-border text-sm font-semibold text-stone-700">
                        {res.name}
                      </h3>
                      <h1 className="price text-base font-semibold mt-4 text-stone-700">
                        {formatCurrency(res.price)}
                        <span className="text-stone-400 font-semibold my-2 ml-2 line-through text-sm">
                          {formatCurrency(res.price_old)}
                        </span>
                      </h1>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
            <Pagination
              className="flex justify-center mt-10"
              current={currentPage}
              pageSize={pageSize}
              total={products.length}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
