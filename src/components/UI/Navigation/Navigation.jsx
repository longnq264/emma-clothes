import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../../../api/api-server";

const Navigation = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const response = await getCategories();
    setCategories(response.data[0].children);
    // console.log("categories nav", response.data);
    console.log("categories nav", response.data[0].children);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <nav>
        <ul className="flex">
          {categories.map((item, index) => (
            <li
              className="relative px-4 py-7 list text-stone-800"
              key={item.id}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <NavLink
                to={`/category/${item.id}`}
                state={{ categoryName: item.name }}
              >
                <span className="text-base text-stone-700 font-semibold capitalize">
                  {item.name}
                </span>
              </NavLink>
              {activeIndex === index && item.children && (
                <div
                  className={`min-h-64 fixed left-0 top-20 w-screen bg-white border-t border-gray-100 shadow`}
                >
                  <div className="container mx-auto py-4">
                    <ul className="flex">
                      <li className="w-1/3 border-r-2 pb-4">
                        <NavLink to={"/products"} className="font-bold">
                          Tất Cả Sản Phẩm
                        </NavLink>
                      </li>
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex} className="w-1/3 border-r-2 pb-4">
                          <NavLink
                            to={`/category/${child.id}`}
                            state={{ categoryName: child.name }}
                            className=" px-4 py-2 text-gray-800 font-semibold capitalize"
                          >
                            {child.name}
                          </NavLink>
                          {child.children && (
                            <ul className="ml-4 mt-2">
                              {child.children.map((sub, subIndex) => (
                                <li key={subIndex}>
                                  <NavLink
                                    to={`/category/${sub.id}`}
                                    state={{ categoryName: sub.name }}
                                    className="block py-1 text-gray-600 hover:text-gray-300 capitalize"
                                  >
                                    {sub.name}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
