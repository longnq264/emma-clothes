import { useEffect, useState } from "react";
import { Select, Typography, Card } from "antd";
import { getAttributes } from "../../../api/api-server";

const { Option } = Select;
const { Title, Text } = Typography;
const AttributesProduct = () => {
  const [attributes, setAttributes] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState(null);

  const fetchAttributes = async () => {
    try {
      const response = await getAttributes();
      setAttributes(response.data);
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch attributes:", error);
    }
  };

  useEffect(() => {
    fetchAttributes();
  }, []);

  const handleSelectChange = (event, attributeId) => {
    const selectedValue = event.target.value;
    const attribute = attributes.find((attr) => attr.id === attributeId);
    const selectedOption = attribute.values.find(
      (val) => val.value === selectedValue
    );
    setSelectedAttribute(selectedOption);
  };

  return (
    <div className="col-span-full">
      <h2 className="block text-lg font-medium text-gray-900 pb-2">
        Thuộc tính
      </h2>
      <div className="flex">
        <div className="basis-1/3">
          {attributes.map((attribute) => (
            <div key={attribute.id} className="mb-6">
              <p className="text-sm pb-2">{attribute.name}</p>
              <Select
                placeholder="Chọn giá trị"
                style={{ width: "100%" }}
                onChange={(value) => handleSelectChange(value, attribute.id)}
              >
                {attribute.values.map((value) => (
                  <Option key={value.id} value={value.value}>
                    {value.value}
                  </Option>
                ))}
              </Select>
            </div>
          ))}
        </div>
        <div className="basis-2/3 pl-20">
          <Card title="Chi tiết thuộc tính">
            {selectedAttribute ? (
              <div>
                <Title level={5}>Giá trị:</Title>
                <Text>{selectedAttribute.value}</Text>
              </div>
            ) : (
              <Text>Chọn một thuộc tính để hiển thị chi tiết.</Text>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AttributesProduct;
