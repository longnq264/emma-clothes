import { useState } from "react";
import PropTypes from "prop-types";

const UpdatedAttributes = ({
  productItemsUser,
  setProductItemsUser,
  setFormValues,
}) => {
  // State to manage the product being edited
  const [editingProduct, setEditingProduct] = useState(null);

  // State to manage form input
  const [formInput, setFormInput] = useState({
    price: "",
    stock: "",
  });

  // const handleInputChange = (index, field, value, id) => {
  //   setFormValues((prevFormValues) => {
  //     // Tìm xem biến thể này đã tồn tại trong formValues chưa
  //     const existingVariantIndex = prevFormValues.findIndex(
  //       (variant) => variant.id === id
  //     );

  //     // Nếu tồn tại, cập nhật giá trị của biến thể đó
  //     if (existingVariantIndex !== -1) {
  //       const updatedVariants = [...prevFormValues];
  //       updatedVariants[existingVariantIndex] = {
  //         ...updatedVariants[existingVariantIndex],
  //         [field]: Number(value),
  //       };
  //       return updatedVariants;
  //     }

  //     // Nếu chưa tồn tại, thêm mới biến thể vào formValues
  //     return [
  //       [...prevFormValues, { id, [field]: Number(value) }], // Thêm biến thể mới
  //     ];
  //   });

  const handleInputChange = (index, field, value, id) => {
    setFormValues((prevFormValues) => {
      // Tìm xem biến thể này đã tồn tại trong formValues chưa
      const existingVariantIndex = prevFormValues.findIndex(
        (variant) => variant.id === id
      );

      // Nếu tồn tại, cập nhật giá trị của biến thể đó
      if (existingVariantIndex !== -1) {
        const updatedVariants = [...prevFormValues];
        updatedVariants[existingVariantIndex] = {
          ...updatedVariants[existingVariantIndex],
          [field]: Number(value),
        };
        return updatedVariants;
      }

      // Nếu chưa tồn tại, thêm mới biến thể vào formValues
      return [
        ...prevFormValues, // Giữ nguyên các biến thể cũ
        { id, [field]: Number(value) }, // Thêm biến thể mới
      ];
    });

    setProductItemsUser((prevProductItems) => {
      const updatedProducts = [...prevProductItems];
      updatedProducts[index] = {
        ...updatedProducts[index],
        [field]: Number(value),
      };
      return updatedProducts;
    });
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormInput({
      price: product.price || "",
      stock: product.stock || "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (editingProduct) {
      const updatedProduct = {
        ...editingProduct,
        price: Number(formInput.price),
        stock: Number(formInput.stock),
      };

      // Update the formValues and push the changes to the server
      setFormValues((prevFormValues) => {
        // Tìm xem sản phẩm này đã tồn tại trong formValues chưa
        const existingProductIndex = prevFormValues.findIndex(
          (product) => product.id === updatedProduct.id
        );

        // Nếu sản phẩm đã tồn tại, cập nhật giá trị của nó
        if (existingProductIndex !== -1) {
          const updatedFormValues = [...prevFormValues];
          updatedFormValues[existingProductIndex] = updatedProduct;
          return updatedFormValues;
        }

        // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào formValues
        return [...prevFormValues, updatedProduct];
      });

      // Call your API to update the product on the server here
      // For example: updateProductOnServer(updatedProduct);

      // After successful update, close the form
      setEditingProduct(null);
    }
  };

  return (
    <>
      <div className="ml-20 basis-2/3">
        <h1 className="text-xl pb-4">Danh sách thuộc tính sản phẩm đã thêm</h1>
        <div className="bg-white p-4 rounded-lg shadow-inner max-h-96 overflow-auto">
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
                    handleInputChange(index, "stock", e.target.value, data.id)
                  }
                  className="border p-2 m-2"
                />
              </label>

              <div
                className="ml-2 p-2 bg-blue-500 text-white rounded"
                onClick={() => handleEditClick(data)}
              >
                Update
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conditionally render the form for editing */}
      {editingProduct && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Edit Product</h2>
            <label>
              Giá:
              <input
                type="text"
                name="price"
                value={formInput.price}
                onChange={handleFormChange}
                className="border p-2 m-2"
              />
            </label>
            <label>
              Số lượng:
              <input
                type="text"
                name="stock"
                value={formInput.stock}
                onChange={handleFormChange}
                className="border p-2 m-2"
              />
            </label>
            <button
              className="ml-2 p-2 bg-green-500 text-white rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="ml-2 p-2 bg-red-500 text-white rounded"
              onClick={() => setEditingProduct(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

UpdatedAttributes.propTypes = {
  productItemsUser: PropTypes.array.isRequired,
  setProductItemsUser: PropTypes.func.isRequired,
  setFormValues: PropTypes.any,
};

export default UpdatedAttributes;
