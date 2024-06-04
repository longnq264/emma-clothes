import axios from "axios";
import { Pagination } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { Carousel } from "antd";
import product from "../../assets/img/product1.png";
import background from "../../assets/img/banner-products.jpg";
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
  const contentStyle = {
    // height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
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
        <div className="carousel my-4">
          <Carousel>
            <div>
              <div style={contentStyle}>
                <img className="w-full" src={background} alt="bg" />
              </div>
            </div>
            <div>
              <h3 style={contentStyle}>
                <img className="w-full" src={background} alt="bg" />
              </h3>
            </div>
          </Carousel>
        </div>
        <h1 className="title">Product Us</h1>
        <div className="product-content min-h-screen">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {products.map((res) => (
              <div key={res.id} className="mx-4">
                <img src={product} />
                <div className="content-product">
                  <h3 className="">{res.name}</h3>
                </div>
              </div>
            ))}
          </div>
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
