import { useState } from "react";

const ImagePostForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    priceOld: "",
    quantity: "",
    description: "",
    category: "",
    productImages: [
      { image_url: "", is_thumbnail: 1 }, // Hình ảnh chính
      { image_url: "", is_thumbnail: 0 }, // Hình ảnh bổ sung 1
      { image_url: "", is_thumbnail: 0 }, // Hình ảnh bổ sung 2
      { image_url: "", is_thumbnail: 0 }, // Hình ảnh bổ sung 3
    ],
  });
  const handleImageChange = (index, event) => {
    const { value } = event.target;
    setProduct((prevProduct) => {
      const updatedImages = [...prevProduct.productImages];
      updatedImages[index].image_url = value;
      return { ...prevProduct, productImages: updatedImages };
    });
  };
  return (
    <>
      <div className="col-span-full">
        <div className="col-span-full">
          <label
            htmlFor="main-image"
            className="block text-lg font-medium text-gray-900"
          >
            URL Hình ảnh chính
          </label>
          <input
            type="text"
            name="mainImageUrl"
            id="main-image"
            value={product.productImages[0]?.image_url || ""}
            onChange={(e) => handleImageChange(0, e)}
            className="w-full border-gray-300 border-2 rounded-md p-3"
            placeholder="Nhập URL hình ảnh chính"
            required
          />
        </div>

        <div className="col-span-full">
          <label
            htmlFor="additional-images"
            className="block text-lg font-medium text-gray-900"
          >
            URL Hình ảnh bổ sung (Tối đa 3)
          </label>
          <div className="mt-2 flex flex-col gap-y-4">
            {[1, 2, 3].map((index) => (
              <input
                key={index}
                type="text"
                name={`additionalImage${index}`}
                value={product.productImages[index]?.image_url || ""}
                onChange={(e) => handleImageChange(index, e)}
                className="w-full border-gray-300 border-2 rounded-md p-3"
                placeholder={`Nhập URL hình ảnh bổ sung ${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImagePostForm;
