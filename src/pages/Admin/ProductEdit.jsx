import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, updateProduct, getCategories } from "../../api/api-server";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ProductEdit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    price_old: "",
    quantity: "",
    description: "",
    category_id: "",
    promotion: "",
    status: "",
    brand_id: "",
    productImages: [
      { image_url: "", is_thumbnail: 1 },
      { image_url: "", is_thumbnail: 0 },
      { image_url: "", is_thumbnail: 0 },
      { image_url: "", is_thumbnail: 0 }
    ],
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error("Lỗi không tìm được sản phẩm:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await getCategories();
        setCategories(data[0]?.children || []);
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
      console.error("Lỗi cập nhật sản phẩm:", error.response?.data || error);
      toast.error("Có lỗi xảy ra khi cập nhật sản phẩm!");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value || "",
    }));
  };

  const handleQuillChange = (value) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      description: value || "",
    }));
  };

  const handleImageChange = (index, event) => {
    const { value } = event.target;
    setProduct((prevProduct) => {
      const updatedImages = [...prevProduct.productImages];
      if (!updatedImages[index]) {
        updatedImages[index] = { image_url: "", is_thumbnail: index === 0 ? 1 : 0 };
      }
      updatedImages[index].image_url = value || "";
      return { ...prevProduct, productImages: updatedImages };
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-extrabold mb-8">Chỉnh Sửa Sản Phẩm</h1>
      <form onSubmit={handleSubmit} className="space-y-8 bg-white shadow-lg rounded-lg p-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label htmlFor="product-name" className="block text-lg font-medium text-gray-900">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="name"
              id="product-name"
              value={product.name || ""}
              onChange={handleChange}
              className="w-full border-gray-300 border-2 rounded-md p-3"
              placeholder="Nhập tên sản phẩm"
              required
            />
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="description" className="block text-lg font-medium text-gray-900">
              Mô tả
            </label>
            <ReactQuill
              id="description"
              value={product.description || ""}
              onChange={handleQuillChange}
              className="h-60"
              placeholder="Nhập mô tả sản phẩm"
              required
            />
            <br />
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="price" className="block text-lg font-medium text-gray-900">
              Giá Mới
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={product.price || ""}
              onChange={handleChange}
              className="w-full border-gray-300 border-2 rounded-md p-3"
              placeholder="Nhập giá sản phẩm"
              required
            />
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="price_old" className="block text-lg font-medium text-gray-900">
              Giá cũ
            </label>
            <input
              type="number"
              name="price_old"
              id="price_old"
              value={product.price_old || ""}
              onChange={handleChange}
              className="w-full border-gray-300 border-2 rounded-md p-3"
              placeholder="Nhập giá cũ sản phẩm"
            />
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="quantity" className="block text-lg font-medium text-gray-900">
              Số lượng
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={product.quantity || ""}
              onChange={handleChange}
              className="w-full border-gray-300 border-2 rounded-md p-3"
              placeholder="Nhập số lượng sản phẩm"
            />
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="category_id" className="block text-lg font-medium text-gray-900">
              Danh mục
            </label>
            <select
              id="category_id"
              name="category_id"
              value={product.category_id || ""}
              onChange={handleChange}
              className="w-full border-gray-300 border-2 rounded-md p-3"
              required
            >
              <option value="">Chọn danh mục</option>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <optgroup key={cat.id} label={cat.name}>
                    {cat.children && cat.children.length > 0 ? (
                      cat.children.map((subCat) => (
                        <option key={subCat.id} value={subCat.id}>
                          {subCat.name}
                        </option>
                      ))
                    ) : (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    )}
                  </optgroup>
                ))
              ) : (
                <option disabled>Không có danh mục</option>
              )}
            </select>
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="promotion" className="block text-lg font-medium text-gray-900">
              Khuyến mãi
            </label>
            <input
              type="text"
              name="promotion"
              id="promotion"
              value={product.promotion || ""}
              onChange={handleChange}
              className="w-full border-gray-300 border-2 rounded-md p-3"
              placeholder="Nhập thông tin khuyến mãi"
            />
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="status" className="block text-lg font-medium text-gray-900">
              Trạng thái
            </label>
            <input
              type="text"
              name="status"
              id="status"
              value={product.status || ""}
              onChange={handleChange}
              className="w-full border-gray-300 border-2 rounded-md p-3"
              placeholder="Nhập trạng thái sản phẩm"
            />
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="brand_id" className="block text-lg font-medium text-gray-900">
              Thương hiệu
            </label>
            <input
              type="text"
              name="brand_id"
              id="brand_id"
              value={product.brand_id || ""}
              onChange={handleChange}
              className="w-full border-gray-300 border-2 rounded-md p-3"
              placeholder="Nhập ID thương hiệu"
            />
          </div>

          {product.productImages.map((image, index) => (
            <div key={index} className="sm:col-span-4">
              <label htmlFor={`image_${index}`} className="block text-lg font-medium text-gray-900">
                Hình ảnh {index + 1}
              </label>
              <input
                type="text"
                id={`image_${index}`}
                value={image.image_url}
                onChange={(event) => handleImageChange(index, event)}
                className="w-full border-gray-300 border-2 rounded-md p-3"
                placeholder="Nhập URL hình ảnh"
              />
              {index === 0 && <p className="text-gray-500 text-sm">Đây là hình ảnh chính.</p>}
            </div>
          ))}

          <div className="col-span-full">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Cập nhật sản phẩm
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ProductEdit;
