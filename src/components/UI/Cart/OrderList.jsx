import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const OrderList = () => {
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  return (
    <div className="cart-detail bg-white basis-2/5 ml-4 p-6">
      <h1 className="font-bold text-xl pb-3">Chi tiết đơn hàng</h1>
      <div className="content order">
        <div className="flex justify-between mb-2">
          <p>Tổng giá trị sản phẩm</p>
          <p>{totalPrice}</p>
        </div>
        <div className="delyvery flex justify-between mb-4">
          <p>Delivery</p>
          <p>Free</p>
        </div>
      </div>
      <p className="text-lg py-2 flex justify-between border-t-2 pt-6">
        <span className="font-bold">Total</span>
        {/* <span className="font-bold">{totalPrice}</span> */}
      </p>
      <NavLink
        to={`/checkout`}
        className="w-full bg-orange-400 hover:bg-orange-300 uppercase text-center py-3 font-bold rounded-lg shadow-lg mt-4 text-white"
      >
        Check out
      </NavLink>
    </div>
  );
};

export default OrderList;
