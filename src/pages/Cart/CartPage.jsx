// import { useContext } from "react";
// import { AppContext } from "../../context/AppContextProvider";

import { useEffect, useState } from "react";
import { listCart } from "../../api/fakeApi";

const CartPage = () => {
  // const { items } = useContext(AppContext);
  // const [quantity, setQuantity] = useState(0)
  const [cart, setCart] = useState([]);
  // const [products, setProducts] = useState([]);
  const getCarts = async () => {
    const response = await listCart();
    setCart(response);
    console.log(response);
  };
  useEffect(() => {
    getCarts();
  }, []);
  console.log("cart Data", cart);
  return (
    <>
      <h1 className="title my-5">Cart</h1>
      <div className="cart container mx-auto px-4">
        {cart.length === 0 && <h1>No items in cart!</h1>}
        {cart.length > 0 && (
          <div className="cart">
            <h1 className="text-center font-bold">{`You have ${cart.length} items in cart!`}</h1>
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex border-2 min-h-32 my-4 px-5 py-4"
              >
                <img className="w-20" src={item.data.img} alt="" />
                <div className="flex justify-between flex-1">
                  <h1 className="px-4">{item.data.name}</h1>
                  <button className="border-2 text-red">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
