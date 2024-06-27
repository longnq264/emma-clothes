import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import emptyImg from "../../assets/img/emty.jpg";
import { NavLink } from "react-router-dom";
// import { listCart } from "../../api/fakeApi";
const CartPage = () => {
  // const [quantity, setQuantity] = useState(0)
  const { items } = useContext(AppContext);

  console.log("cart item context", items);
  // const [cart, setCart] = useState([]);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  // const formarttedTotalPrice = ``
  useEffect(() => {}, []);

  return (
    <>
      <div className="breadcrumb-site container mx-auto py-2">
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Home</Link>,
            },
            {
              title: <Link to="/cart">Cart</Link>,
            },
          ]}
        />
      </div>
      <div className="container mx-auto">
        {items.length === 0 && (
          <div className="">
            <h1 className="text-2xl font-bold text-center my-4">
              No item in Cart!
            </h1>
            <div className="w-3/12 container mx-auto">
              <img className="grid place-items-center" src={emptyImg} alt="" />
            </div>
            <div className="grid place-items-center my-10">
              <NavLink to="/products">
                <button className="px-20 py-3 border-2 bg-stone-600 transition-colors duration-300 ease-in-out hover:bg-stone-400 font-bold text-md text-white rounded-md uppercase">
                  Shopping now
                </button>
              </NavLink>
            </div>
          </div>
        )}
        <div className="grid grid-cols-2">
          <div className="cart container mx-auto px-4">
            {items.length > 0 && (
              <div className="cart">
                <h1 className="text-center font-bold">{`You have ${items.length} items in cart!`}</h1>
                {items.map((data, index) => (
                  <div
                    key={index}
                    className="flex border-2 min-h-32 my-4 px-5 py-4"
                  >
                    <div className="max-w-6">
                      <img src={data.data.img} alt="" />
                    </div>
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
                <div className="cart-detail">
                  <h1 className="text-center font-bold">Detail</h1>
                  <p>Total Price: {totalPrice}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
