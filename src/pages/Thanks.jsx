import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { fetchCarts } from "../store/cartThunk";
import { Button } from "antd";
import { getTokenFromLocalStorage } from "../utils/indexUtils";

const Thanks = () => {
  const dispatch = useDispatch();
  const token = getTokenFromLocalStorage();
  useEffect(() => {
    // Xóa giỏ hàng sau khi đặt đơn thành công
    if (token) {
      dispatch(clearCart());
      localStorage.removeItem("cartItems");
      dispatch(fetchCarts(token));
    }
  }, [dispatch, token]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative max-w-md w-full">
        <div className="relative z-50">
          <h1 className="text-center text-4xl font-bold text-orange-500 mb-4 animate-bounce">
            Cảm ơn bạn đặt sản phẩm của cửa hàng Emma !
          </h1>
          <p className="text-center text-lg text-gray-600 mb-2">
            Bạn đã đặt hàng thành công.
          </p>
          <p className="text-center text-md text-gray-500 mb-4">
            Chúng tôi sẽ xác nhận đơn hàng của bạn trong thời gian sớm nhất.
          </p>
          <div className="text-center mt-6">
            <Button
              type="primary"
              size="large"
              onClick={() => (window.location.href = "/")}
              className="hover:shadow-lg transition duration-300 ease-in-out animate-pulse"
            >
              Tiếp tục mua sắm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
