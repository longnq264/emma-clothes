import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../../api/api-server";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data || []); // Đảm bảo response.data là mảng
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      fetchProducts(); // Cập nhật danh sách sản phẩm sau khi xóa
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="overflow-x-auto">
        <h1 className="text-4xl font-bold mb-6">Danh Sách Sản Phẩm</h1>

        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                ID
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Tên Sản Phẩm
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Giá
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Ảnh
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Mô Tả
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Số Lượng
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Danh Mục
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Hành Động
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  <Link
                    to={`/products/${product.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {product.id}
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <Link
                    to={`/products/${product.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {product.name}
                  </Link>
                </td>
                <td className="py-3 px-4">{product.price}₫</td>
                <td className="py-3 px-4">
                  <img
                    src={product.main_image_url}
                    alt={product.name}
                    className="h-16 w-16 object-cover rounded-md shadow-sm"
                  />
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {product.description}
                </td>
                <td className="py-3 px-4 text-gray-700">{product.quantity}</td>
                <td className="py-3 px-4 text-gray-700">
                  {product.category
                    ? product.category.name
                    : "Không có danh mục"}
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="text-green-600 hover:underline"
                    >
                      Chỉnh sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:underline"
                    >
                      Xoá
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <Link
          to="/admin/products/new"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
        >
          Tạo Sản Phẩm Mới
        </Link>
      </div>
    </div>
  );
};

export default ProductsList;
