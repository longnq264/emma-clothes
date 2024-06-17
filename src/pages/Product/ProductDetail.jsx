import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useContext } from "react";
// import { AppContext } from "../../context/AppContextProvider";
import { addToCart, getProductId } from "../../api/fakeApi";

const ProductDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  // const { addItemToCart } = useContext(AppContext);

  const handleAddtoCart = async (idCart, dataCart) => {
    const initCart = {
      productID: idCart,
      data: {
        ...dataCart,
      },
    };
    try {
      const response = await addToCart(initCart);
      console.log("handle Add", response);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    const fetchProductDetail = async () => {
      const response = await getProductId(id);
      setData(response);
      console.log(response);
    };
    fetchProductDetail();
  }, [id]);

  return (
    <div className="">
      <div className="">
        <div
          className="content mt-10 container mx-auto px-20"
          style={{ minHeight: "140vh" }}
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
            <div className="inner-detail min-h-40 p-5">
              <h1 className="font-bold">{data.name}</h1>
              <div className="price flex">
                <p className="text-xl">{data.price}</p>
                <p className="text-stone-300">{data.price_old}</p>
              </div>
              <button
                onClick={() => {
                  const cartData = {
                    name: data.name,
                    quantity: data.quantity,
                    img: data.main_image_url,
                  };
                  handleAddtoCart(id, cartData);
                  console.log(id);
                }}
                className="px-10 py-2 border-2 w-full text-white font-bold bg-stone-700 my-5"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
