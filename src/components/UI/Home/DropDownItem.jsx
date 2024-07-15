import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const DropdownItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="w-full py-3 border-b-2 pl-1 font-semibold flex flex-col cursor-pointer">
      <div
        className="flex items-center justify-between hover:bg-stone-100 py-2 rounded-lg"
        onClick={toggleOpen}
      >
        <p className="font-bold">{title}</p>
        {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </div>
      {isOpen && <div className="mt-2 pl-2 ">{children}</div>}
    </li>
  );
};

export default DropdownItem;
