import PropTypes from "prop-types";

const UpdatedAttributes = ({
  productItemsUser,
  setProductItemsUser,
  setFormValues,
}) => {
  const handleInputChange = (index, field, value, id) => {
    console.log("field", field);
    console.log("value", value);
    console.log("id", id);

    setFormValues((prevItem) => [...prevItem]);
    setProductItemsUser((prevProductItems) => {
      // Tạo một bản sao của state hiện tại
      const updatedProducts = [...prevProductItems];
      console.log(updatedProducts);

      // Cập nhật giá trị mới cho sản phẩm tại vị trí index
      updatedProducts[index] = {
        ...updatedProducts[index],
        [field]: Number(value),
      };
      console.log(updatedProducts);
      return updatedProducts;
    });
  };

  return (
    <>
      <div className="ml-20 basis-2/3">
        <h1 className="text-xl pb-4">Danh sách thuộc tính sản phẩm đã thêm</h1>
        <div className=" bg-white p-4 rounded-lg shadow-inner max-h-96 overflow-auto">
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
                    handleInputChange(index, "price", e.target.value, data.id)
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

UpdatedAttributes.propTypes = {
  productItemsUser: PropTypes.array.isRequired,
  setProductItemsUser: PropTypes.func.isRequired,
  setFormValues: PropTypes.any,
};

export default UpdatedAttributes;
