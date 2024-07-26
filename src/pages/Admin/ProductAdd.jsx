import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct, getCategories } from "../../api/api-server";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductAdd = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data || []);
      } catch (error) {
        console.error("Lỗi không lấy được danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createProduct(product);
      toast.success("Sản phẩm đã được thêm thành công!");
      setTimeout(() => {
        navigate("/admin/products");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("API error response:", error.response.data);
        toast.error("Có lỗi xảy ra khi thêm sản phẩm!");
      } else {
        console.error("Error adding product:", error);
        toast.error("Có lỗi xảy ra khi thêm sản phẩm!");
      }
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
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-extrabold mb-8">Thêm Sản Phẩm Mới</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-800 text-lg font-medium mb-2">Tên sản phẩm</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full border-gray-300 border-2 rounded-md p-3"
              placeholder="Nhập tên sản phẩm"
              required
            />
          </div>
          <div>
            <label className="block text-gray-800 text-lg font-medium mb-2">Giá</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full border-gray-300 border-2 rounded-md p-3"
              placeholder="Nhập giá sản phẩm"
              required
            />
          </div>
          <div>
            <label className="block text-gray-800 text-lg font-medium mb-2">Mô tả</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full border-gray-300 border-2 rounded-md p-3"
              rows="4"
              placeholder="Nhập mô tả sản phẩm"
              required
            />
          </div>
          <div>
            <label className="block text-gray-800 text-lg font-medium mb-2">Danh mục</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full border-gray-300 border-2 rounded-md p-3"
              required
            >
              <option value="">Chọn danh mục</option>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <option disabled>Không có danh mục</option>
              )}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg"
            >
              Thêm Sản Phẩm
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ProductAdd;
