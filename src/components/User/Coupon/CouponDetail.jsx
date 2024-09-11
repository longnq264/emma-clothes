import { useEffect, useState } from 'react';
import { Card, Descriptions, Spin, message, Button, Tag } from 'antd'; 
import { getCouponById } from '../../../api/coupon';
import { useParams, useNavigate } from 'react-router-dom'; 
import { PercentageOutlined, CalendarOutlined, TagOutlined, FileTextOutlined, SyncOutlined, ArrowLeftOutlined } from '@ant-design/icons';

// Helper function to format date to YYYY-MM-DD
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

const CouponDetail = () => {
  const { id } = useParams(); 
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const response = await getCouponById(id);
        if (response.status) {
          setCoupon(response.data);
        } else {
          message.error('Không tìm thấy coupon');
        }
      } catch (error) {
        message.error('Lỗi khi lấy dữ liệu coupon');
        console.error(error); 
      } finally {
        setLoading(false);
      }
    };

    fetchCoupon();
  }, [id]);

  const handleBack = () => {
    navigate(-1); 
  };

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;
  }

  return (
    <Card
      title={
        <span>
          <TagOutlined style={{ marginRight: 8 }} />
          Chi tiết Coupon - {coupon?.code}
        </span>
      }
      bordered={false}
      style={{ maxWidth: 600, margin: '0 auto', marginTop: 20 }}
      extra={
        <Button type="default" icon={<ArrowLeftOutlined />} onClick={handleBack}>
          Thoát
        </Button>
      }
    >
      <Descriptions bordered column={1} layout="vertical" labelStyle={{ fontWeight: 'bold' }}>
        <Descriptions.Item label={<span><TagOutlined /> Mã Coupon</span>}>
          {coupon?.code}
        </Descriptions.Item>
        <Descriptions.Item label={<span><PercentageOutlined /> Giảm giá</span>}>
          {coupon?.discount}%
        </Descriptions.Item>
        <Descriptions.Item label={<span><CalendarOutlined /> Ngày hết hạn</span>}>
          {formatDate(coupon?.expiration_date)}
        </Descriptions.Item>
        <Descriptions.Item label={<span><TagOutlined /> Trạng thái</span>}>
          <Tag color={coupon?.status === 'Active' ? 'green' : 'red'}>{coupon?.status}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label={<span><FileTextOutlined /> Ngày tạo</span>}>
          {formatDate(coupon?.created_at)}
        </Descriptions.Item>
        <Descriptions.Item label={<span><SyncOutlined /> Ngày cập nhật</span>}>
          {formatDate(coupon?.updated_at)}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default CouponDetail;
