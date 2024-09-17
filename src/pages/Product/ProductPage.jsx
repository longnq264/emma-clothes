import { Pagination } from "antd";
import { useState, useEffect, useCallback } from "react";
// import { Breadcrumb } from "antd";
import { useParams } from "react-router-dom";
import {
  filterProduct,
  getCategory,
  getProductByCategoryId,
  getProducts,
  getProductsByPriceRange,
} from "../../api/api-server.js";
import NavFilter from "../../components/UI/Product/NavFilter.jsx";
import ListProduct from "../../components/UI/Product/ListProduct.jsx";
import BreadCrumb from "../../components/UI/BreadCrumb.jsx";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [titleName, setTitleName] = useState("");
  const [quantityProduct, setQuantityProduct] = useState(0);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const { id } = useParams();

  const fetchCategory = useCallback(async (categoryId) => {
    try {
      if (categoryId) {
        const response = await getCategory(categoryId);
        setTitleName(response.data.name);
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      let response;

      if (selectedPriceRange) {
        response = await getProductsByPriceRange(
          selectedPriceRange.min,
          selectedPriceRange.max
        );
        setTitleName(
          `Sản phẩm trong khoảng giá: ${selectedPriceRange.min} - ${selectedPriceRange.max}`
        );
      } else if (id === "created_at") {
        response = await filterProduct("created_at");
        setTitleName("Hàng Mới Về");
      } else if (id) {
        response = await getProductByCategoryId(id);
        fetchCategory(id);
      } else {
        response = await getProducts();
        setTitleName("Tất cả sản phẩm");
      }

      const productsData = response.data;
      setProducts(productsData);
      setQuantityProduct(productsData.length);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [id, selectedPriceRange, fetchCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const paginatedProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <BreadCrumb titleName={titleName} href={"/products/:role"} />
      <div className="container mx-auto py-2 md:py-4">
        <div className="md:hidden border-b pb-3 mx-2">{titleName}</div>
        <div className="md:flex">
          <NavFilter
            titleName={titleName}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            setProducts={setProducts}
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
