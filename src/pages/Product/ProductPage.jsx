import { Pagination } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { Carousel } from "antd";
// import product from "../../assets/img/product1.png";
import background from "../../assets/img/banner-products.jpg";
import { getProducts } from "../../api/fakeApi";
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  //   const [loading, setLoading] = useState(false);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [productPerPage, setProductPerPage] = useState(18);
  const fetchProduct = async () => {
    const response = await getProducts();
    console.log(response);
    setProducts(response);
  };

  const contentStyle = {
    height: "140px",
    color: "#fff",
    lineHeight: "100px",
    textAlign: "center",
    background: "#364d79",
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <div className="container mx-auto py-2">
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
      <div className="container mx-auto px-10 py-4">
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
              <Link
                key={res.id}
                to={`http://localhost:5173/products/${res.product_id}`}
              >
                <div className="mx-4">
                  <img src={res.main_image_url} />
                  <div className="content-product">
                    <h3 className="">{res.name}</h3>
                  </div>
                </div>
              </Link>
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
