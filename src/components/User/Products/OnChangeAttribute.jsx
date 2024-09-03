import PropTypes from "prop-types";

const OnChangeAttribute = ({ productItemsUser, setProductItemsUser }) => {
  // Hàm xử lý khi người dùng thay đổi giá trị của các input
  const handleInputChange = (index, field, value) => {
    setProductItemsUser((prevProductItems) => {
      // Tạo một bản sao của state hiện tại
      const updatedProducts = [...prevProductItems];
      console.log(updatedProducts);

      // Cập nhật giá trị mới cho sản phẩm tại vị trí index
      updatedProducts[index] = {
        ...updatedProducts[index],
        [field]: value,
      };
      return updatedProducts;
    });
  };

  return (
    <div className="ml-20 basis-2/3 bg-white p-4 rounded-lg shadow-inner">
      <h1 className="text-xl pb-2">Danh sách thuộc tính sản phẩm đã thêm</h1>
      {productItemsUser.map((data, index) => (
        <div key={data.id} className="flex mb-4">
          <div className="basis-1/4">
            <p>Sku</p>
            <h1 className="text-black text-lg pb-2">{data.sku}</h1>
          </div>

          <label>
            Giá:
            <input
              type="text"
              name="price"
              value={data.price}
              onChange={(e) =>
                handleInputChange(index, "price", e.target.value)
              }
              className="border p-2 m-2"
            />
          </label>

          <label>
            Số lượng:
            <input
              type="text"
              name="stock"
              value={data.stock || ""}
              onChange={(e) =>
                handleInputChange(index, "stock", e.target.value)
              }
              className="border p-2 m-2"
            />
          </label>

          <label>
            Ảnh:
            <input
              type="text"
              name="thumbnail"
              value={data.thumbnail || ""}
              onChange={(e) =>
                handleInputChange(index, "thumbnail", e.target.value)
              }
              className="border p-2 m-2"
            />
          </label>
        </div>
      ))}
    </div>
  );
};

OnChangeAttribute.propTypes = {
  productItemsUser: PropTypes.array.isRequired,
  setProductItemsUser: PropTypes.func.isRequired,
};

export default OnChangeAttribute;
