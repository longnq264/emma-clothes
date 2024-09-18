import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  DatePicker,
  message,
  Card,
} from "antd";
import { addCoupon } from "../../../api/coupon";
import { useNavigate } from "react-router-dom";
import { FaTicketAlt } from "react-icons/fa";
import { getRandomCouponCode } from "../../../utils/couponHelpers"; // Giả sử bạn có một hàm helper để tạo mã ngẫu nhiên
import dayjs from "dayjs";
import { FaRandom } from "react-icons/fa";
const { Option } = Select;

const CouponAdd = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const data = {
        ...values,
        expiration_date: values.expiration_date.format("YYYY-MM-DD"),
      };
      await addCoupon(data);
      message.success("Coupon đã được thêm thành công!");
      navigate("/admin/coupons");
    } catch (error) {
      message.error("Lỗi khi thêm coupon");
    }
  };

  const generateRandomCode = () => {
    const randomCode = getRandomCouponCode(); // Hàm tạo mã ngẫu nhiên 6 ký tự
    form.setFieldsValue({ code: randomCode });
  };

  return (
    <Card
      title={
        <span>
          <FaTicketAlt /> Thêm Coupon Mới
        </span>
      }
      bordered={false}
      style={{ maxWidth: 600, margin: "0 auto", marginTop: 20 }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          status: "active", // Mặc định là Active
        }}
      >
        <Form.Item
          name="code"
          label="Mã Coupon"
          rules={[{ required: true, message: "Vui lòng nhập mã coupon!" }]}
        >
          <Input
            placeholder="Nhập mã coupon"
            addonAfter={
              <FaRandom
                onClick={generateRandomCode}
                style={{ cursor: "pointer" }}
              />
            }
          />
        </Form.Item>

        <Form.Item
          name="discount"
          label="Giảm giá (%)"
          rules={[{ required: true, message: "Vui lòng nhập giảm giá!" }]}
        >
          <InputNumber
            min={1}
            max={100}
            style={{ width: "100%" }}
            placeholder="Nhập phần trăm giảm giá"
          />
        </Form.Item>

        <Form.Item
          name="expiration_date"
          label="Ngày hết hạn"
          rules={[{ required: true, message: "Vui lòng chọn ngày hết hạn!" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            placeholder="Chọn ngày hết hạn"
            disabledDate={(current) =>
              current && current < dayjs().endOf("day")
            }
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
        >
          <Select placeholder="Chọn trạng thái">
            <Option value="active">active</Option>
            <Option value="unactive">unactive</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Thêm Coupon
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CouponAdd;

