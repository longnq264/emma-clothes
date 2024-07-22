import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct, getCategories } from "../../api/api-server";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductAdd = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi không kết nối danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name,
        price,
        description,
        category
      };
      await createProduct(productData);
      toast.success("Sản phẩm đã được thêm thành công!");
      setTimeout(() => {
        navigate("/admin/products");
      }, 2000);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm sản phẩm!");
      console.error("Thất bại khi tạo sản phẩm:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Thêm Sản Phẩm</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-800 text-lg font-medium mb-2">Tên sản phẩm</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-gray-300 border-2 rounded-md p-2"
              placeholder="Nhập tên sản phẩm"
              required
            />
          </div>
          <div>
            <label className="block text-gray-800 text-lg font-medium mb-2">Giá</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border-gray-300 border-2 rounded-md p-2"
              placeholder="Nhập giá sản phẩm"
              required
            />
          </div>
          <div>
            <label className="block text-gray-800 text-lg font-medium mb-2">Mô tả</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-gray-300 border-2 rounded-md p-2"
              rows="4"
              placeholder="Nhập mô tả sản phẩm"
              required
            />
          </div>
          <div>
            <label className="block text-gray-800 text-lg font-medium mb-2">Danh mục</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border-gray-300 border-2 rounded-md p-2"
              required
            >
              <option value="">Chọn danh mục</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
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
