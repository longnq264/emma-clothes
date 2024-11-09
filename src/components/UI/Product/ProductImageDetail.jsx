import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ImageZoom } from "react-responsive-image-zoom";

const ProductImageDetail = ({ mainImage }) => {
  // Kiểm tra và thiết lập ảnh chính ban đầu
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (mainImage && mainImage.length > 0) {
      const initialImage = mainImage.find((image) => image.is_thumbnail === 1);
      setSelectedImage(
        initialImage ? initialImage.image_url : mainImage[0].image_url
      );
    }
  }, [mainImage]);

  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="product-detail-image md:w-1/2 flex">
      {/* Phần thumbnail */}
      <div className="hidden md:block thumbail">
        {mainImage
          .filter((image) => image.is_thumbnail === 0)
          .map((image, index) => (
            <div key={index} className="w-20 mb-2">
              <img
                src={image.image_url}
                alt={`Thumbnail`}
                className="w-full cursor-pointer"
                onClick={() => handleThumbnailClick(image.image_url)} // Khi click, ảnh chính thay đổi
              />
            </div>
          ))}
        {mainImage
          .filter((image) => image.is_thumbnail === 1)
          .map((image, index) => (
            <div key={index} className="w-20 mb-2">
              <img
                src={image.image_url}
                alt={`Thumbnail`}
                className="w-full cursor-pointer"
                onClick={() => handleThumbnailClick(image.image_url)} // Khi click, ảnh chính thay đổi
              />
            </div>
          ))}
      </div>

      {/* Phần ảnh chính */}
      <div className="product-image md:pl-2">
        {selectedImage ? (
          <ImageZoom
            src={selectedImage}
            defaultZoomFactor={3}
            transition={0.5}
            breakpoints={[
              { maxWidth: 768, zoomFactor: 1.5 },
              { maxWidth: 1024, zoomFactor: 1.4 },
            ]}
            imgClassName="my-image-class"
            debug={false}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

ProductImageDetail.propTypes = {
  mainImage: PropTypes.array.isRequired,
};

export default ProductImageDetail;
