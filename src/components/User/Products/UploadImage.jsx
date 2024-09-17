import { useState } from "react";
import PropTypes from "prop-types";

const UploadImage = ({ images, setImages }) => {
  const [imageUrl, setImageUrl] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl((prevUrls) => [...prevUrls, reader.result]);

        const imgData = {
          file,
          is_thumbnail: images.length === 0,
        };
        setImages((prevImages) => [...prevImages, imgData]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    // Xóa ảnh khỏi imageUrl
    const newImageUrls = imageUrl.filter((_, i) => i !== index);
    setImageUrl(newImageUrls);

    // Xóa ảnh khỏi images và cập nhật is_thumbnail nếu cần
    let newImages = images.filter((_, i) => i !== index);

    // Nếu xóa ảnh đầu tiên, cần đặt ảnh tiếp theo (nếu có) thành is_thumbnail = true
    if (index === 0 && newImages.length > 0) {
      newImages[0].is_thumbnail = true; // Đặt ảnh mới đầu tiên là thumbnail
    }

    setImages(newImages);
  };

  return (
    <div className="flex">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <div className="flex">
        {imageUrl.map((data, index) => (
          <div key={index} className="basis-1/8">
            <div className="max-w-40 relative">
              <img src={data} alt="" className="w-full" />
              {/* Nút Xóa */}
              <div
                className="absolute top-0 right-0 bg-red-500 text-white p-1 cursor-pointer"
                onClick={() => handleRemoveImage(index)}
              >
                X
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

UploadImage.propTypes = {
  setImages: PropTypes.func.isRequired,
  images: PropTypes.any,
};

export default UploadImage;
