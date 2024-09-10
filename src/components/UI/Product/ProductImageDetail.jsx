import PropTypes from "prop-types";
const ProductImageDetail = ({ mainImage }) => {
  return (
    <div className="product-detail-image md:w-1/2 flex">
      <div className="hidden md:block thumbail">
        {mainImage
          .filter((image) => image.is_thumbnail === 0)
          .map((image, index) => (
            <div key={index} className="w-20 mb-2">
              <img src={image.image_url} alt={`Thumbnail`} className="w-full" />
            </div>
          ))}
      </div>
      <div className="product-image">
        {mainImage
          .filter((image) => image.is_thumbnail === 1)
          .map((image, index) => (
            <div key={index}>
              <img src={image.image_url} alt="main image" className="w-full" />
            </div>
          ))}
      </div>
    </div>
  );
};
ProductImageDetail.propTypes = {
  mainImage: PropTypes.any,
};
export default ProductImageDetail;
