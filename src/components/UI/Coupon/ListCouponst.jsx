import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import { listCoupons } from "../../../api/coupon";
import { applyCoupon } from "../../../utils/helperFunction";
import SearchCoupon from "./SearchCoupon";
import { AppContext } from "../../../context/AppContext";
const ListCouponst = ({ setMenu, menu, setDiscount, setPriceCheckout }) => {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const [coupons, setCoupons] = useState([]);
  const [inActive, setInActive] = useState([]);
  const { orderDetail, setCouponCode } = useContext(AppContext);
  console.log("inActive", inActive);
  const revertPercent = (number) => {
    const percentage = `${(number / 100) * 100}%`;
    return percentage;
  };

  const revertNumber = (number) => {
    const percentage = (number / 100) * 100;
    return percentage;
  };

  const fetchCoupons = async () => {
    try {
      const response = await listCoupons();
      console.log("response", response.data);
      const activeCoupons = response.data.filter(
        (coupon) => coupon.status === "active"
      );
      const inactiveCoupons = response.data.filter(
        (coupon) => coupon.status === "unactive"
      );
      setCoupons(activeCoupons);
      setInActive(inactiveCoupons);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectCoupon = async (values) => {
    const { discount, code } = JSON.parse(values);
    console.log("handle", discount);
    console.log("handle", code);
    console.log("onchange handle detail", orderDetail);
    const changeDiscount = revertNumber(discount);
    setDiscount(changeDiscount);
    setPriceCheckout(applyCoupon(totalPrice, changeDiscount));
    setCouponCode(code);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);
  return (
    <>
      <div className="list fixed top-40 left-0 z-50 w-full">
        <div className="container mx-auto size-2/5 bg-white rounded-lg">
          <div className="relative px-4 pb-8">
            <p className="text-center py-4 text-2xl font-semibold">
              Mã giảm giá
            </p>
            <SearchCoupon setCoupons={setCoupons} coupons={coupons} />
            <p className="semibold pl-2 text-lg pb-2">Voucher từ EMMA</p>
            <div className="list-voucher flex flex-wrap mb-6 max-h-80 overflow-y-scroll">
              {coupons.map((data) => (
                <div key={data.id} className="basis-1/2 my-2">
                  <div className="flex items-center space-between mx-2 border">
                    <div className="w-24 bg-orange-400 text-center aspect-square flex items-center justify-center">
                      <p className="text-white text-sm font-bold block">EMMA</p>
                    </div>
                    <div className="py-2 px-2 w-full">
                      <p className="text-xs font-semibold opacity-70 cursor-pointer">
                        {data.code}
                      </p>
                      <p className="text-sm">
                        Giảm tối đa{" "}
                        <span className="text-red-800">
                          {revertPercent(data.discount)}
                        </span>{" "}
                        trên tổng hóa đơn
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        HSD: {data.expiration_date}
                      </p>
                    </div>
                    <input
                      type="radio"
                      name="selectedCoupon" // Tên chung cho các radio button
                      value={JSON.stringify({
                        discount: data.discount,
                        code: data.code,
                      })} // Giá trị là id của coupon
                      className="mr-2" // Thêm khoảng cách giữa radio và văn bản
                      onChange={(e) => handleSelectCoupon(e.target.value)} // Hàm xử lý khi chọn coupon
                    />
                  </div>
                </div>
              ))}
              {inActive.map((data) => (
                <div key={data.id} className="basis-1/2 my-2">
                  <div className="flex items-center space-between mx-2 border cursor-not-allowed">
                    <div className="w-24 bg-stone-400 text-center aspect-square flex items-center justify-center">
                      <p className="text-white text-sm font-bold block">EMMA</p>
                    </div>
                    <div className="py-2 px-2 w-full">
                      <p className="text-xs font-semibold opacity-70 cursor-pointer">
                        {data.code}
                      </p>
                      <p className="text-sm">
                        Giảm tối đa{" "}
                        <span className="text-red-800">
                          {revertPercent(data.discount)}
                        </span>{" "}
                        trên tổng hóa đơn
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        HSD: {data.expiration_date}
                      </p>
                    </div>
                    <input
                      type="radio"
                      disabled={true}
                      name="selectedCoupon" // Tên chung cho các radio button
                      value={JSON.stringify({
                        discount: data.discount,
                        code: data.code,
                      })} // Giá trị là id của coupon
                      className="mr-2" // Thêm khoảng cách giữa radio và văn bản
                      onChange={(e) => handleSelectCoupon(e.target.value)} // Hàm xử lý khi chọn coupon
                    />
                  </div>
                </div>
              ))}
            </div>
            <div
              className="cursor-pointer text-center border py-2 text-xl bg-orange-400 hover:bg-orange-200 text-white rounded-lg"
              onClick={() => setMenu(false)}
            >
              Xong
            </div>
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setMenu(false)}
            >
              <IoCloseSharp size={32} />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 bg-black bg-opacity-60 z-40 w-full h-full ${
          menu ? "overflow-hidden" : ""
        }`}
        onClick={() => setMenu(false)}
      ></div>
    </>
  );
};

ListCouponst.propTypes = {
  setMenu: PropTypes.any,
  menu: PropTypes.any,
  setDiscount: PropTypes.any,
  setPriceCheckout: PropTypes.any,
};

export default ListCouponst;
