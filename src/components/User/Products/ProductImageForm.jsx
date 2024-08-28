import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Input } from "antd";

const ProductImagesForm = ({ images, setImages }) => {
  const [imageUrl, setImageUrl] = useState();
  const handleAddImage = () => {
    if (imageUrl) {
      const newImages = [
        ...images,
        { url: imageUrl, is_thumbnail: images.length === 0 },
      ];
      setImages(newImages); // Cập nhật danh sách ảnh
      setImageUrl(""); // Xóa giá trị của input sau khi thêm ảnh
    }
  };

  return (
    <>
      <div className="col-span-full pb-8">
        <div className="flex">
          <div className="wrap-input w-2/6">
            <h2 className="text-lg font-medium text-gray-900 pb-2">
              Thêm ảnh sản phẩm
            </h2>
            <Input
              name="img"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Nhập URL hình ảnh"
              className="w-2/3"
            />
            <Button
              type="primary"
              onClick={handleAddImage}
              className="ml-2 w-1/4 bg-orange-400"
            >
              Thêm Hình Ảnh
            </Button>
          </div>
          <div className="preview ml-20 w-3/5">
            <div className="flex">
              {images.map((data, index) => (
                <div key={index} className="w-24 mx-2">
                  <img className="w-full" src={data.url} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ProductImagesForm.propTypes = {
  images: PropTypes.any,
  setImages: PropTypes.any,
};

export default ProductImagesForm;
