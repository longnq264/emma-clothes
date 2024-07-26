import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { getProductId } from "../../api/api-server";
import { Breadcrumb } from "antd";
import Link from "antd/es/typography/Link";

const ProductDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { addItemToCart } = useContext(AppContext);

  const thumb_nail = [
    {
      id: 1,
      url: "https://res.cloudinary.com/da7r4robk/image/upload/v1717679639/Products/emma_thumbnail/product-detail1_ogl52l.png",
    },
    {
      id: 2,
      url: "https://res.cloudinary.com/da7r4robk/image/upload/v1717679639/Products/emma_thumbnail/product-detail1_ogl52l.png",
    },
    {
      id: 3,
      url: "https://res.cloudinary.com/da7r4robk/image/upload/v1717679639/Products/emma_thumbnail/product-detail1_ogl52l.png",
    },
    {
      id: 4,
      url: "https://res.cloudinary.com/da7r4robk/image/upload/v1717679639/Products/emma_thumbnail/product-detail1_ogl52l.png",
    },
  ];

  const fetchProductDetail = async (id) => {
    const response = await getProductId(id);
    setData(response.data);
    console.log(response);
  };

  const handleAddToCart = () => {
    addItemToCart(data, quantity);
  };

  useEffect(() => {
    fetchProductDetail(id);
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
        style={{ minHeight: "140vh" }}
      >
        <div className="grid grid-cols-2">
          <div className="product-detail-image">
            <div className="product-image">
              <img
                src="https://res.cloudinary.com/da7r4robk/image/upload/v1717588304/Products/product1_rr8fhn.png"
                alt=""
              />
            </div>
            <div className="thumbail flex">
              {thumb_nail?.map((data, index) => (
                <div key={index} className="m-4 border-2 p-2">
                  <img src={data.url} alt="" />
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
            <div className="">
              <p>Quantity: {data.quantity}</p>
              {data.productVariants && data.productVariants.length > 0 ? (
                <ul>
                  {data.productVariants.map((variant) => (
                    <div key={variant.id}>
                      <p>Color: {variant.sku}</p>
                      {/* Stock: {variant.stock} Price: {variant.price} */}
                    </div>
                  ))}
                </ul>
              ) : (
                <p>No variants available</p>
              )}
              <div className="flex">
                <div className="flex items-center basis-1/4">
                  <button
                    className="px-3 py-1 border border-gray-400 rounded-l hover:bg-gray-200 font-bold"
                    onClick={() => setQuantity((q) => (q > 1 ? q - 1 : q))}
                  >
                    -
                  </button>
                  <span className="px-3">{quantity}</span>
                  <button
                    className="px-3 py-1 border border-gray-400 rounded-r hover:bg-gray-200 font-bold"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="px-10 py-2 border-2 border-black font-bold my-5 rounded basis-3/4 uppercase"
                  onClick={handleAddToCart}
                >
                  Add To Bag
                </button>
              </div>
              <button className="uppercase px-10 py-2 border-2 w-full text-white font-bold bg-stone-700 my-5 rounded basis-3/4 shadow-stone-500/50">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
