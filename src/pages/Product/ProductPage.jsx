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
import { formatCurrency } from "../../utils/helperFunction.js";
import ProductImage from "../../components/UI/Product/ProductImage.jsx";
import NavFilter from "../../components/UI/Product/NavFilter.jsx";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [quantityProduct, setQuantityProduct] = useState(0);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20; // Số lượng sản phẩm hiển thị trên mỗi trang
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

  // Tính toán danh sách sản phẩm cho trang hiện tại
  const paginatedProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <div className="container mx-auto px-2 md:px-0">
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
      <div className="container mx-auto py-2 md:py-4">
        <div className="md:hidden border-b pb-3 mx-2">
          {id ? (
            <span className="text-4xl">{categoryId?.name}</span>
          ) : (
            <span className="text-3xl">Tất cả sản phẩm</span>
          )}
        </div>
        <div className="flex">
          <NavFilter
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            categoryId={categoryId}
            id={id}
          />
          <div className="md:basis-4/5 md:pl-10 min-h-screen">
            <div className="mx-2 py-2">
              <p className="font-bold text-stone-600">
                {quantityProduct} sản phẩm
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {paginatedProducts.map((res) => (
                <NavLink key={res.id} to={`/products/${res.id}`}>
                  <div className="mx-2 my-2 pb-4 shadow-md">
                    {/* <img src={res.productImages[0].image_url} /> */}
                    <ProductImage images={res.productImages} />
                    <div className="content-product px-4 py-2">
                      <h3 className="h-10 box-border text-sm font-semibold text-stone-700 pt-2">
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
