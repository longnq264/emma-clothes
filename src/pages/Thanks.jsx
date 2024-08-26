import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCarts } from "../store/cartThunk";

const Thanks = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch]);
  return (
    <div className="container mx-auto">
      <div className="my-4">
        <h1 className="text-center text-4xl">Thank you </h1>
        <p className="text-center">Checkout done</p>
      </div>
    </div>
  );
};

export default Thanks;
