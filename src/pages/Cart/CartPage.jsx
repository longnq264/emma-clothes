// import { useContext } from "react";
// import { AppContext } from "../../context/AppContext";
import emptyImg from "../../assets/img/emty.jpg";
import { NavLink } from "react-router-dom";
// import ProgressBar from "./ProgressBar";
// import { listCart } from "../../api/api-server";
import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import { fetchCarts } from "../../store/cartThunk";
import CartCheckbox from "../../components/UI/Cart/CartCheckbox";

const CartPage = () => {
  // const dispatch = useDispatch();
  // const token = useSelector((state) => state.auth.token);
  const items = useSelector((state) => state.cart.items);
  const cartStatus = useSelector((state) => state.cart.status);
  const error = useSelector((state) => state.cart.error);

  console.log(items);

  if (cartStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (cartStatus === "failed") {
    return <div>Error loading cart: {error}</div>;
  }

  // fetchCart();

  //Note ---------------------------------------------------------------------------------------------------------------------------
  // total Price
  // api add, change quantity, remove all cart
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
                  <>
                    {/* Progcess */}
                    <div className="progcess bg-white mb-4">
                      {/* <div className="p-4">
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
                        </div> */}
                    </div>
                    <CartCheckbox />
                  </>
                </div>
                <div className="cart-detail bg-white basis-2/5 ml-4 p-6">
                  <h1 className="font-bold text-xl pb-3">Order Summary</h1>
                  <div className="content order">
                    <div className="flex justify-between mb-2">
                      {/* <p>{totalQuantity} item</p>
                      <p>{totalPrice}</p> */}
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
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
