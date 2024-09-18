import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { fetchCarts } from "../store/cartThunk";

const Thanks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Xóa giỏ hàng sau khi đặt đơn thành công
    dispatch(clearCart());
    localStorage.removeItem("cartItems");
    dispatch(fetchCarts());
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      <div className="my-4">
        <h1 className="text-center text-4xl font-bold">Cảm ơn bạn!</h1>
        <p className="text-center text-lg my-2">Bạn đã đặt hàng thành công.</p>
 
        <div className="text-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.href = '/'}
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
