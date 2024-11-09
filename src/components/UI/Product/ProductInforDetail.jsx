import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../../utils/helperFunction";
import PaymentIcon from "../Cart/PaymentIcon";
import PropTypes from "prop-types";
import { addItemToCart } from "../../../store/cartSlice";
import { addToCartItems, fetchCarts } from "../../../store/cartThunk";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import ShipmentDetail from "./ShipmentDetail";

const ProductInforDetail = ({
  data,
  id,
  selectedVariant,
  setSelectedVariant,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  mainImage,
}) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  console.log(selectedVariant);
  // Lấy danh sách màu sắc và kích cỡ từ productVariants
  const colors = useMemo(() => {
    return Array.from(
      new Set(
        data.productVariants?.flatMap((variant) =>
          variant.attributes
            .filter((attribute) => attribute.attribute_id === 1) // Giả sử 1 là ID cho màu
            .map((attribute) => attribute.value)
        )
      )
    );
  }, [data.productVariants]);

  const sizes = useMemo(() => {
    return Array.from(
      new Set(
        data.productVariants?.flatMap((variant) =>
          variant.attributes
            .filter((attribute) => attribute.attribute_id === 2) // Giả sử 2 là ID cho kích cỡ
            .map((attribute) => attribute.value)
        )
      )
    );
  }, [data.productVariants]);

  // Thiết lập variant đầu tiên mặc định
  useEffect(() => {
    if (data.productVariants?.length > 0) {
      const firstVariant = data.productVariants[0];
      const firstColor = firstVariant.attributes.find(
        (attr) => attr.attribute_id === 1
      )?.value;
      const firstSize = firstVariant.attributes.find(
        (attr) => attr.attribute_id === 2
      )?.value;

      setSelectedColor(firstColor || "");
      setSelectedSize(firstSize || "");
      setSelectedVariant(firstVariant);
    }
  }, [
    data.productVariants,
    setSelectedColor,
    setSelectedSize,
    setSelectedVariant,
  ]);

  // Tìm và cập nhật variant dựa trên màu sắc và kích cỡ
  useEffect(() => {
    const foundVariant = data.productVariants?.find(
      (variant) =>
        variant.attributes.some(
          (attr) => attr.value === selectedColor && attr.attribute_id === 1
        ) &&
        variant.attributes.some(
          (attr) => attr.value === selectedSize && attr.attribute_id === 2
        )
    );

    setSelectedVariant(foundVariant || null);
  }, [selectedColor, selectedSize, data.productVariants, setSelectedVariant]);

  const handleAddToCart = async () => {
    const values = {
      id: Number(id),
      product_id: Number(id),
      variant_id: selectedVariant.id,
      quantity,
    };

    const cartData = {
      id: Number(id),
      product_id: data.id,
      variant_id: selectedVariant.id,
      quantity,
      stock: selectedVariant.stock,
      price: data.price,
      product: {
        id: Number(id),
        name: data.name,
        price: data.price,
        image: mainImage[0]?.image_url || "",
      },
      variant: {
        sku: selectedVariant.sku,
      },
    };

    try {
      if (!token) {
        dispatch(addItemToCart(cartData));
      } else {
        await dispatch(addToCartItems({ values, token, data }));
        await dispatch(fetchCarts(token));
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleBuyNow = async () => {
    try {
      await handleAddToCart();
      navigate("/cart");
    } catch (error) {
      console.error("Error during buy now:", error);
    }
  };

  return (
    <div className="min-h-40 px-6 md:pl-16 pt-6 text-stone-700 md:w-1/2">
      <h1 className="font-bold md:text-2xl">{data.name}</h1>

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

      {data.productVariants?.length > 0 && (
        <>
          <div className="my-2">
            <h3 className="font-bold my-2">Màu sắc: {selectedColor}</h3>
            <div className="flex flex-wrap">
              {colors.map((color, index) => (
                <button
                  key={index}
                  className={`py-2 text-center border border-stone-400 rounded-lg mr-4 font-bold hover:border-black w-14 ${
                    selectedColor === color ? "border-black" : ""
                  }`}
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
              {sizes.map((size, index) => (
                <button
                  key={index}
                  className={`py-2 px-4 text-center border border-stone-400 rounded-lg mr-4 font-bold hover:border-black w-14 ${
                    selectedSize === size ? "border-black" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="md:flex md:justify-between">
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
            onClick={() =>
              setQuantity((q) => {
                if (q < selectedVariant.stock) {
                  return q + 1;
                } else {
                  alert("Bạn đã đạt giới hạn số lượng sản phẩm trong kho.");
                  return q; // giữ nguyên số lượng nếu vượt quá stock
                }
              })
            }
          >
            +
          </button>
        </div>
        <button
          className={`${!selectedVariant ? "cusor-not-allowed" : ""} px-10 py-2 border-2 border-black font-bold my-5 w-full rounded-lg md:basis-2/4 uppercase hover:bg-gray-100`}
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

      <PaymentIcon />
      <ShipmentDetail />

      <div className="desc mt-4">
        <li className="text-sm">{data.description}</li>
      </div>
    </div>
  );
};

ProductInforDetail.propTypes = {
  id: PropTypes.any,
  data: PropTypes.any,
  selectedVariant: PropTypes.any,
  selectedColor: PropTypes.any,
  setSelectedColor: PropTypes.any,
  selectedSize: PropTypes.any,
  setSelectedSize: PropTypes.any,
  setSelectedVariant: PropTypes.any,
  mainImage: PropTypes.any,
};
export default ProductInforDetail;
