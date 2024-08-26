import { useEffect, useState } from "react";
import { Checkbox } from "antd";
import { getAttributes } from "../../../api/api-server";
import PropTypes from "prop-types";
const AttributesProduct = ({
  variants,
  setVariants,
  idProduct,
  productItemsUser,
}) => {
  const [attributes, setAttributes] = useState([]);
  console.log("selected variant", variants);
  console.log(productItemsUser);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await getAttributes();
        setAttributes(response.data);
      } catch (error) {
        console.error("Failed to fetch attributes:", error);
      }
    };

    fetchAttributes();
  }, []);

  const handleAttributeChange = (attributeId, valueId, isChecked) => {
    setVariants((prevItem) => {
      const updatedAttributes = [...prevItem];
      const attributeIndex = updatedAttributes.findIndex(
        (attr) => attr.attribute_id === attributeId
      );

      if (attributeIndex > -1) {
        // Tìm attribute đã tồn tại và cập nhật value_ids
        const valueIds = updatedAttributes[attributeIndex].value_ids;

        if (isChecked) {
          // Chỉ thêm value_id nếu chưa có trong value_ids
          if (!valueIds.includes(valueId)) {
            valueIds.push(valueId);
          }
        } else {
          // Xóa value_id nếu checkbox bị bỏ chọn
          updatedAttributes[attributeIndex].value_ids = valueIds.filter(
            (id) => id !== valueId
          );
        }
      } else if (isChecked) {
        // Nếu attribute chưa tồn tại, thêm mới vào mảng
        updatedAttributes.push({
          attribute_id: attributeId,
          value_ids: [valueId],
        });
      }
      return updatedAttributes;
    });
  };

  console.log(idProduct);

  return (
    <div className="col-span-full">
      <h2 className="block text-xl font-medium text-gray-900 pb-4">
        Thuộc tính
      </h2>
      <div className="flex">
        <div className="basis-1/4">
          {attributes.map((attribute) => (
            <div key={attribute.id} className="mb-6">
              <p className="text-sm pb-2">{attribute.name}</p>
              <div>
                {attribute.values.map((value) => (
                  <Checkbox
                    key={value.id}
                    value={value.id}
                    checked={
                      variants
                        .find((attr) => attr.attribute_id === attribute.id)
                        ?.value_ids.includes(value.id) || false
                    }
                    onChange={(e) =>
                      handleAttributeChange(
                        attribute.id,
                        value.id,
                        e.target.checked
                      )
                    }
                  >
                    {value.value}
                  </Checkbox>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="basis-4/5">
          {productItemsUser.map((data) => (
            <div key={data.id}>
              <div className="flex">
                <h1 className="text-black">{data.sku}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

AttributesProduct.propTypes = {
  variants: PropTypes.any,
  setVariants: PropTypes.any,
  idProduct: PropTypes.any,
  productItemsUser: PropTypes.any,
};

export default AttributesProduct;
