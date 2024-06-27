import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "../../../constants";
import { useState } from "react";

const Navigation = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <>
      <nav>
        <ul className="flex">
          {NAV_LINKS.map((item, index) => (
            <li
              className="relative px-4 py-7 list text-stone-800"
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <NavLink to={item.key}>
                {/* {console.log(data)} */}
                <span className="text-base text-stone-700 font-semibold">
                  {item.label}
                </span>
              </NavLink>
              {activeIndex === index && item.children && (
                <div
                  className={`min-h-64 fixed left-0 top-20 w-screen bg-white border-t border-gray-100 shadow`}
                >
                  <div className="container mx-auto py-4">
                    <ul className="flex">
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex} className="w-1/3 border-r-2 pb-4">
                          <NavLink
                            to={child.href}
                            className=" px-4 py-2 text-gray-800 font-semibold"
                          >
                            {child.label}
                          </NavLink>
                          {child.subCategories && (
                            <ul className="ml-4 mt-2">
                              {child.subCategories.map((sub, subIndex) => (
                                <li key={subIndex}>
                                  <NavLink
                                    to={sub.href}
                                    className="block py-1 text-gray-600 hover:text-gray-300"
                                  >
                                    {sub.label}
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
