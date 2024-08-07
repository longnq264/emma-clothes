import { Pagination } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import {
  getCategory,
  getProductByCategoryId,
  getProducts,
} from "../../api/api-server.js";
import { useParams } from "react-router-dom";
import DropdownItem from "../../components/UI/Home/DropDownItem.jsx";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [quantityProduct, setQuantityProduct] = useState(0);
  const [categoryId, setCategoryId] = useState(products);

  const { id } = useParams();
  console.log(id);
  const fetchProducts = async () => {
    try {
      let response;
      if (id) {
        response = await getProductByCategoryId(id);
      } else {
        response = await getProducts();
      }

      const productsData = response.data;
      setProducts(productsData);
      setQuantityProduct(productsData.length);
      console.log("Products:", productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchCategory = async (id) => {
    const response = await getCategory(id);
    setCategoryId(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategory(id);
  }, [id]);
  return (
    <>
      {/* ----- Breadcrumb ----------- */}
      <div className="container mx-auto py-2">
        <Breadcrumb
          items={[
            {
              title: <NavLink to="/">Home</NavLink>,
            },
            {
              title: (
                <NavLink to="/products/:role" className="capitalize text-black">
                  {categoryId.name}
                </NavLink>
              ),
            },
          ]}
        />
      </div>
      {/* ------- Layout ---------- */}
      <div className="container mx-auto py-4">
        <div className="flex">
          {/* nav bar filter */}
          <div className="basis-1/5 overflow-y-auto max-h-90">
            <h1 className="uppercase font-bold text-2xl text-stone-700 mb-5">
              {categoryId.name}
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
          {/* layout */}
          <div className="basis-4/5 pl-4 min-h-screen">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {products.map((res) => (
                <NavLink key={res.id} to={`/products/${res.id}`}>
                  <div className="mx-2 my-2 px-4 pb-4 rounded-lg shadow-md">
                    <img src="https://res.cloudinary.com/da7r4robk/image/upload/v1717590011/Products/product3_rymfed.png" />
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
                </NavLink>
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
