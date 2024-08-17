import { useState } from "react";
import {
  getCartFromLocalStorage,
  getTokenFromLocalStorage,
  saveCartToLocalStorage,
} from "../../../utils/indexUtils";
import { useDispatch } from "react-redux";
import {
  fetchCarts,
  removeCartItem,
  updateCartQuantity,
} from "../../../store/cartThunk";
import { updateItemQuantity } from "../../../store/cartSlice";
import { clearCart } from "../../../api/api-server";

const CartCheckbox = () => {
  const [cartItems, setCartItems] = useState(getCartFromLocalStorage());

  const dispatch = useDispatch();
  const token = getTokenFromLocalStorage();

  // Xử lý thay đổi số lượng sản phẩm
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      // Nếu số lượng <= 0, xóa sản phẩm khỏi giỏ hàng
      if (token) {
        // Nếu có token, gọi API để xóa sản phẩm
        dispatch(removeCartItem(id));
        dispatch(fetchCarts(token));
      } else {
        // Nếu không có token, chỉ cần cập nhật giỏ hàng trong state và localStorage
        const updatedItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedItems);
        saveCartToLocalStorage(updatedItems);
      }
    } else {
      // Nếu số lượng > 0, cập nhật số lượng sản phẩm
      if (token) {
        // Nếu có token, gọi API để cập nhật số lượng sản phẩm
        dispatch(updateCartQuantity({ id, quantity: newQuantity, token }));
      }
      // Cập nhật số lượng trong state và localStorage
      const updatedItems = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      console.log(updatedItems);

      setCartItems(updatedItems);
      saveCartToLocalStorage(updatedItems);
      dispatch(updateItemQuantity({ id, quantity: newQuantity }));
    }
  };

  // Tính tổng số lượng sản phẩm
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const handleRemoveAllItems = async () => {
    try {
      await clearCart(token);
      console.log("clear cart");
      await dispatch(fetchCarts(token));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeCartItem(id));
    dispatch(fetchCarts(token));
  };
  return (
    <div className="bg-white">
      <div className="item px-4 py-2 flex justify-between items-center">
        <label className="flex  items-center font-bold">
          <p>Select All</p>
        </label>
        <button
          className="border px-4 py-2 font-bold"
          onClick={handleRemoveAllItems}
        >
          X
        </button>
      </div>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="border-t-4 border-gray-100 px-4 py-6 flex justify-between items-center"
        >
          <div className="flex">
            <div className="w-32 p-2">
              <img src={item.product.image} alt="" />
            </div>
            <div className="pl-4">
              <p className="text-sm font-bold text-gray-700 mb-2">
                {item.product.name}
              </p>
              <p className="font-semibold text-sm text-gray-700">
                {Number(item.price).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>

              <div className="quantity-control mt-10">
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                >
                  -
                </button>
                {item.quantity}
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <p className="text-stone-700 text-xs border py-2 pl-3 w-28 rounded-lg hover:bg-stone-300">
                {item.variant.sku}
              </p>
            </div>
          </div>
          <button
            className="border px-4 py-2 font-bold"
            onClick={() => handleRemoveItem(item.id)}
          >
            X
          </button>
        </div>
      ))}
      <div className="pl-4 py-2">Total Quantity: {totalQuantity}</div>
    </div>
  );
};

export default CartCheckbox;
