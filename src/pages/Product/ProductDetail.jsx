import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductId } from "../../api/api-server";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cartSlice";
import { addToCartItems, fetchCarts } from "../../store/cartThunk";
import PaymentIcon from "../../components/UI/Cart/PaymentIcon";
import SuggestedProducts from "../../components/UI/Home/SuggestedProducts";
import { formatCurrency } from "../../utils/helperFunction.js";

const ProductDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [mainImage, setMainImage] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariant, setSelectedVariant] = useState([]);
  const [quantity, setQuantity] = useState(1);

  console.log("selected", selectedVariant);
  console.log(mainImage);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  console.log(data);

  const fetchProductDetail = async (id) => {
    const response = await getProductId(id);

    setData(response.data);
    setSelectedVariant(response.data.productVariants[0]);
    setMainImage(response.data.productImages);
  };

  const handleAddToCart = async () => {
    const values = {
      id: Number(id),
      product_id: Number(id),
      variant_id: selectedVariant.id,
      quantity: quantity,
    };

    const cartData = {
      id: Number(id),
      product_id: data.id,
      variant_id: selectedVariant.id,
      quantity: quantity,
      price: data.price,
      product: {
        id: Number(id),
        name: data.name,
        price: data.price,
        image: "",
      },
      variant: {
        sku: selectedVariant.sku,
      },
    };

    if (!token) {
      dispatch(addItemToCart(cartData));
    } else {
      dispatch(addToCartItems({ values, token, data })).then(() => {
        dispatch(fetchCarts(token));
      });
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
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
    <div className="md:pt-10">
      <div
        className="content container mx-auto md:px-20 my-2"
        style={{ minHeight: "140vh" }}
      >
        <div className="md:flex">
          <div className="product-detail-image md:w-1/2 flex">
            <div className="hidden md:block thumbail">
              {mainImage
                .filter((image) => image.is_thumbnail === 0)
                .map((image, index) => (
                  <div key={index} className="w-20 mb-2">
                    <img
                      src={image.image_url}
                      alt={`Thumbnail`}
                      className="w-full"
                    />
                  </div>
                ))}
            </div>
            <div className="product-image">
              {mainImage
                .filter((image) => image.is_thumbnail === 1)
                .map((image, index) => (
                  <div key={index}>
                    <img
                      src={image.image_url}
                      alt="main image"
                      className="w-full"
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="min-h-40 px-6 md:pl-16 pt-6 text-stone-700 md:w-1/2">
            <h1 className="font-bold md:text-2xl">{data.name}</h1>
            <div className="variants">
              {selectedVariant ? (
                <div className="detail">
                  <div className="flex justify-between">
                    <p className="text-xs font-bold text-stone-500">
                      {selectedVariant.sku}
                    </p>
                    <p className="text-sm font-bold text-stone-500">
                      Stock: {selectedVariant.stock}
                    </p>
                  </div>
                  <p className="text-2xl font-bold my-2 pt-6">
                    {formatCurrency(selectedVariant.price)}

                    <span className="text-stone-400 text-lg my-2 ml-2 line-through">
                      {formatCurrency(data.price_old)}
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
                    <div className="flex flex-wrap">
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
                  <div className="my-2 mt-6">
                    <h3 className="my-2 font-bold">Kích cỡ: {selectedSize}</h3>
                    <div className="flex flex-wrap">
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
              <div className="md:flex">
                <div className="flex justify-center items-center basis-1/4 border rounded-lg my-4 min-h-14">
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
                  className="px-10 py-2 border-2 border-black font-bold my-5 w-full rounded-lg md:basis-3/4 uppercase hover:bg-gray-100"
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
              <button
                onClick={handleBuyNow}
                className="block uppercase px-10 py-3 border-2 w-full text-white text-center font-bold bg-orange-500 hover:bg-orange-300 my-5 rounded-lg basis-3/4 shadow-stone-lg"
              >
                Mua ngay
              </button>
            </div>
            <div className="bg-gray-50 pb-6">
              <PaymentIcon />
              <p className="text-xs font-semibold text-center pt-2">
                Đảm bảo thanh toán an toàn và bảo mật
              </p>
            </div>
            <div className="shipment mt-3">
              <ul className="text-sm leading-10">
                <li>
                  <b>Miễn phí vận chuyển:</b> Đơn hàng từ 498k
                </li>
                <li>
                  <b>Giao hàng:</b> Từ 3 - 5 ngày trên cả nước
                </li>
                <li>
                  <b>Miễn phí đổi trả:</b> Tại 267+ cửa hàng trong 15 ngày
                </li>
                <li>Sử dụng mã giảm giá ở bước thanh toán</li>
                <li>Thông tin bảo mật và mã hóa</li>
              </ul>
            </div>
            <div className="desc mt-4">
              <li className="text-sm">{data.description}</li>
            </div>
          </div>
        </div>
        <div className="product mt-10">
          <SuggestedProducts />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
