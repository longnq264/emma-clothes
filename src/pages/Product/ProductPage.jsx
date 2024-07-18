import { Pagination } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { getProductByCategoryId } from "../../api/api-server.js";
import { useParams } from "react-router-dom";
import DropdownItem from "../../components/UI/Home/DropDownItem.jsx";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [quantityProduct, setQuantityProduct] = useState(0);
  // const [isOpen, setIsOpen] = useState(false);

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
            <p className="font-semibold text-gray-600 my-4">
              <span className="font-semibold text-gray-600">
                {quantityProduct}{" "}
              </span>
              products
            </p>
            <div className="my-2">
              <h1 className="font-bold text-2xl">Filter</h1>
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
                  <DropdownItem title="Color">
                    <p>Red</p>
                    <p>Blue</p>
                    <p>Green</p>
                  </DropdownItem>
                  <DropdownItem title="Size">
                    <p>Small</p>
                    <p>Medium</p>
                    <p>Large</p>
                  </DropdownItem>
                  <DropdownItem title="Price">
                    <label className="flex items-center my-2 hover:bg-stone-100 py-2 rounded-lg">
                      <input
                        type="checkbox"
                        className="mr-4 w-4 h-4 border-slate-500"
                      />
                      Under $50
                    </label>
                    <label className="flex items-center my-2 hover:bg-stone-100 py-2 rounded-lg">
                      <input
                        type="checkbox"
                        className="mr-4 w-4 h-4 border-slate-500"
                      />
                      $50 - $100
                    </label>
                    <label className="flex items-center my-2 hover:bg-stone-100 py-2 rounded-lg">
                      <input
                        type="checkbox"
                        className="mr-4 w-4 h-4 border-slate-100"
                      />
                      Over $100
                    </label>
                  </DropdownItem>
                </ul>
              </div>
            </div>
          </div>
          <div className="basis-4/5 pl-4 min-h-screen">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {products.map((res) => (
                <Link key={res.id} to={`/products/${res.id}`}>
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
