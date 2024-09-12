import { useState } from "react";
import ListCouponst from "./ListCouponst";
import { BiSolidCoupon } from "react-icons/bi";
import { RiArrowDropRightLine } from "react-icons/ri";

const Coupons = () => {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <div
        onClick={() => setMenu(true)}
        className="border-b flex justify-between items-center cursor-pointer hover:bg-stone-100 rounded-lg"
      >
        <p className="flex items-center py-2 pl-2">
          <BiSolidCoupon size={22} />{" "}
          <span className="pl-2 semibold">Mã giảm giá</span>
        </p>
        <RiArrowDropRightLine size={30} />
      </div>
      {menu ? (
        <>
          <ListCouponst setMenu={setMenu} menu={menu} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Coupons;
