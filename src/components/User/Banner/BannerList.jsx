import { useEffect, useState } from 'react';
import { Table, Button, Space, Popconfirm, Card, Tooltip, Switch, message } from 'antd';
import { getBanners, deleteBanner, toggleBannerStatus } from '../../../api/banner';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const response = await getBanners();
      if (Array.isArray(response.data)) {
        setBanners(response.data);
      } else {
        console.error("Response data is not an array:", response.data);
        message.error("Dữ liệu không hợp lệ.");
      }
    } catch (error) {
      console.error("Failed to fetch banners:", error);
      message.error("Không thể tải danh sách banner.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBanner(id);
      message.success("Banner đã được xóa thành công.");
      fetchBanners();
    } catch (error) {
      console.error("Failed to delete banner:", error);
      message.error("Không thể xóa banner.");
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      await toggleBannerStatus(id, { active: newStatus });
      message.success("Trạng thái banner đã được cập nhật.");
      fetchBanners();
    } catch (error) {
      console.error("Failed to update banner status:", error);
      message.error("Không thể cập nhật trạng thái banner.");
    }
  };

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (text) => text || 'Không có mô tả',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image_url',
      key: 'image_url',
      render: (text) => <img src={text} alt="Banner" style={{ width: '100px' }} />,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'active',
      key: 'active',
      render: (text, record) => (
        <Switch
          checked={record.active === 1}
          onChange={() => handleStatusChange(record.id, record.active)}
        />
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa">
            <Link to={`/admin/banners/edit/${record.id}`}>
              <Button type="primary" icon={<EditOutlined />} />
            </Link>
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa banner này không?"
              onConfirm={() => handleDelete(record.id)}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Card 
      title="Quản lý Banner" 
      extra={
        <Link to="/admin/banners/new">
          <Button type="primary" icon={<PlusOutlined />}>Thêm Banner</Button>
        </Link>
      }
    >
      <Table columns={columns} dataSource={banners} rowKey="id" loading={loading} />
    </Card>
  );
};

export default BannerList;
