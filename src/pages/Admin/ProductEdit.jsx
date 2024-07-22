import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, updateProduct, getCategories } from "../../api/api-server";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductEdit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  console.log(categories.data);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProduct(id);
        setProduct(fetchedProduct.data);
      } catch (error) {
        console.error("Lỗi không tìm được sản phẩm:", error);
      }
    };
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi không lấy được danh mục:", error);
      }
    };
    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateProduct(id, product);
      toast.success("Sản phẩm đã được cập nhật thành công!");
      setTimeout(() => {
        navigate("/admin/products");
      }, 2000);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật sản phẩm!");
      console.error("Lỗi cập nhật sản phẩm:", error);
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
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        Chỉnh Sửa Sản Phẩm
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-gray-800 text-lg font-medium mb-2">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full border-gray-300 border-2 rounded-md p-2"
              placeholder="Nhập tên sản phẩm"
              required
            />
          </div>
          <div>
            <label className="block text-gray-800 text-lg font-medium mb-2">
              Giá
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full border-gray-300 border-2 rounded-md p-2"
              placeholder="Nhập giá sản phẩm"
              required
            />
          </div>
          <div>
            <label className="block text-gray-800 text-lg font-medium mb-2">
              Mô tả
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full border-gray-300 border-2 rounded-md p-2"
              rows="4"
              placeholder="Nhập mô tả sản phẩm"
              required
            />
          </div>
          <div>
            <label className="block text-gray-800 text-lg font-medium mb-2">
              Danh mục
            </label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full border-gray-300 border-2 rounded-md p-2"
              required
            >
              <option value="">Chọn danh mục</option>
              {categories.length > 0 ? (
                <div>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </div>
              ) : (
                <div>
                  <h2>Nodata</h2>
                </div>
              )}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg"
            >
              Cập Nhật Sản Phẩm
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ProductEdit;

