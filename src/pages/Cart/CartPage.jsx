import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import emptyImg from "../../assets/img/emty.jpg";
import { NavLink } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const CartPage = () => {
  const {
    items,
    selectedItems,
    isAllSelected,
    handleItemChange,
    handleSelectAllChange,
    updateItemQuantity,
    removeItemFromCart,
    totalQuantity,
    totalPrice,
  } = useContext(AppContext);

  const freeShipThreshold = 1000000; // 1 triệu VND

  console.log("item", items);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItemFromCart(itemId);
    } else {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen py-5">
        <div className="container mx-auto px-16">
          {items.length === 0 ? (
            <div className="">
              <h1 className="text-2xl font-bold text-center my-4">
                No item in Cart!
              </h1>
              <div className="w-3/12 container mx-auto">
                <img
                  className="grid place-items-center"
                  src={emptyImg}
                  alt=""
                />
              </div>
              <div className="grid place-items-center my-10">
                <NavLink to="/products">
                  <button className="px-20 py-3 border-2 bg-stone-600 transition-colors duration-300 ease-in-out hover:bg-stone-400 font-bold text-md text-white rounded-md uppercase">
                    Shopping now
                  </button>
                </NavLink>
              </div>
            </div>
          ) : (
            <div className="active">
              <div className="bg-white py-4 px-6 mb-4">
                <h2 className="font-bold text-2xl uppercase">Cart</h2>
              </div>
              <div className="flex">
                <div className="cart-page basis-3/5">
                  {items.length > 0 && (
                    <>
                      <div className="progcess bg-white mb-4">
                        <div className="p-4">
                          {totalPrice >= freeShipThreshold ? (
                            <p className="text-sm mb-2">
                              Bạn đã được freeship!
                            </p>
                          ) : (
                            <p className="text-sm mb-2">
                              Bạn cần thêm {freeShipThreshold - totalPrice} VND
                              để được freeship.
                            </p>
                          )}
                          <ProgressBar
                            value={totalPrice}
                            maxValue={freeShipThreshold}
                          />
                        </div>
                      </div>
                      <div className="cart bg-white">
                        <div className="item px-4 py-2 flex items-center">
                          <label className="flex items-center font-bold">
                            {/* Select All Checkbox */}
                            <input
                              className="h-5 w-5 mr-4 bg-black"
                              type="checkbox"
                              checked={isAllSelected}
                              onChange={(e) =>
                                handleSelectAllChange(e.target.checked)
                              }
                            />
                            Select All
                          </label>
                        </div>
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="border-t-4 border-gray-100 px-4 py-6 flex items-center"
                          >
                            <div className="flex">
                              <label>
                                <input
                                  className="h-5 w-5 mr-4"
                                  type="checkbox"
                                  checked={selectedItems.some(
                                    (selectedItem) =>
                                      selectedItem.id === item.id
                                  )}
                                  onChange={() => handleItemChange(item)}
                                />
                              </label>
                              <div className="content-detail">
                                <p className="text-sm font-bold text-gray-700 mb-2">
                                  {item.name}
                                </p>
                                <p className="font-semibold text-sm text-gray-700">
                                  {item.price}
                                </p>
                                <div className="quantity-control mt-10">
                                  <button
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.id,
                                        item.quantity - 1
                                      )
                                    }
                                  >
                                    -
                                  </button>
                                  <span>{item.quantity}</span>
                                  <button
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.id,
                                        item.quantity + 1
                                      )
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="cart-detail bg-white basis-2/5 ml-4 p-6">
                  <h1 className="font-bold text-xl pb-3">Order Summary</h1>
                  <div className="content order">
                    <div className="flex justify-between mb-2">
                      <p>{totalQuantity} item</p>
                      <p>{totalPrice}</p>
                    </div>
                    <div className="delyvery flex justify-between mb-4">
                      <p>Delivery</p>
                      <p>Free</p>
                    </div>
                  </div>
                  <p className="text-lg py-2 flex justify-between border-t-2 pt-6">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">{totalPrice}</span>
                  </p>
                  <NavLink
                    to={`/checkout`}
                    className="w-full bg-orange-400 hover:bg-orange-300 uppercase text-center py-3 font-bold rounded-lg shadow-lg mt-4 text-white"
                  >
                    Check out
                  </NavLink>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
