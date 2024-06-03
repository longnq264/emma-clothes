import { Pagination } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  //   const [loading, setLoading] = useState(false);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [productPerPage, setProductPerPage] = useState(18);
  const fetchProduct = async () => {
    const response = await axios.get("http://localhost:3000/products");
    console.log(response.data);
    setProducts(response.data);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <div className="breadcrumb-site">
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Home</Link>,
            },
            {
              title: <Link to="/products">Products</Link>,
            },
          ]}
        />
      </div>
      <div className="products-site">
        <h1 className="title">Product Us</h1>
        <div className="product-content min-h-screen">
          {products.map((res) => (
            <div key={res.id}>
              <h3>{res.name}</h3>
            </div>
          ))}
        </div>
        <Pagination
          className="flex justify-center"
          defaultCurrent={1}
          total={20}
        />
      </div>
    </>
  );
};

export default ProductPage;
