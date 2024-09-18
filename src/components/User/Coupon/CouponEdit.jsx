import  { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Select, DatePicker, message, Card } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { getCouponById, updateCoupon } from '../../../api/coupon';
import { FaRandom } from 'react-icons/fa';
import { getRandomCouponCode } from '../../../utils/couponHelpers';
const { Option } = Select;

const CouponEdit = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy ID từ URL
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        // Gọi API để lấy dữ liệu
        const response = await getCouponById(id);
        if (response.status) {
          const coupon = response.data; // Đảm bảo lấy đúng `data` từ response
          
          // Set giá trị cho form
          form.setFieldsValue({
            code: coupon.code,
            discount: parseFloat(coupon.discount), // Chuyển đổi về số nếu cần
            expiration_date: moment(coupon.expiration_date),
            status: coupon.status.toLowerCase(), // Đảm bảo trạng thái đúng dạng
          });
        }
      } catch (error) {
        message.error('Lỗi khi tải thông tin coupon');
      }
    };

    fetchCoupon();
  }, [id, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const updatedValues = {
        ...values,
        expiration_date: values.expiration_date.format('YYYY-MM-DD'),
      };
      await updateCoupon(id, updatedValues);
      message.success('Coupon đã được cập nhật thành công!');
      navigate('/admin/coupons');
    } catch (error) {
      message.error('Lỗi khi cập nhật coupon');
    } finally {
      setLoading(false);
    }
  };

  
  const handleGenerateRandomCode = () => {
    const randomCode = getRandomCouponCode();
    form.setFieldsValue({ code: randomCode });
  };

  return (
    <Card title="Chỉnh sửa Coupon" bordered={false} style={{ maxWidth: 600, margin: '0 auto', marginTop: 20 }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="code"
          label="Mã Coupon"
          rules={[{ required: true, message: 'Vui lòng nhập mã coupon!' }]}
        >
          <Input
            placeholder="Nhập mã coupon"
            addonAfter={<FaRandom onClick={handleGenerateRandomCode} style={{ cursor: 'pointer' }} />}
          />
        </Form.Item>

        <Form.Item
          name="discount"
          label="Giảm giá (%)"
          rules={[{ required: true, message: 'Vui lòng nhập giảm giá!' }]}
        >
          <InputNumber
            min={0}
            max={100}
            style={{ width: '100%' }}
            placeholder="Nhập phần trăm giảm giá"
          />
        </Form.Item>

        <Form.Item
          name="expiration_date"
          label="Ngày hết hạn"
          rules={[{ required: true, message: 'Vui lòng chọn ngày hết hạn!' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            placeholder="Chọn ngày hết hạn"
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
        >
          <Select placeholder="Chọn trạng thái">
            <Option value="active">active</Option>
            <Option value="unactive">unactive</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
            Cập nhật Coupon
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CouponEdit;
