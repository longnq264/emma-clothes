import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Table, Pagination, Spin, message, Modal, Tag } from "antd";
import {
  getProducts,
  deleteProduct,
  getCategories,
} from "../../api/api-server";
import {
  SearchOutlined,
  PrinterOutlined,
  ReloadOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
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
        fetchData(); // Cập nhật danh sách sản phẩm sau khi xóa
        message.success("Sản phẩm đã được xóa thành công!");
      } catch (error) {
        console.error("Failed to delete product:", error);
        message.error("Xóa sản phẩm thất bại!");
      }
    }
  };

  const handleViewDescription = (description) => {
    setModalContent(description);
    setModalVisible(true);
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
    const childCategory = parentCategory?.children?.find(
      (child) => child.id === id
    );
    return childCategory ? childCategory.name : "Không có danh mục con";
  };

  const printProductsList = () => {
    const printWindow = window.open("", "", "height=600,width=800");
    if (printWindow) {
      printWindow.document.write(
        "<html><head><title>Print Products List</title>"
      );
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
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
      title: "Giá Cũ",
      dataIndex: "price_old",
      key: "price_old",
      render: (text) => (
        <span style={{ color: "red", textDecoration: "line-through" }}>
          {text}₫
        </span>
      ),
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
      title: "Mô Tả",
      dataIndex: "description",
      key: "description",
      render: (description) => (
        <div>
          {description.length > 50
            ? `${description.slice(0, 50)}...`
            : description}
          {description.length > 50 && (
            <Button
              type="link"
              onClick={() => handleViewDescription(description)}
              icon={<EyeOutlined />}
            >
              Xem thêm
            </Button>
          )}
        </div>
      ),
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
    },
    // {
    //   title: 'Khuyến Mãi',
    //   dataIndex: 'promotion',
    //   key: 'promotion',
    // },
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
      title: "Danh mục Cha",
      dataIndex: "category",
      key: "category",
      render: (_, record) => getParentCategory(record.category.parent_id),
    },
    {
      title: "Danh Mục Con",
      dataIndex: "category",
      key: "categoryChild",
      render: (_, record) =>
        getChildCategory(record.category.parent_id, record.category.id),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() =>
              (window.location.href = `/admin/products/edit/${record.id}`)
            }
          >
            {/* Chỉnh sửa */}
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            {/* Xoá */}
          </Button>
        </div>
      ),
    },
  ];

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
        <Input
          placeholder="Tìm kiếm sản phẩm"
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/3"
        />
      </div>
      <div className="print-container">
        <Table
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
            {indexOfLastProduct > filteredProducts.length
              ? filteredProducts.length
              : indexOfLastProduct}
          </strong>
          <span className="text-gray-700"> trên tổng số </span>
          <strong>{filteredProducts.length}</strong>
        </div>
        <Pagination
          current={currentPage}
          pageSize={productsPerPage}
          total={filteredProducts.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
      <Modal
        title="Mô Tả Sản Phẩm"
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={() => setModalVisible(false)}
          >
            OK
          </Button>,
        ]}
      >
        <p>{modalContent}</p>
      </Modal>
    </div>
  );
};

export default ProductsList;
