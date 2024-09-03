// import ProgressBar from "./ProgressBar";
import { useSelector } from "react-redux";
import CartCheckbox from "../../components/UI/Cart/CartCheckbox";
import OrderList from "../../components/UI/Cart/OrderList";
import ClearCart from "../../components/UI/Cart/ClearCart";
import ProgressBar from "../../components/UI/Cart/ProgressBar";
import LoadingCart from "../../components/UI/Cart/LoadingCart";

const CartPage = () => {
  const items = useSelector((state) => state.cart.items);
  const cartStatus = useSelector((state) => state.cart.status);
  const error = useSelector((state) => state.cart.error);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  // const delivery = useSelector((state) => state.cart.shippingFee);
  // const discount = useSelector((state) => state.cart.discount);
  const freeShip = useSelector((state) => state.cart.freeship);

  if (cartStatus === "loading") {
    return <LoadingCart />;
  }

  if (cartStatus === "failed") {
    console.log(error);

    return <ClearCart />;
  }
  return (
    <>
      <div className="bg-gray-100 min-h-screen md:py-5">
        <div className="container mx-auto md:px-16">
          {items.length === 0 ? (
            <ClearCart />
          ) : (
            <div className="active">
              <div className="bg-white py-4 px-6 mb-4">
                <h2 className="font-bold text-2xl uppercase">
                  Giỏ hàng của bạn
                </h2>
              </div>
              <div className="md:flex">
                <div className="cart-page basis-3/5">
                  <>
                    <div className="progcess bg-white mb-4">
                      <div className="p-4">
                        {totalPrice >= freeShip ? (
                          <p className="text-sm mb-2">Bạn đã được freeship!</p>
                        ) : (
                          <p className="text-sm mb-2">
                            Bạn cần thêm
                            <span>
                              {" "}
                              {Number(freeShip - totalPrice).toLocaleString(
                                "vi-VN",
                                {
                                  style: "currency",
                                  currency: "VND",
                                }
                              )}{" "}
                              để được freeship.
                            </span>
                          </p>
                        )}
                        <ProgressBar value={totalPrice} maxValue={freeShip} />
                      </div>
                    </div>
                    <CartCheckbox />
                  </>
                </div>
                <OrderList />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
