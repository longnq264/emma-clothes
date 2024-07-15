import { Pagination } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { getProductByCategoryId } from "../../api/api-server.js";
import { useParams } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import DropdownItem from "../../components/UI/Home/DropDownItem.jsx";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [quantityProduct, setQuantityProduct] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const { id } = useParams();
  const location = useLocation();
  const { categoryName } = location.state || "";

  console.log(id, categoryName);

  const fetchProductByCategory = async (categoryId) => {
    try {
      const response = await getProductByCategoryId(categoryId);
      const productsData = response.data;
      setProducts(productsData);

      setQuantityProduct(productsData.length);
      console.log("Products:", productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProductByCategory(id);
  }, [id]);

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
                <Link to="/products/:role" className="capitalize text-black">
                  {categoryName}
                </Link>
              ),
            },
          ]}
        />
      </div>
      <div className="container mx-auto py-4">
        <div className="flex">
          <div className="basis-1/5 overflow-y-auto max-h-90">
            <h1 className="uppercase font-bold text-2xl text-stone-700 mb-5">
              {categoryName}
            </h1>
            <p>
              <span className="font-medium text-base">{quantityProduct} </span>
              products
            </p>
            <div className="my-2">
              <h1 className="font-bold text-2xl">Filter</h1>
              <div>
                <ul className="text-stone-800">
                  <DropdownItem title="Gender">
                    {/* Nội dung con của Gender */}
                    <p>Male</p>
                    <p>Female</p>
                    <p>Other</p>
                  </DropdownItem>
                  <DropdownItem title="Color">
                    {/* Nội dung con của Color */}
                    <p>Red</p>
                    <p>Blue</p>
                    <p>Green</p>
                  </DropdownItem>
                  <DropdownItem title="Size">
                    {/* Nội dung con của Size */}
                    <p>Small</p>
                    <p>Medium</p>
                    <p>Large</p>
                  </DropdownItem>
                  <DropdownItem title="Price">
                    {/* Nội dung con của Price */}
                    <p>Under $50</p>
                    <p>$50 - $100</p>
                    <p>Over $100</p>
                  </DropdownItem>
                  <li className="w-full py-3 border-b-2 pl-1 font-semibold flex flex-col cursor-pointer">
                    <div
                      className="flex items-center justify-between"
                      onClick={toggleOpen}
                    >
                      <p>Price</p>
                      {isOpen ? <FaAngleUp /> : <FaAngleDown />}
                    </div>
                    {isOpen && (
                      <div className="mt-2 pl-2">
                        <form action="">
                          <div>
                            <input type="checkbox" id="1" />
                            <label htmlFor="1">Duoi 350.000</label>
                          </div>
                          <div>
                            <input type="checkbox" id="1" />
                            <label htmlFor="1">Tu 350.000 - 750.000</label>
                          </div>
                          <div>
                            <input type="checkbox" id="1" />
                            <label htmlFor="1">Tren 750.000</label>
                          </div>
                        </form>
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="basis-4/5 pl-4 min-h-screen">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {products.map((res) => (
                <Link
                  key={res.id}
                  to={`http://localhost:5173/products/${res.id}`}
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
