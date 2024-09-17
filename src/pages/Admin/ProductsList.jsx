import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
  Table,
  Pagination,
  Spin,
  message,
  Tag,
  Dropdown,
} from "antd";
import {
  getProducts,
  deleteProduct,
  getCategories,
} from "../../api/api-server";
import {
  SearchOutlined,
  PrinterOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filters] = useState({ status: "", category: "", type: "" });
  const productsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);
      setProducts(productsResponse.data || []);
      setCategories(categoriesResponse.data || []);
    } catch (error) {
      setError("Thất bại lấy dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await deleteProduct(productId);
        fetchData();
        message.success("Sản phẩm đã được xóa thành công!");
      } catch (error) {
        console.error("Failed to delete product:", error);
        message.error("Xóa sản phẩm thất bại!");
      }
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedProducts.length === 0) {
      message.warning("Vui lòng chọn ít nhất một sản phẩm.");
      return;
    }
    try {
      if (action === "delete") {
        await Promise.all(selectedProducts.map((id) => deleteProduct(id)));
        message.success("Đã xóa sản phẩm thành công!");
      }
      fetchData();
    } catch (error) {
      message.error("Có lỗi xảy ra khi thực hiện hành động hàng loạt.");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => {
      if (filters.status && product.status !== filters.status) return false;
      if (
        filters.category &&
        !categories.some((cat) => cat.id === product.category.id)
      )
        return false;
      if (filters.type === "new" && !product.is_new) return false;
      if (filters.type === "old" && product.is_new) return false;
      return true;
    });

  const sortedProducts = filteredProducts.sort((a, b) => b.created_at - a.created_at);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, record) => (
        <Link to={`/admin/products/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link to={`/products/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>{text}₫</span>,
    },
    {
      title: "Ảnh",
      dataIndex: "productImages",
      key: "productImages",
      render: (images) => (
        <img
          src={
            images.find((img) => img.is_thumbnail === 1)?.image_url ||
            "https://via.placeholder.com/150"
          }
          alt="product"
          style={{ height: "60px", width: "60px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "Kích hoạt" : "Vô hiệu hóa"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() =>
              (window.location.href = `/admin/products/${record.id}`)
            }
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() =>
              (window.location.href = `/admin/products/edit/${record.id}`)
            }
          />
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  const printProductsList = () => {
    const printWindow = window.open("", "", "height=600,width=800");
    if (printWindow) {
      printWindow.document.write("<html><head><title>Print Products List</title>");
      printWindow.document.write(
        `<style>
          body { font-family: Arial, sans-serif; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; }
          th { background-color: #f4f4f4; }
        </style>`
      );
      printWindow.document.write("</head><body>");
      printWindow.document.write(
        document.querySelector(".print-container").innerHTML
      );
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    } else {
      message.error("Không thể mở cửa sổ in.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );

  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-6">Danh Sách Sản Phẩm</h1>
      <div className="mb-4 flex items-center justify-between flex-col md:flex-row">
        <div className="flex space-x-2 mb-4 md:mb-0">
          <Button type="primary" className="flex items-center">
            <Link to="/admin/products/new" className="text-white">
              Tạo Sản Phẩm Mới
            </Link>
          </Button>
          <Dropdown
            menu={{
              items: [
                {
                  key: 'delete',
                  label: 'Xóa tất cả sản phẩm đã chọn',
                  onClick: () => handleBulkAction("delete"),
                },
              ],
            }}
          >
            <Button className="flex items-center">
              <MoreOutlined className="mr-2" /> Hành Động Hàng Loạt
            </Button>
          </Dropdown>
          <Button
            type="default"
            className="flex items-center"
            onClick={printProductsList}
          >
            <PrinterOutlined className="mr-2" /> Xuất Danh Sách
          </Button>
          <Button
            type="default"
            className="flex items-center"
            onClick={fetchData}
          >
            <ReloadOutlined className="mr-2" /> Tải Lại
          </Button>
        </div>
        <div className="flex space-x-4">
          <Input
            placeholder="Tìm kiếm sản phẩm"
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={handleSearch}
            className="w-full md:w-1/10"
          />
        </div>
      </div>
      <div className="print-container">
        <Table
          rowSelection={{
            selectedRowKeys: selectedProducts,
            onChange: (selectedRowKeys) => setSelectedProducts(selectedRowKeys),
          }}
          columns={columns}
          dataSource={currentProducts}
          rowKey="id"
          pagination={false}
          scroll={{ x: true }}
        />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <span className="text-gray-700">Hiển thị từ </span>
          <strong>
            {indexOfFirstProduct + 1} -{" "}
            {indexOfLastProduct > sortedProducts.length
              ? sortedProducts.length
              : indexOfLastProduct}
          </strong>
          <span className="text-gray-700"> trên tổng số </span>
          <strong>{sortedProducts.length}</strong>
        </div>
        <Pagination
          current={currentPage}
          pageSize={productsPerPage}
          total={sortedProducts.length}
          pageSizeOptions={['10', '20', '50']}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default ProductsList;
