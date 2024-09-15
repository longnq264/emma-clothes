import PropTypes from "prop-types";
import { useState } from "react";
import { BiSolidCoupon } from "react-icons/bi";
import { RiArrowDropRightLine } from "react-icons/ri";
import ListCouponst from "./ListCouponst";

const Coupons = ({ setDiscount, setPriceCheckout }) => {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <div
        onClick={() => setMenu(true)}
        className="border-b flex justify-between items-center cursor-pointer hover:bg-stone-100 rounded-lg"
      >
        <p className="flex items-center py-2 pl-2">
          <BiSolidCoupon size={22} className="text-orange-400" />{" "}
          <span className="pl-2 semibold">Mã giảm giá</span>
        </p>
        <RiArrowDropRightLine size={30} />
      </div>
      {menu ? (
        <>
          <ListCouponst
            setMenu={setMenu}
            menu={menu}
            setDiscount={setDiscount}
            setPriceCheckout={setPriceCheckout}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
Coupons.propTypes = {
  setMenu: PropTypes.any,
  menu: PropTypes.any,
  setDiscount: PropTypes.any,
  setPriceCheckout: PropTypes.any,
};
export default Coupons;
