import { useState } from "react";
import PropTypes from "prop-types";

const ProductImage = ({ images }) => {
  const [hoveredImage, setHoveredImage] = useState(null);
  // console.log(images);

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
    <div
      onMouseEnter={() => setHoveredImage(hoverImages[0] || mainImage)}
      onMouseLeave={() => setHoveredImage(null)}
    >
      <img
        src={hoveredImage || mainImage} // Nếu đang hover, hiển thị ảnh hover, nếu không hiển thị ảnh chính
        alt="Product"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

ProductImage.propTypes = {
  images: PropTypes.any,
};

export default ProductImage;
