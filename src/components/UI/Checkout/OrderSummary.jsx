import { getCartFromLocalStorage } from "../../../utils/indexUtils";

const OrderSummary = () => {
  const cartItems = getCartFromLocalStorage();
  return (
    <div className="order-summary min-h-screen">
      <h2 className="text-base font-bold pb-6">Thông tin sản phẩm</h2>
      <div>
        {cartItems.map((item) => (
          <div key={item.id} className="flex">
            <div className="img w-24">
              <img src={item.product.image} alt="" />
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
      <div className="total-price"></div>
    </div>
  );
};

export default OrderSummary;
