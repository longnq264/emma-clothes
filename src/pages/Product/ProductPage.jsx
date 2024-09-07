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
import NavFilter from "../../components/UI/Product/NavFilter.jsx";
import ListProduct from "../../components/UI/Product/ListProduct.jsx";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [quantityProduct, setQuantityProduct] = useState(0);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Số lượng sản phẩm hiển thị trên mỗi trang

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

  const paginatedProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <div className="container mx-auto px-2 md:px-0 md:pt-4">
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
        <div className="md:flex">
          <NavFilter
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            categoryId={categoryId}
            id={id}
          />
          <ListProduct
            quantityProduct={quantityProduct}
            paginatedProducts={paginatedProducts}
          />
        </div>
        <Pagination
          className="flex justify-center mt-10"
          current={currentPage}
          pageSize={pageSize}
          total={products.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
};

export default ProductPage;
