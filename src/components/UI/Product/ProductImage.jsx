import { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ProductImage = ({ images, productId }) => {
  const [hoveredImage, setHoveredImage] = useState(null);

  const defaultImage =
    "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-polo-nam-yody-apm6179-caf-2.jpg";

  const defaultHoverImage =
    "https://m.yodycdn.com/products/ao-polo-nam-yody-apm6179-caf-4.jpg";

  // Lấy ảnh đầu tiên từ danh sách `images`, nếu không có thì sử dụng ảnh mặc định
  const mainImage = images.length > 0 ? images[0].image_url : defaultImage;

  const hoverImages =
    images.length > 0
      ? images
          .filter((image) => image.is_thumbnail === 0)
          .map((image) => image.image_url)
      : [defaultHoverImage]; // Sử dụng ảnh mặc định nếu không có ảnh nào

  return (
    <NavLink className="block h-5/6" to={`/products/${productId}`}>
      <img
        style={{
          minHeight: "100%",
          objectFit: "cover",
        }}
        onMouseEnter={() => setHoveredImage(hoverImages[0] || mainImage)}
        onMouseLeave={() => setHoveredImage(null)}
        // className="object-cover w-full h-auto"
        className="w-full"
        src={hoveredImage || mainImage} // Nếu đang hover, hiển thị ảnh hover, nếu không hiển thị ảnh chính
        alt="Product"
      />
    </NavLink>
  );
};

ProductImage.propTypes = {
  images: PropTypes.any,
  productId: PropTypes.number,
};

export default ProductImage;
