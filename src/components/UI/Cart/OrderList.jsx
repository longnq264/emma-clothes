import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import PaymentIcon from "./PaymentIcon";
import { calculateTotalPriceAll } from "../../../utils/helperFunction";
import { getTokenFromLocalStorage } from "../../../utils/indexUtils";

const OrderList = () => {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const delivery = useSelector((state) => state.cart.shippingFee);
  const discount = useSelector((state) => state.cart.discount);
  const token = getTokenFromLocalStorage();
  const priceCheckout = calculateTotalPriceAll(totalPrice, delivery, discount);
  return (
    <div className="cart-detail bg-white basis-2/5 md:ml-4 p-6 mt-2 md:mt-0">
      <h1 className="font-bold text-xl mb-5">Chi tiết đơn hàng</h1>
      <div className="content order">
        <div className="flex justify-between mb-4">
          <p>Tổng giá trị sản phẩm</p>
          <p>
            {Number(totalPrice).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>
        <div className="delyvery flex justify-between mb-4 ">
          <p>Vận chuyển</p>
          <p>
            {Number(delivery).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>
      </div>
      <p className="text-lg py-2 mb-6 flex justify-between border-t-2 pt-6">
        <span className="font-bold">Tổng thanh toán</span>
        <span className="font-bold">
          {" "}
          {Number(priceCheckout).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </p>
      <NavLink
        to={token ? `/checkout` : `/auth/login`}
        className="w-full block bg-orange-400 hover:bg-orange-300 uppercase text-center py-3 font-bold rounded-lg shadow-lg mt-4 text-white"
      >
        Thanh Toán
      </NavLink>
      <PaymentIcon />
    </div>
  );
};

export default OrderList;
