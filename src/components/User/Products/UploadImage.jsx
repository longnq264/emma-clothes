import { useState } from "react";
import PropTypes from "prop-types";

const UploadImage = ({ images, setImages }) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Cập nhật URL của ảnh
        console.log(reader.result);
        const imgData = {
          url: reader.result,
          is_thumbnail: images.length === 0,
        };
        setImages((prevImages) => [...prevImages, imgData]); // Thêm URL vào danh sách ảnh
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Preview"
          style={{ marginTop: 10, maxWidth: 200 }}
        />
      )}
    </div>
  );
};

UploadImage.propTypes = {
  setImages: PropTypes.func.isRequired, // Đảm bảo rằng setImages là hàm
  images: PropTypes.any,
};

export default UploadImage;
