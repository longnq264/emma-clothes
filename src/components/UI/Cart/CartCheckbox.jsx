import { useState } from "react";
import {
  getCartFromLocalStorage,
  getTokenFromLocalStorage,
  saveCartToLocalStorage,
} from "../../../utils/indexUtils";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartQuantity } from "../../../store/cartThunk";

const CartCheckbox = () => {
  const [cartItems, setCartItems] = useState(getCartFromLocalStorage());
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const dispatch = useDispatch();
  const token = getTokenFromLocalStorage();
  // Xử lý thay đổi trạng thái chọn tất cả sản phẩm
  const handleSelectAllChange = (isChecked) => {
    if (isChecked) {
      setSelectedItems(cartItems);
    } else {
      setSelectedItems([]);
    }
    setIsAllSelected(isChecked);
  };

  // Xử lý thay đổi trạng thái chọn từng sản phẩm
  const handleItemChange = (item) => {
    setSelectedItems((prevSelectedItems) => {
      const isSelected = prevSelectedItems.some(
        (selectedItem) => selectedItem.id === item.id
      );

      if (isSelected) {
        return prevSelectedItems.filter(
          (selectedItem) => selectedItem.id !== item.id
        );
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  // Xử lý thay đổi số lượng sản phẩm
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      // Nếu số lượng <= 0, xóa sản phẩm khỏi giỏ hàng
      if (token) {
        // Nếu có token, gọi API để xóa sản phẩm
        dispatch(removeCartItem(id));
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
      setCartItems(updatedItems);
      saveCartToLocalStorage(updatedItems);
    }
  };

  // Tính tổng số lượng sản phẩm
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="bg-white">
      <div className="item px-4 py-2 flex items-center">
        <label className="flex items-center font-bold">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={(e) => handleSelectAllChange(e.target.checked)}
          />{" "}
          <p>Select All</p>
        </label>
      </div>
      {/* <div></div> */}
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="border-t-4 border-gray-100 px-4 py-6 flex items-center"
        >
          <div className="flex">
            <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              onChange={() => handleItemChange(item)}
            />
            <div>
              <p className="text-sm font-bold text-gray-700 mb-2">
                {item.name}
              </p>
              <p className="font-semibold text-sm text-gray-700">
                {item.price}
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
            </div>
          </div>
        </div>
      ))}
      <div>Total Quantity: {totalQuantity}</div>
    </div>
  );
};

export default CartCheckbox;
