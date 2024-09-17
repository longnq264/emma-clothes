import PropTypes from "prop-types";

const UploadImageProduct = ({ images, setImages }) => {
  console.log(images);
  const handleFileChange = (event) => {
    const arr = event.target.files;
    console.log(arr);
    const file = arr[0];
    console.log(file);
    const imgData = {
      file,
      is_thumbnail: images.length === 0,
    };
    setImages((prevImages) => [...prevImages, imgData]);
  };

  return (
    <div className="flex">
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

UploadImageProduct.propTypes = {
  setImages: PropTypes.func.isRequired,
  images: PropTypes.any,
};

export default UploadImageProduct;
