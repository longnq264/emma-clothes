import { NavLink } from "react-router-dom";
const Submenu = (props) => {
  const child = props;
  // console.log(props);
  return (
    <ul className="ml-4 mt-2">
      {child.subCategories.map((sub, subIndex) => (
        <li key={subIndex}>
          <NavLink to={sub.href} className="block px-4 py-1 text-gray-600">
            {sub.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Submenu;
