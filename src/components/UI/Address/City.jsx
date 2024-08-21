import { useEffect, useState } from "react";
import { getListAddress } from "../../../api/api-server";
import { Select, Form } from "antd";
const { Option } = Select;
const City = () => {
  const [state, setState] = useState([]);
  const fetchCity = async () => {
    const response = await getListAddress();
    setState(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    fetchCity();
  }, []);
  return (
    <div>
      <ul>
        <Form.Item name="city">
          <Select placeholder="Select a city">
            {state.map((city) => (
              <Option key={city.id} value={city.name}>
                {city.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </ul>
    </div>
  );
};

export default City;
