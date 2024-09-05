import { useSelector } from "react-redux";
import { getCartFromLocalStorage } from "../../../utils/indexUtils";
import {
  calculateTotalPriceAll,
  formatCurrency,
} from "../../../utils/helperFunction";

const OrderSummary = () => {
  const cartItems = getCartFromLocalStorage();
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const delivery = useSelector((state) => state.cart.shippingFee);
  const discount = useSelector((state) => state.cart.discount);
  const priceCheckout = calculateTotalPriceAll(totalPrice, delivery, discount);

  return (
    <div className="md:size-3/5 px-6 md:pl-14 order-summary md:min-w-96 pb-6">
      <h2 className="text-base font-bold pb-5">Thông tin sản phẩm</h2>
      <div className="border-b pb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex py-2">
            <div className="img min-w-20 bg-stone-200">
              <img className="object-fill" src={item.product.image} alt="" />
            </div>
            <div className="content-order pl-4 text-stone-800">
              <p className="text-sm font-bold">{item.product.name}</p>
              <p className="text-xs">{item.variant.sku}</p>
              <p className="text-sm font-bold mt-16">
                {" "}
                {Number(item.product.price).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="price py-2 text-stone-600 text-sm">
        <div className="total-price flex justify-between pt-2">
          <p>Tổng giá trị sản phẩm</p>
          <p>{formatCurrency(totalPrice)}</p>
        </div>
        <div className="flex justify-between pt-2">
          <p>Vận chuyển</p>
          <p>{formatCurrency(delivery)}</p>
        </div>
        <div className="flex justify-between border-b py-2">
          <p>Khuyến mãi</p>
          <p>{formatCurrency(discount)}</p>
        </div>
      </div>
      <div className="totalPrice flex justify-between text-xl py-2">
        <p className="font-bold">Tổng thanh toán</p>
        <p className="font-bold">{formatCurrency(priceCheckout)}</p>
      </div>
    </div>
  );
};

export default OrderSummary;
