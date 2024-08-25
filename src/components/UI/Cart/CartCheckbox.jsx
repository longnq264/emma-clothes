import { useState } from "react";
import { MdDelete } from "react-icons/md";
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
import {
  removeItemFromCart,
  updateItemQuantity,
  clearCart as removeCarts,
} from "../../../store/cartSlice";
import { clearCart } from "../../../api/api-server";

const CartCheckbox = () => {
  const [cartItems, setCartItems] = useState(getCartFromLocalStorage());
  console.log(cartItems);

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
    if (!token) {
      dispatch(removeCarts());
      localStorage.removeItem("cartItems");
    } else {
      try {
        await clearCart(token);
        console.log("clear cart");
        await dispatch(fetchCarts(token));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRemoveItem = (id) => {
    if (token) {
      dispatch(removeCartItem(id));
      dispatch(fetchCarts(token));
    } else {
      dispatch(removeItemFromCart(id));
      const updatedItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedItems);
      saveCartToLocalStorage(updatedItems);
    }
  };
  return (
    <div className="bg-white">
      <div className="item px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <p className="py-2 font-bold">Số lượng sản phẩm: </p>
          <p className="pl-2 py-2 font-bold">{totalQuantity} sản phẩm</p>
        </div>
        <button
          className="border px-2 py-2 font-bold rounded-lg hover:bg-stone-300"
          onClick={handleRemoveAllItems}
        >
          <MdDelete size={20} />
        </button>
      </div>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="border-t-4 border-gray-100 px-4 py-6 flex justify-between"
        >
          <div className="flex">
            <div className="w-32">
              <img src={item.product.image} alt="" />
            </div>
            <div className="pl-4">
              <p className="text-base font-bold text-gray-700 mb-2">
                {item.product.name}
              </p>
              <p className="text-base font-semibold text-gray-700">
                {Number(item.price).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <div className="mt-6">
                <div className="quantity-control">
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
                <div className="border rounded-lg hover:bg-stone-300 h-10 w-28 pl-3 mt-4 flex items-center">
                  <p className="text-stone-700 text-xs text-center">
                    {item.variant.sku}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button
            className="border px-2 py-2 font-bold rounded-lg hover:bg-stone-200 h-10"
            onClick={() => handleRemoveItem(item.id)}
          >
            <MdDelete size={20} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartCheckbox;
