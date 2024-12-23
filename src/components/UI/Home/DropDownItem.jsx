import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import PropTypes from "prop-types";
// import PropTypes from "prop-types";

const DropdownItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="w-full my-3 font-semibold flex flex-col cursor-pointer">
      <div
        className="flex items-center justify-between hover:bg-stone-100 py-2 rounded-lg pl-2"
        onClick={toggleOpen}
      >
        <p className="font-bold">{title}</p>
        {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </div>
      {isOpen && (
        <div className="mt-2 pl-4 flex flex-wrap w-full">{children}</div>
      )}
    </li>
  );
};

DropdownItem.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
};

export default DropdownItem;
