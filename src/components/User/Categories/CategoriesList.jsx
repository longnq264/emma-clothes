import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  notification,
  Tag,
  Tooltip,
  Popconfirm,
} from "antd";
import { getCategories, deleteCategory } from "../../../api/api-server"; // Adjust the path as necessary
import { Link, useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      // console.log("Fetched categories:", response); // Log the full response
      if (
        response.data &&
        response.data[0] &&
        Array.isArray(response.data[0].children)
      ) {
        setCategories(response.data[0].children);
      } else {
        // console.error("Expected an array of categories but got:", response);
        setCategories([]); // Set an empty array if the data is not in the expected format
      }
    } catch (error) {
      notification.error({
        message: "Lỗi khi tải danh mục!",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      notification.success({ message: "Danh mục đã được xóa thành công!" });
      fetchCategories(); // Refresh the list after deletion
    } catch (error) {
      notification.error({
        message: "Lỗi khi xóa danh mục!",
        description: error.message,
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const columns = [
    {
      title: "Tên Danh Mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô Tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>
          {status === "Active" ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa">
            <Link to={`/admin/categories/edit/${record.id}`}>
              <Button type="link" icon={<EditOutlined />} />
            </Link>
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Bạn Có Muốn Xóa Danh Mục Này Không?"
              onConfirm={() => handleDelete(record.id)}
              okText="Có"
              cancelText="Không"
            >
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
      <h1 style={{ marginBottom: '20px' }}>Danh Sách Danh Mục</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => navigate("/admin/categories/new")}
        style={{ marginBottom: '16px' }}
      >
        Thêm Danh Mục
      </Button>
      <Table
        columns={columns}
        dataSource={categories}
        rowKey="id"
        loading={loading}
        style={{ background: '#fff', borderRadius: '8px' }}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default CategoriesList;
