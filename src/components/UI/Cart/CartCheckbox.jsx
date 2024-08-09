import { useState } from "react";
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../../../utils/indexUtils";

const CartCheckbox = () => {
  const [cartItems, setCartItems] = useState(getCartFromLocalStorage());
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

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
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    saveCartToLocalStorage(updatedItems);
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
