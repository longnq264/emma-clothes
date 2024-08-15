
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
    priceOld: "",
    quantity: "",
    description: "",
    category: "",
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
        const fetchedProduct = await getProduct(id);
        setProduct(fetchedProduct.data);
      } catch (error) {
        console.error("Lỗi không tìm được sản phẩm:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data[0]?.children || []);
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
      if (error.response && error.response.data) {
        // Log chi tiết lỗi từ server
        console.error("Lỗi cập nhật sản phẩm:", error.response.data);
      } else {
        console.error("Lỗi cập nhật sản phẩm:", error);
      }
      toast.error("Có lỗi xảy ra khi cập nhật sản phẩm!");
    }
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleQuillChange = (value) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      description: value,
    }));
  };

  const handleImageChange = (index, event) => {
    const { value } = event.target;
    setProduct((prevProduct) => {
      // Kiểm tra nếu phần tử tại chỉ số index chưa tồn tại, hãy khởi tạo nó
      const updatedImages = [...prevProduct.productImages];
      
      // Nếu phần tử tại index chưa tồn tại, hãy khởi tạo nó với giá trị mặc định
      if (!updatedImages[index]) {
        updatedImages[index] = { image_url: "", is_thumbnail: index === 0 ? 1 : 0 };
      }
      
      // Cập nhật URL hình ảnh
      updatedImages[index].image_url = value;
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
              value={product.name}
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
              value={product.description}
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
              value={product.price}
              onChange={handleChange}
              className="w-full border-gray-300 border-2 rounded-md p-3"
              placeholder="Nhập giá sản phẩm"
              required
            />
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="priceOld" className="block text-lg font-medium text-gray-900">
              Giá cũ
            </label>
            <input
              type="number"
              name="priceOld"
              id="priceOld"
              value={product.priceOld}
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
              value={product.quantity}
              onChange={handleChange}
              className="w-full border-gray-300 border-2 rounded-md p-3"
              placeholder="Nhập số lượng sản phẩm"
            />
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="category" className="block text-lg font-medium text-gray-900">
              Danh mục
            </label>
            <select
              id="category"
              name="category"
              value={product.category}
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

          <div className="col-span-full">
            <label htmlFor="main-image" className="block text-lg font-medium text-gray-900">
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
            <label htmlFor="additional-images" className="block text-lg font-medium text-gray-900">
              URL Hình ảnh bổ sung (Tối đa 3)
            </label>
            <div className="mt-2 flex flex-col gap-y-4">
              {[1, 2, 3].map((index) => (
                <input
                  key={index}
                  type="text"
                  name={`additionalImageUrl${index}`}
                  value={product.productImages[index]?.image_url || ""}
                  onChange={(e) => handleImageChange(index, e)}
                  className="w-full border-gray-300 border-2 rounded-md p-3"
                  placeholder={`URL Hình ảnh bổ sung ${index}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg"
          >
            Cập Nhật Sản Phẩm
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ProductEdit;
