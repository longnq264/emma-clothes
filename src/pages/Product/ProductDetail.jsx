import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getProductId } from "../../api/api-server";
import { Breadcrumb } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cartSlice";
import { addToCartItems } from "../../store/cartThunk";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [data, setData] = useState([]);
  const [mainImage, setMainImage] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariant, setSelectedVariant] = useState([]);
  const [quantity, setQuantity] = useState(1);

  console.log(data);

  const fetchProductDetail = async (id) => {
    const response = await getProductId(id);
    setData(response.data);
    console.log(response.data);
    setSelectedVariant(response.data.productVariants[0]);
    setMainImage(response.data.productImages);
  };

  const handleAddToCart = async () => {
    const formValues = {
      id: Number(id),
      variant_id: selectedVariant.id,
      quantity: quantity,
    };

    const cartData = {
      id: Number(id),
      order_id: data.order_id,
      price: data.price,
      product_id: data.product_id,
      quantity: quantity,
      product_name: data.name,
      variant_id: selectedVariant.id,
    };

    if (!token) {
      dispatch(addItemToCart(cartData));
    } else {
      dispatch(addToCartItems({ data: formValues, token }));
    }
    // addItemToCart(data, quantity);
    // console.log(data, quantity);
  };

  useEffect(() => {
    fetchProductDetail(id);
  }, [id]);

  // Gia tri state mac dinh
  useEffect(() => {
    if (data.productVariants && data.productVariants.length > 0) {
      const firstVariant = data.productVariants[0];
      console.log("init state variants", firstVariant);
      const colors = firstVariant.attributes.filter(
        (attr) => attr.attribute_id === 1
      );

      const sizes = firstVariant.attributes.filter(
        (attr) => attr.attribute_id === 2
      );
      if (colors.length > 0) {
        setSelectedColor(colors[0].value); // Chọn màu đầu tiên
        setSelectedSize(sizes.length > 0 ? sizes[0].value : ""); // Chọn kích cỡ đầu tiên nếu có
      } else {
        // Nếu không có màu, bạn có thể chọn kích cỡ đầu tiên nếu có
        setSelectedColor("");
        setSelectedSize(sizes.length > 0 ? sizes[0].value : ""); // Chọn kích cỡ đầu tiên nếu có
      }
      setSelectedVariant(firstVariant); // Cập nhật variant đầu tiên
    }
  }, [data.productVariants]);

  // Handle change color && size
  useEffect(() => {
    if (selectedColor && selectedSize) {
      const variants = data.productVariants.find(
        (variant) =>
          variant.attributes.some(
            (attr) => attr.value === selectedColor && attr.attribute_id === 1
          ) &&
          variant.attributes.some(
            (attr) => attr.value === selectedSize && attr.attribute_id === 2
          )
      );
      setSelectedVariant(variants);
      console.log("selected variant", variants);
    }
  }, [selectedColor, selectedSize, data.productVariants]);

  return (
    <div>
      <div className="container mx-auto py-4">
        <Breadcrumb
          items={[
            {
              title: <NavLink to="/">Home</NavLink>,
            },
            {
              title: (
                <NavLink
                  to={`/products/${data.category_id}/${id}`}
                  className="capitalize text-black"
                >
                  {data.name}
                </NavLink>
              ),
            },
          ]}
        />
      </div>
      <div
        className="content container mx-auto px-20 my-2"
        style={{ minHeight: "140vh" }}
      >
        <div className="grid grid-cols-2 ">
          <div className="product-detail-image">
            <div className="product-image border min-h-80">
              {mainImage
                .filter((image) => image.is_thumbnail === 1)
                .map((image, index) => (
                  <div key={index}>
                    <img src={image.image_url} alt="" />
                  </div>
                ))}
            </div>
            <div className="thumbail flex">
              {mainImage
                .filter((image) => image.is_thumbnail === 0)
                .map((image, index) => (
                  <div key={index} className="pr-2 py-2 w-40 border">
                    <img
                      src={image.image_url}
                      alt={`Thumbnail ${index}`}
                      className="w-full border"
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="min-h-40 pl-16 text-stone-700">
            <h1 className="font-bold text-2xl">{data.name}</h1>
            <div className="variants flex">
              {selectedVariant ? (
                <div className="detail">
                  <p className="text-xs font-bold text-stone-500">
                    {selectedVariant.sku}
                  </p>
                  <p className="text-2xl font-bold my-2">
                    {selectedVariant.price} đ
                    <span className="text-stone-400 text-lg my-2 ml-2 line-through">
                      {data.price_old} đ
                    </span>
                  </p>
                </div>
              ) : (
                <div>No data</div>
              )}
            </div>
            <div className="">
              {data.productVariants && data.productVariants.length > 0 ? (
                <div>
                  <div className="my-2">
                    <h3 className="font-bold my-2 ">
                      Màu sắc: {selectedColor}
                    </h3>
                    <div className="flex">
                      {Array.from(
                        new Set(
                          data.productVariants.flatMap((variant) =>
                            variant.attributes
                              .filter(
                                (attribute) => attribute.attribute_id === 1
                              ) // Giả sử 1 là ID cho màu
                              .map((attribute) => attribute.value)
                          )
                        )
                      ).map((color, index) => (
                        <button
                          key={index}
                          className="py-2 text-center border border-stone-400 rounded-lg mr-4 font-bold hover:border-black w-14 box-border"
                          onClick={() => setSelectedColor(color)}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="my-2">
                    <h3 className="my-2 font-bold">Kích cỡ: {selectedSize}</h3>
                    <div className="flex">
                      {Array.from(
                        new Set(
                          data.productVariants.flatMap((variant) =>
                            variant.attributes
                              .filter(
                                (attribute) => attribute.attribute_id === 2
                              ) // Giả sử 2 là ID cho kích cỡ
                              .map((attribute) => attribute.value)
                          )
                        )
                      ).map((size, index) => (
                        <button
                          key={index}
                          className="py-2 px-4 text-center border border-stone-400 rounded-lg mr-4 font-bold hover:border-black w-14 box-border"
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p>No variants available</p>
              )}
              <div className="flex">
                <div className="flex justify-center items-center basis-1/4 border rounded-lg my-4 mr-6">
                  <button
                    className="font-bold basis-1/3"
                    onClick={() => setQuantity((q) => (q > 1 ? q - 1 : q))}
                  >
                    -
                  </button>
                  <span className="basis-1/3 text-center">{quantity}</span>
                  <button
                    className="font-bold basis-1/3"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="px-10 py-2 border-2 border-black font-bold my-5 rounded-lg basis-3/4 uppercase hover:bg-gray-100"
                  onClick={handleAddToCart}
                >
                  Add To Bag
                </button>
              </div>
              <button className="uppercase px-10 py-2 border-2 w-full text-white font-bold bg-stone-700 hover:bg-stone-600 my-5 rounded-lg basis-3/4 shadow-stone-lg">
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
