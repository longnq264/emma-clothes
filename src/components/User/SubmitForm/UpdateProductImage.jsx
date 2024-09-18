import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const UpdateProductImage = ({ images, setImages, setImageFile }) => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    setImageUrls(images.map((img) => img.image_url || ""));
  }, [images]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // console.log(file);
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
    // Bước 1: Xóa URL của ảnh từ imageUrls (nếu bạn đang dùng imageUrls cho preview ảnh)
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls);

    // Bước 2: Xóa ảnh từ danh sách images
    const newImages = images.filter((_, i) => i !== index);

    // Nếu ảnh bị xóa là ảnh thumbnail, đặt ảnh đầu tiên trong danh sách thành thumbnail
    if (index === 0 && newImages.length > 0) {
      newImages[0].is_thumbnail = 1;
    }

    setImages(newImages);
    //B3
    setImageFile((prevFiles) =>
      prevFiles.filter((file) => file.id !== images[index]?.id)
    );
  };

  return (
    <div className="flex flex-row gap-4">
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
