import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getProducts,
  deleteProduct,
  getCategories,
} from "../../api/api-server";
const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "price", label: "Price" },
  { key: "oldPrice", label: "Price Old" },
  { key: "image", label: "Imgae" },
  { key: "description", label: "Description" },
  { key: "quantity", label: "Quantity" },
  { key: "views", label: "View" },
  { key: "parentCategory", label: "Danh Mục Cha" },
  { key: "childCategory", label: "Danh Mục Con" },
  { key: "actions", label: "Hành Động" },
];
const ProductsList = () => {
  const [expandedDescriptionId, setExpandedDescriptionId] = useState(null);

  const toggleDescription = (productId) => {
    if (expandedDescriptionId === productId) {
      setExpandedDescriptionId(null); // Thu nhỏ nếu đã mở rộng
    } else {
      setExpandedDescriptionId(productId); // Mở rộng mô tả cho sản phẩm này
    }
  };
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);
      setProducts(productsResponse.data || []);
      setCategories(categoriesResponse.data || []);
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await deleteProduct(productId);
        fetchData(); // Cập nhật danh sách sản phẩm sau khi xóa
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  const findCategoryById = (id) => {
    const findInCategories = (categories) => {
      for (const category of categories) {
        if (category.id === id) return category;
        if (category.children) {
          const found = findInCategories(category.children);
          if (found) return found;
        }
      }
      return null;
    };
    return findInCategories(categories);
  };

  // danh mục cha

  const getParentCategory = (parentId) => {
    const category = findCategoryById(parentId);
    return category ? category.name : "Không có danh mục cha";
  };

  // hàm danh mục con

  const getChildCategory = (parentId, id) => {
    const parentCategory = findCategoryById(parentId);
    const childCategory = parentCategory?.children?.find(
      (child) => child.id === id
    );
    return childCategory ? childCategory.name : "Không có danh mục con";
  };

  const printProductsList = () => {
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write(
      "<html><head><title>Print Products List</title>"
    );
    printWindow.document.write("</head><body >");
    printWindow.document.write(
      document.querySelector(".print-container").innerHTML
    );
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto py-8">
      <div className="overflow-x-auto">
        <h1 className="text-4xl font-bold mb-6">Danh Sách Sản Phẩm</h1>
        <div className="mt-8 flex justify-between">
          <Link
            to="/admin/products/new"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          >
            Tạo Sản Phẩm Mới
          </Link>
          <button
            onClick={printProductsList}
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          >
            Xuất Danh Sách
          </button>
        </div>
        <br />
        <div className="print-container">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="py-3 px-4 text-left text-gray-600 font-semibold"
                  >
                    {column.label}
                  </th>
                ))}
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
                  <td className="py-3 px-4 text-blue-600 font-semibold">
                    {product.price}₫
                  </td>
                  <td className="py-3 px-4 text-red-600 font-through">
                    {product.price_old}₫
                  </td>
                  <td className="py-3 px-4">
                    <img
                      src={product.main_image_url || "default_image_url"}
                      alt={product.name}
                      className="h-16 w-16 object-cover rounded-md shadow-sm min-w-20 min-h-24"
                      loading="lazy"
                    />
                  </td>
                  <td className="py-3 px-4 text-gray-700 ">
                    <div
                      onClick={() => toggleDescription(product.id)}
                      className="cursor-pointer"
                    >
                      {expandedDescriptionId === product.id ? (
                        <div className="absolute z-10 p-4 bg-white border border-gray-300 shadow-lg max-w-lg">
                          <p className="text-lg font-semibold">
                            {product.description}
                          </p>
                          <button
                            onClick={() => toggleDescription(product.id)}
                            className="mt-2 text-blue-500 hover:underline"
                          >
                            Thu nhỏ
                          </button>
                        </div>
                      ) : (
                        // <span>{product.description.slice(0, 50)}...</span>
                        <></>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {product.quantity}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{product.view}</td>
                  <td className="py-3 px-4 text-gray-700">
                    {getParentCategory(product.category.parent_id)}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {getChildCategory(
                      product.category.parent_id,
                      product.category.id
                    )}
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
      </div>
    </div>
  );
};

export default ProductsList;
