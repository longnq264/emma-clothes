import { Pagination } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
// import { Carousel } from "antd";
// import background from "../../assets/img/banner-products.jpg";
// import product from "../../assets/img/product1.png";
import { getProducts } from "../../api/fakeApi";
import { useParams } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [quantityProduct, setQuantityProduct] = useState();

  const { role } = useParams();
  //   const [loading, setLoading] = useState(false);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [productPerPage, setProductPerPage] = useState(18);

  const fetchProduct = async (gender) => {
    const response = await getProducts();
    console.log(response);
    const filteredProducts = response.filter(
      (product) => product.gender === gender
    );
    // Lọc sản phẩm theo giới tính
    setProducts(filteredProducts);
    setQuantityProduct(filteredProducts.length);
  };

  useEffect(() => {
    fetchProduct(role);
  }, [role]);
  console.log(role);

  return (
    <>
      <div className="container mx-auto py-2">
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Home</Link>,
            },
            {
              title: (
                <Link to="/products/:role/" className="capitalize text-black">
                  {role}
                </Link>
              ),
            },
          ]}
        />
      </div>
      <div className="container mx-auto py-4">
        <div className="flex">
          <div className="w-2/5">
            <h1 className="uppercase font-bold text-2xl text-stone-700 mb-5">
              {role}
            </h1>
            <p>
              <span className="font-medium text-base">{quantityProduct}</span>{" "}
              products
            </p>
            <div className="my-2">
              <h1 className="font-bold text-2xl">Filter</h1>
              <div>
                <ul className="text-stone-800">
                  <li className="w-full py-3 border-b-2 pl-1 font-semibold flex items-center justify-between cursor-pointer">
                    <p>Gender</p>
                    <FaAngleDown />
                  </li>
                  <li className="w-full py-3 border-b-2 pl-1 font-semibold flex items-center justify-between cursor-pointer">
                    <p>Color</p>
                    <FaAngleDown />
                  </li>
                  <li className="w-full py-3 border-b-2 pl-1 font-semibold flex items-center justify-between cursor-pointer">
                    <p>Size</p>
                    <FaAngleDown />
                  </li>
                  <li className="w-full py-3 border-b-2 pl-1 font-semibold flex items-center justify-between cursor-pointer">
                    <p>Price</p>
                    <FaAngleDown />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pl-4 product-content min-h-screen">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {products.map((res) => (
                <Link
                  key={res.id}
                  to={`http://localhost:5173/products/${role}/${res.id}`}
                >
                  <div className="mx-2 my-2 px-4 pb-4 rounded-lg shadow-md">
                    <img src={res.main_image_url} />
                    <div className="content-product">
                      <h3 className="pb-2">{res.name}</h3>
                      <h1 className="price text-lg font-semibold">
                        {res.price}
                        <span className="text-stone-400 my-2 ml-2 line-through">
                          {res.price_old}
                        </span>
                      </h1>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Pagination
          className="flex justify-center my-4"
          defaultCurrent={1}
          total={20}
        />
      </div>
    </>
  );
};

export default ProductPage;
