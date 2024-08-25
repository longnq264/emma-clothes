import { useState } from "react";
import { Form, Input, Button, Select } from "antd";

const { Option } = Select;

const ProductDetailsForm = () => {
  const [form] = Form.useForm();
  const [variants, setVariants] = useState([]);

  // Giả sử bạn có 3 thuộc tính: màu sắc, size, chất liệu
  const attributes = {
    colors: [
      { id: 1, name: "Đen" },
      { id: 2, name: "Trắng" },
    ],
    sizes: [
      { id: 3, name: "S" },
      { id: 4, name: "M" },
    ],
    materials: [
      { id: 5, name: "Cotton" },
      { id: 6, name: "Polyester" },
    ],
  };

  // Xử lý khi chọn thuộc tính
  const handleAttributeSelect = (attributeType, value) => {
    const newVariant = {
      sku: `${attributeType}-${value}`,
      price: "",
      stock: "",
      img: "",
      attributes: [{ attributeType, value }],
    };
    setVariants([...variants, newVariant]);
  };

  // Xử lý submit form
  const handleFinish = (values) => {
    console.log("Form Values:", values);
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item label="Màu sắc">
        <Select
          placeholder="Chọn màu sắc"
          onSelect={(value) => handleAttributeSelect("color", value)}
        >
          {attributes.colors.map((color) => (
            <Option key={color.id} value={color.name}>
              {color.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {variants.length > 0 &&
        variants.map((variant, index) => (
          <div key={index} className="variant-detail">
            <h4>SKU: {variant.sku}</h4>
            <Form.Item
              label="Giá"
              name={["variants", index, "price"]}
              rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
            >
              <Input
                placeholder="Nhập giá"
                onChange={(e) =>
                  setVariants(
                    variants.map((v, i) =>
                      i === index ? { ...v, price: e.target.value } : v
                    )
                  )
                }
              />
            </Form.Item>
            <Form.Item
              label="Số lượng"
              name={["variants", index, "stock"]}
              rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
            >
              <Input
                placeholder="Nhập số lượng"
                type="number"
                onChange={(e) =>
                  setVariants(
                    variants.map((v, i) =>
                      i === index ? { ...v, stock: e.target.value } : v
                    )
                  )
                }
              />
            </Form.Item>
            <Form.Item
              label="Hình ảnh"
              name={["variants", index, "img"]}
              rules={[{ required: true, message: "Vui lòng chọn hình ảnh!" }]}
            >
              <Input
                placeholder="Chọn hình ảnh"
                onChange={(e) =>
                  setVariants(
                    variants.map((v, i) =>
                      i === index ? { ...v, img: e.target.value } : v
                    )
                  )
                }
              />
            </Form.Item>
          </div>
        ))}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductDetailsForm;
