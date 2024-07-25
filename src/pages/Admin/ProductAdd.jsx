import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct, getCategories } from "../../api/api-server";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductAdd = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [thumbnailImages, setThumbnailImages] = useState("");
  const [variants, setVariants] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        console.log("Danh mục từ API:", response); // Kiểm tra phản hồi từ API
        const data = response.data || []; // Đảm bảo rằng bạn lấy dữ liệu đúng cách
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
      // Xử lý dữ liệu thumbnailImages
      const thumbnailImageArray = thumbnailImages.split(',').map(img => img.trim());
      
      // Xử lý dữ liệu variants
      const variantArray = variants.split(';').map(v => {
        const [sku, price, stock, img] = v.split(',').map(v => v.trim());
        return {
          sku,
          price: parseFloat(price),
          stock: parseInt(stock, 10),
          main_image_url: img,
          attributes: [] // Bạn cần cung cấp thuộc tính nếu yêu cầu
        };
      });

      const productData = {
        name,
        price: parseFloat(price),
        description,
        quantity: parseInt(quantity, 10),
        category_id: category,
        main_image_url: mainImageUrl,
        thumbnail_images: thumbnailImageArray,
        variants: variantArray,
        status: "active" // Hoặc giá trị phù hợp nếu cần
      };

      const response = await createProduct(productData);
      console.log("Create product response:", response); // Xem phản hồi từ API
      toast.success("Sản phẩm đã được thêm thành công!");
      setTimeout(() => {
        navigate("/admin/products");
      }, 2000);
    } catch (error) {
      if (error.response) {
        console.error("Thất bại khi tạo sản phẩm:", error.response.data);
        toast.error(`Có lỗi xảy ra khi thêm sản phẩm: ${error.response.data.message}`);
      } else {
        console.error("Thất bại khi tạo sản phẩm:", error);
        toast.error("Có lỗi xảy ra khi thêm sản phẩm!");
      }
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Thêm Sản Phẩm</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
        <div className="space-y-6">
          {/* Tên sản phẩm */}
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

          {/* Giá */}
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

          {/* Mô tả */}
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

          {/* Số lượng */}
          <div>
            <label className="block text-gray-800 text-lg font-medium mb-2">Số lượng</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border-gray-300 border-2 rounded-md p-2"
              placeholder="Nhập số lượng sản phẩm"
              required
            />
          </div>

          {/* Danh mục */}
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

          {/* Ảnh chính */}
          <div>
            <label className="block text-gray-800 text-lg font-medium mb-2">Ảnh chính</label>
            <input
              type="text"
              value={mainImageUrl}
              onChange={(e) => setMainImageUrl(e.target.value)}
              className="w-full border-gray-300 border-2 rounded-md p-2"
              placeholder="Nhập URL ảnh chính"
              required
            />
          </div>

          {/* Ảnh thu nhỏ */}
          <div>
            <label className="block text-gray-800 text-lg font-medium mb-2">Ảnh thu nhỏ</label>
            <input
              type="text"
              value={thumbnailImages}
              onChange={(e) => setThumbnailImages(e.target.value)}
              className="w-full border-gray-300 border-2 rounded-md p-2"
              placeholder="Nhập URL ảnh thu nhỏ (cách nhau bằng dấu phẩy)"
              required
            />
          </div>

          {/* Biến thể */}
          <div>
            <label className="block text-gray-800 text-lg font-medium mb-2">Biến thể</label>
            <input
              type="text"
              value={variants}
              onChange={(e) => setVariants(e.target.value)}
              className="w-full border-gray-300 border-2 rounded-md p-2"
              placeholder="Nhập biến thể (cách nhau bằng dấu chấm phẩy, ví dụ: SKU, giá, số lượng, URL ảnh)"
              required
            />
          </div>

          {/* Nút thêm sản phẩm */}
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
