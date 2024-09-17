import { useState } from "react";
import PropTypes from "prop-types";

const UploadImage = ({ images, setImages }) => {
  const [imageUrl, setImageUrl] = useState([]);
  console.log(imageUrl);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl((prevUrls) => [...prevUrls, reader.result]);
        console.log(reader.result);

        const imgData = {
          file,
          is_thumbnail: images.length === 0,
        };
        setImages((prevImages) => [...prevImages, imgData]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <div className="flex">
        {imageUrl.map((data, index) => (
          <div key={index} className="basis-1/8">
            <div className="max-w-40">
              <img src={data} alt="" className="w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

UploadImage.propTypes = {
  setImages: PropTypes.func.isRequired, // Đảm bảo rằng setImages là hàm
  images: PropTypes.any,
};

export default UploadImage;
