import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { searchKey } from "../../api/api-server";
import { Form, Input } from "antd";
import Logo from "../UI/Home/Logo";

const Search = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mainImage, setMainImage] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const onFinish = (values) => {
    setSearchTerm(values.search);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleSearchClick = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  useEffect(() => {
    if (searchTerm) {
      const fetchProducts = async () => {
        try {
          const result = await searchKey(searchTerm);
          setProducts(result.data);
          setMainImage(result.data.productImages);
          console.log("response", result.data);
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
      <div className="relative ">
        <input
          onClick={handleSearchClick}
          type="text"
          className="text-black placeholder-gray-400 py-2 rounded-full pl-10 focus:outline-none bg-gray-200 hidden lg:block"
          placeholder="Search"
        />
        <FaSearch
          className="absolute left-3 top-3 text-grey-500 hidden lg:block"
          color="gray"
        />
        <button className="hidden bg-stone-600">
          <FaSearch
            className="absolute right-2 top-1 text-stone-700"
            size={18}
          />
        </button>
      </div>
      {isDropdownOpen && (
        <div className="absolute bg-white top-20 left-0 w-full z-10">
          <div className="header-wrap border-b">
            <div className="container mx-auto">
              <div className="flex justify-between py-3">
                <div className="search-wrap">
                  <Logo />
                </div>
                <Form
                  className="relative"
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
                        required: true,
                      },
                    ]}
                  >
                    <div className="search">
                      <Input
                        placeholder="Search"
                        className="placeholder-gray-400 rounded-full focus:outline-none py-2 pl-9 w-full"
                      />
                      <FaSearch
                        className="absolute left-4 top-3 text-grey-500"
                        color="gray"
                      />
                    </div>
                  </Form.Item>
                </Form>

                <button onClick={handleCloseDropdown} className="text-black">
                  Đóng
                </button>
              </div>
            </div>
          </div>
          <div className="container mx-auto">
            <div className="flex">
              {products.length > 0 ? (
                <>
                  {products
                    .slice(0, showAll ? products.length : 4)
                    .map((product) => (
                      <div
                        className="text-black basis-1/4 px-2 my-12"
                        key={product.id}
                      >
                        {mainImage && mainImage.length > 0 ? (
                          <>
                            {mainImage
                              .filter((image) => image.is_thumbnail === 0)
                              .map((image, index) => (
                                <div
                                  key={index}
                                  className="pr-2 py-2 w-40 border "
                                >
                                  <img
                                    src={image.image_url}
                                    alt={`Thumbnail ${index}`}
                                    className="w-full border"
                                  />
                                </div>
                              ))}
                          </>
                        ) : (
                          <div className="min-h-80 text-center border py-10">
                            Nodata
                          </div>
                        )}
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
    </div>
  );
};

export default Search;
