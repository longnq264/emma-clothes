import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct, getCategories } from "../../api/api-server";
const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

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

  const getParentCategory = (parentId) => {
    const category = findCategoryById(parentId);
    return category ? category.name : "Không có danh mục cha";
  };

  const getChildCategory = (parentId, id) => {
    const parentCategory = findCategoryById(parentId);
    const childCategory = parentCategory?.children?.find((child) => child.id === id);
    return childCategory ? childCategory.name : "Không có danh mục con";
  };
  const printProductsList = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Products List</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(document.querySelector('.print-container').innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="flex justify-center items-center"><div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div></div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto py-8">
      <div className="overflow-x-auto">
        <h1 className="text-4xl font-bold mb-6">Danh Sách Sản Phẩm</h1>
        <div className="mt-8 flex flex-wrap justify-between items-center gap-4">
  <Link
    to="/admin/products/new"
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
  >
    Tạo Sản Phẩm Mới
  </Link>
  <input
    type="text"
    placeholder="Tìm kiếm sản phẩm"
    value={searchTerm}
    onChange={handleSearch}
    className="border border-gray-300 rounded-lg py-2 px-3 flex-1 min-w-[200px]"
  />
  <button
    onClick={printProductsList}
    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
  >
    Xuất Danh Sách
  </button>
</div>

        <br />
        <br />
        <div className="print-container">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">ID</th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">Tên</th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">Giá</th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">Giá Cũ</th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">Ảnh</th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">Mô Tả</th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">Số Lượng</th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">View</th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">Danh mục Cha</th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">Danh Mục Con</th>
                {/* <th className="py-3 px-4 text-left text-gray-600 font-semibold">Thương Hiệu</th> */}
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <Link to={`/products/${product.id}`} className="text-blue-600 hover:underline">
                      {product.id}
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <Link to={`/products/${product.id}`} className="text-blue-600 hover:underline">
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
                      className="h-16 w-16 object-cover rounded-md shadow-sm"
                      loading="lazy"
                    />
                  </td>
                  <td className="py-3 px-4 text-gray-700">{product.description}</td>
                  <td className="py-3 px-4 text-gray-700">{product.quantity}</td>

                  <td className="py-3 px-4 text-gray-700">{product.view}</td>
                  <td className="py-3 px-4 text-gray-700">
                    {getParentCategory(product.category.parent_id)}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {getChildCategory(product.category.parent_id, product.category.id)}
                  </td>
                  {/* <td className="py-3 px-4 text-gray-700">
                    {product.brand ? product.brand.name : "Không có thương hiệu"}
                  </td> */}
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
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-gray-700">
              Trang {currentPage} / {Math.ceil(filteredProducts.length / productsPerPage)}
            </span>
          </div>
          <div>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-lg"
            >
              Trước
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-lg ml-2"
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;