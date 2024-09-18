import { useEffect, useState } from 'react';
import { Table, message, Tag, Button, Space, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { getAllCoupons, deleteCoupon } from '../../../api/coupon';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await getAllCoupons();
        if (response.status) {
          setCoupons(response.data);
        } else {
          message.error('Lỗi khi tải danh sách coupon');
        }
      } catch (error) {
        message.error('Lỗi khi lấy danh sách coupon');
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await deleteCoupon(id);
      if (response.status) {
        message.success('Xóa coupon thành công');
        setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon.id !== id));
      } else {
        message.error('Lỗi khi xóa coupon');
      }
    } catch (error) {
      message.error('Lỗi khi xóa coupon');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Mã Coupon',
      dataIndex: 'code',
      key: 'code',
      render: (text, record) => (
        <Link to={`/admin/coupons/${record.id}`}>
          <Tag color="blue" style={{ fontSize: '14px' }}>
            {text}
          </Tag>
        </Link>
      ),
    },
    {
      title: 'Giảm giá (%)',
      dataIndex: 'discount',
      key: 'discount',
      render: (discount) => Math.round(discount), // Display discount as a whole number without decimals
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expiration_date',
      key: 'expiration_date',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Link to={`/admin/coupons/${record.id}`}>
            <Button type="text" icon={<EyeOutlined />} />
          </Link>
          <Link to={`/admin/coupons/edit/${record.id}`}>
            <Button type="text" icon={<EditOutlined />} />
          </Link>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa coupon này không?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px'  } } className="text-2xl font-bold mb-4">Danh sách Coupon</h1>
      <Table
        columns={columns}
        dataSource={coupons}
        rowKey="id"
        loading={loading}
        bordered
        pagination={{ pageSize: 5 }}
        style={{ backgroundColor: '#fff' }}className="text-2xl font-bold mb-4"
      />
    </div>
  );
};

export default CouponList;
