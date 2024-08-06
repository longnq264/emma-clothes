
import  { useEffect, useState } from 'react';
import { Table, Button, Space, Popconfirm, Card, Tooltip } from 'antd';
import { getBanners, deleteBanner } from '../../../api/banner';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const BannerList = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    const response = await getBanners();
    setBanners(response.data.data);
  };

  const handleDelete = async (id) => {
    await deleteBanner(id);
    fetchBanners();
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'image_url',
      key: 'image_url',
      render: (text) => <img src={text} alt="Banner" style={{ width: '100px' }} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Link to={`/admin/banners/edit/${record.id}`}>
              <Button type="primary" icon={<EditOutlined />} />
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this banner?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
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
      title="Banners" 
      extra={
        <Link to="/admin/banners/new">
          <Button type="primary" icon={<PlusOutlined />}>Add Banner</Button>
        </Link>
      }
    >
      <Table columns={columns} dataSource={banners} rowKey="id" />
    </Card>
  );
};

export default BannerList;
