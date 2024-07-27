import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

const OrderSummary = () => {
  const { items, totalPrice } = useContext(AppContext);
  return (
    <div className="order-summary">
      <h2>Tóm Tắt Đơn Hàng</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} x {item.price} VND
          </li>
        ))}
      </ul>
      <div className="total-price">
        <strong>Tổng cộng:</strong> {totalPrice} VND
      </div>
    </div>
  );
};

export default OrderSummary;
