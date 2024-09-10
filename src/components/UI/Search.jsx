import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { searchKey } from "../../api/api-server";
import { Form, Input } from "antd";
import Logo from "../UI/Home/Logo";
import { IoCloseSharp } from "react-icons/io5";
import ProductImage from "./Product/ProductImage";
const Search = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const onFinish = (values) => {
    setSearchTerm(values.search);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (searchTerm) {
      const fetchProducts = async () => {
        try {
          const result = await searchKey(searchTerm);
          setProducts(result.data);
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      };
      fetchProducts();
    } else {
      setProducts([]); // Clear products if searchTerm is empty
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTerm) {
      setProducts([]); // Clear products when searchTerm is cleared
      setShowAll(false); // Reset showAll state
    }
  }, [searchTerm]);

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
    setSearchTerm("");
    setProducts([]);
    setShowAll(false);
  };

  return (
    <div className="flex items-center">
      <div
        className="bg-gray-400 p-3 rounded-full cursor-pointer hidden lg:block"
        onClick={() => setIsDropdownOpen(true)}
      >
        <FaSearch className=" text-grey-500" color="white" />
        <button className="hidden bg-stone-600">
          <FaSearch className="absolute right-2 top-1 text-white" size={18} />
        </button>
      </div>
      {isDropdownOpen && (
        <div className="absolute bg-white top-20 left-0 w-full z-50">
          <div className="header-wrap border-b">
            <div className="container mx-auto">
              <div className="flex justify-between items-center py-2">
                <div className="search-wrap">
                  <Logo />
                </div>
                <div className="mt-6 box-border w-1/3">
                  <Form
                    className=""
                    name="search"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      name="search"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                    >
                      <div className="search flex items-center">
                        <Input
                          placeholder="Search"
                          className="relative placeholder-gray-400 rounded-full focus:outline-none py-3 pl-12 w-full text-base"
                        />
                        <FaSearch
                          size={16}
                          className="absolute top-5 left-6 text-grey-500 flex flex-start"
                          color="gray"
                        />
                      </div>
                    </Form.Item>
                  </Form>
                </div>

                <button onClick={handleCloseDropdown} className="text-black">
                  <IoCloseSharp size={30} />
                </button>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-20">
            <div className="flex flex-wrap">
              {products.length > 0 ? (
                <>
                  {products
                    .slice(0, showAll ? products.length : 4)
                    .map((product) => (
                      <div
                        className="text-black basis-1/4 px-2 my-12"
                        key={product.id}
                      >
                        <ProductImage images={product.productImages} />

                        <p className="py-2">{product.name}</p>
                        <p className="font-bold">{product.price}</p>
                      </div>
                    ))}
                </>
              ) : (
                <div></div>
              )}
            </div>
            {!showAll && products.length > 4 && (
              <div className="flex items-center justify-center">
                <button
                  onClick={handleShowMore}
                  className="mb-20 mt-6 border border-black px-5 py-2 rounded-full font-bold text-black"
                >
                  Xem tất cả
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {isDropdownOpen && (
        <>
          <div
            className="fixed top-48 mt-1 left-0 inset-0 bg-black bg-opacity-40 z-40 min-h-screen"
            onClick={() => setIsDropdownOpen(false)}
          ></div>
        </>
      )}
    </div>
  );
};

export default Search;
