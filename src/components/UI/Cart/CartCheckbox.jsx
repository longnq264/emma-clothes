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
  // console.log(cartItems);

  const dispatch = useDispatch();
  const token = getTokenFromLocalStorage();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      if (token) {
        dispatch(removeCartItem(id));
        dispatch(fetchCarts(token));
      } else {
        const updatedItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedItems);
        saveCartToLocalStorage(updatedItems);
      }
    } else {
      if (token) {
        dispatch(updateCartQuantity({ id, quantity: newQuantity, token }));
      }

      const updatedItems = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      // console.log(updatedItems);

      setCartItems(updatedItems);
      saveCartToLocalStorage(updatedItems);
      dispatch(updateItemQuantity({ id, quantity: newQuantity }));
    }
  };

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
        // console.log("clear cart");
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
        <div className="flex items-center ">
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
      <div className="min-h-72 pt-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="border-gray-100 px-4 py-6 flex justify-between border-t-4"
          >
            <div className="flex">
              <div className="basis-1/5">
                <img
                  src={item.product.image}
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div className="pl-4 basis-4/5">
                <p className="text-base font-bold text-gray-700 mb-2">
                  {item.product.name}
                </p>
                <p className="text-base font-semibold text-gray-700">
                  {Number(item.price).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
                <div className="flex justify-between items-center mt-20">
                  <div className="border rounded-lg hover:bg-stone-300 h-10 px-2 flex items-center">
                    <p className="text-stone-700 text-xs text-center">
                      {item.variant.sku}
                    </p>
                  </div>
                  <div className="size-1/4">
                    <div className="border flex justify-around rounded-lg items-center leading-10">
                      <button
                        className="w-1/3"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <p className="w-1/3 text-center">{item.quantity}</p>
                      <button
                        className="w-1/3"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
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
    </div>
  );
};

export default CartCheckbox;
