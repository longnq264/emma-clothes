import { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";
import { useEffect } from "react";
// import { listCart } from "../../api/fakeApi";

const CartPage = () => {
  // const [quantity, setQuantity] = useState(0)
  const { items } = useContext(AppContext);
  console.log(items);
  // const [cart, setCart] = useState([]);

  // const handleRemoveFormCart = async (id) => {
  //   const response = await removeCart(id);
  //   console.log(response);
  //   setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  // };
  // const totoPrice = items.reduce((accumulator, item) => {
  //   accumulator + item.price * item.quantity, 0;
  // });

  useEffect(() => {
    // const getCarts = async () => {
    //   const response = await listCart();
    //   setCart(response);
    //   console.log(response);
    // };
    // getCarts();
  }, []);
  // console.log("cart Data", cart);
  return (
    <div className="container mx-auto">
      <h1 className="title my-5">Cart</h1>
      <div className="grid grid-cols-2">
        <div className="cart container mx-auto px-4">
          {items.length === 0 && <h1>No items in cart!</h1>}
          {items.length > 0 && (
            <div className="cart">
              <h1 className="text-center font-bold">{`You have ${items.length} items in cart!`}</h1>
              {items.map((data, index) => (
                <div
                  key={index}
                  className="flex border-2 min-h-32 my-4 px-5 py-4"
                >
                  <img className="w-20" src={data.data.img} alt="" />
                  <div>
                    <p>Price: {data.data.price}</p>
                  </div>
                  <div className="flex justify-between flex-1">
                    <h1 className="px-4">{data.data.name}</h1>
                    {
                      console.log("data", data)
                      /* 
                    
                    <button
                      onClick={() => handleRemoveFormCart(item.id)}
                      className="border-2 text-red"
                    >
                      Delete
                    </button> */
                    }
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="cart-detail">
          <h1 className="text-center font-bold">Detail</h1>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
