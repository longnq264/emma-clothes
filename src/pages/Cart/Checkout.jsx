import React from 'react';

import { Form, Input, Button, Select, Radio, Card, Divider, Row, Col } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Option } = Select;

const Checkout = () => {
  return (
    <Row justify="center" style={{ padding: '20px' }}>
      <Col span={12}>
        <Card title="Thông tin thanh toán" bordered={false}>
          <Form layout="vertical">
            <Form.Item label="Người nhận">
              <Input placeholder="Tên người nhận" />
              <Input placeholder="Số điện thoại" style={{ marginTop: '10px' }} />
              <Input placeholder="Email (không bắt buộc)" style={{ marginTop: '10px' }} />
            </Form.Item>

            <Divider />

            <Form.Item label="Hình thức nhận hàng">
              <Radio.Group defaultValue="delivery">
                <Radio.Button value="delivery">Giao tận nơi</Radio.Button>
                <Radio.Button value="pickup">Lấy tại cửa hàng</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Địa chỉ nhận hàng">
              <Select defaultValue="Hồ Chí Minh" style={{ width: '100%' }}>
                <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
                <Option value="Hà Nội">Hà Nội</Option>
              </Select>
              <Input placeholder="Địa chỉ cụ thể" style={{ marginTop: '10px' }} />
            </Form.Item>

            <Divider />

            <Form.Item label="Phương thức vận chuyển">
              <Radio.Group defaultValue="standard">
                <Radio value="standard">Vận chuyển tiêu chuẩn (20,000 ₫)</Radio>
              </Radio.Group>
            </Form.Item>

            <Divider />

            <Form.Item label="Phương thức thanh toán">
              <Radio.Group defaultValue="cod">
                <Radio value="cod">Thanh toán khi nhận hàng (COD)</Radio>
                <Radio value="atm">Thẻ ATM nội địa/Internet Banking (Miễn phí thanh toán)</Radio>
                <Radio value="visa">Thẻ quốc tế (Visa, Master, JCB)</Radio>
              </Radio.Group>
            </Form.Item>

            <Button type="primary" block icon={<ShoppingCartOutlined />}>
              Thanh toán bằng thẻ tín dụng
            </Button>
          </Form>
        </Card>
      </Col>
      <Col span={8} offset={1}>
        <Card bordered={false}>
          <div>
            {/* <img src="https://via.placeholder.com/150" alt="Product" style={{ width: '100%' }} /> */}
            {/* <p>Tổng giá sản phẩm: 346,000 ₫</p>
            <p>Phí vận chuyển: 20,000 ₫</p>
            <Divider />
            <h3>Tổng thanh toán: 366,000 ₫</h3> */}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Checkout;
