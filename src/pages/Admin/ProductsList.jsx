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
      console.log("API response:", response);
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Danh sách sản phẩm</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Tên sản phẩm</th>
              <th className="py-2 px-4">Giá</th>
              {/* <th className="py-2 px-4">Ảnh</th> */}
              <th className="py-2 px-4">Mô tả</th>
              <th className="py-2 px-4">Danh mục</th>
              <th className="py-2 px-4">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {/* {products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="py-2 px-4">{product.id}</td>
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">{product.price}</td>
                  <td className="py-2 px-4">
                    <img
                      src={product.main_image_url}
                      alt={product.name}
                      className="h-16 w-16 object-cover"
                    />
                  </td>
                  <td className="py-2 px-4">{product.description}</td>
                  <td className="py-2 px-4">{product.category}</td>
                  <td className="py-2 px-4">
                    <div className="space-x-2">
                      <Link
                        to={`/admin/products/${product.id}/edit`}
                        className="text-green-600 "
                      >
                        Chỉnh sửa
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600"
                      >
                        Xoá
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <p>no data</p>
            )} */}

            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="py-2 px-4">{product.id}</td>
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">{product.price}</td>
                <td className="py-2 px-4">
                  {/* <img
                    src={product.main_image_url}
                    alt={product.name}
                    className="h-16 w-16 object-cover"
                  /> */}
                </td>
                <td className="py-2 px-4">{product.description}</td>
                <td className="py-2 px-4">{product.category.name}</td>
                <td className="py-2 px-4">
                  <div className="space-x-2">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="text-green-600 "
                    >
                      Chỉnh sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600"
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
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Create Product
        </Link>
      </div>
    </div>
  );
};

export default ProductsList;
