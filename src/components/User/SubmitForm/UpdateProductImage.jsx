import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const UpdateProductImage = ({ images, setImages, setImageFile }) => {
  const [imageUrls, setImageUrls] = useState([]);

  // Hiển thị danh sách ảnh từ props `images`
  useEffect(() => {
    setImageUrls(images.map((img) => img.image_url || ""));
  }, [images]);

  // Thêm ảnh mới và lưu trong setImageFile
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrls((prevUrls) => [...prevUrls, reader.result]);

        // Thêm ảnh mới vào setImageFile
        setImageFile((prevFiles) => [
          ...prevFiles,
          {
            file: file,
            is_thumbnail: images.length === 0, // Ảnh đầu tiên sẽ là thumbnail
          },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý xóa ảnh
  const handleRemoveImage = (index) => {
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls);

    const newImages = images.filter((_, i) => i !== index);

    if (index === 0 && newImages.length > 0) {
      newImages[0].is_thumbnail = true; // Đặt ảnh đầu tiên thành thumbnail nếu xóa ảnh hiện tại
    }

    setImages(newImages);

    // Xóa ảnh đã tồn tại trong setImageFile hoặc setImages
    if (index < images.length) {
      // Ảnh đã tồn tại
      setImageFile((prevFiles) => [
        ...prevFiles,
        { id: images[index].id, is_thumbnail: images[index].is_thumbnail },
      ]);
    }
  };

  return (
    <div className="flex flex-row gap-4">
      {/* Hiển thị các ảnh đã tồn tại */}
      {imageUrls.map((data, index) => (
        <div key={index} className="basis-1/8 flex items-center">
          <div className="max-w-40 relative">
            <img src={data} alt={`image-${index}`} className="w-full" />
            <div
              className="absolute top-0 right-0 bg-red-500 text-white p-1"
              onClick={() => handleRemoveImage(index)}
            >
              X
            </div>
          </div>
        </div>
      ))}

      {/* Input để thêm ảnh mới */}
      <div className="mt-4">
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
    </div>
  );
};

UpdateProductImage.propTypes = {
  setImages: PropTypes.func.isRequired,
  setImageFile: PropTypes.any,
  images: PropTypes.any,
};

export default UpdateProductImage;
