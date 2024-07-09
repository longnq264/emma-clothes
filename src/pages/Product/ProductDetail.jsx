import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { getProductId } from "../../api/fakeApi";
import { Breadcrumb } from "antd";
import Link from "antd/es/typography/Link";
const ProductDetail = () => {
  const { role, id } = useParams();
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const { addItemToCart } = useContext(AppContext);

  // const handleAddtoCart = async (idCart, dataCart) => {
  //   const initCart = {
  //     productID: idCart,
  //     data: {
  //       ...dataCart,
  //     },
  //   };
  //   try {
  //     const response = await addToCart(initCart);
  //     console.log("handle Add", response);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  console.log(id);
  useEffect(() => {
    const fetchProductDetail = async () => {
      const response = await getProductId(id);
      setData(response);
      console.log(response);
    };
    fetchProductDetail();
  }, [id]);

  return (
    <div>
      <div className="container mx-auto py-2">
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Home</Link>,
            },
            {
              title: (
                <Link to="/products/:role/" className="capitalize text-black">
                  {role}
                </Link>
              ),
            },
            {
              title: (
                <Link
                  to="/products/:role/:id"
                  className="capitalize text-black"
                >
                  {data.name}
                </Link>
              ),
            },
          ]}
        />
      </div>
      <div
        className="content container mx-auto px-20"
        style={{ minHeight: "140vh", background: "#f9f9f9" }}
      >
        <div className="grid grid-cols-2">
          <div className="product-detail-image">
            <div className="product-image">
              <img src={data.main_image_url} alt="" />
            </div>
            <div className="thumbail flex">
              {data.thumbnail_image_url?.map((data, index) => (
                <div key={index} className="m-4 border-4 p-4">
                  <img src={data} alt="" />
                </div>
              ))}
            </div>
          </div>
          <div className="inner-detail min-h-40 p-5 text-stone-700">
            <h1 className="font-bold text-3xl">{data.name}</h1>
            <div className="price flex">
              <p className="text-2xl my-2 font-bold">{data.price}</p>
              <p className="text-stone-400 text-xl my-2 ml-2 line-through">
                {data.price_old}
              </p>
            </div>
            <p>Color:</p>
            <p>Size:</p>
            <div className="grid grid-cols-2">
              <p>Quantity: </p>
              <div className="flex items-center">
                <button
                  className="px-3 py-1 border border-gray-400 rounded-l hover:bg-gray-200"
                  onClick={handleDecreaseQuantity}
                >
                  -
                </button>
                <span className="px-3">{quantity}</span>
                <button
                  className="px-3 py-1 border border-gray-400 rounded-r hover:bg-gray-200"
                  onClick={handleIncreaseQuantity}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => addItemToCart(id)}
              className="px-10 py-2 border-2 w-full text-white font-bold bg-stone-700 my-5 rounded"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
