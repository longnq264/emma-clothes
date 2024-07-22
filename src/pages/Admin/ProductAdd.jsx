import { useState } from "react";
import { createProduct } from "../../api/api-server";

const ProductAdd = () => {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createProduct(product);
      console.log("Tạo thêm mới sản phẩm thành công");
    } catch (error) {
      console.error("Thất bại thêm mới sản phẩm", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-md mx-auto my-8 bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price:
          </label>
          <input
            id="price"
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            rows="3"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductAdd;

