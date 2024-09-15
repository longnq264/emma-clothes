import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Checkbox } from "antd";
import { getAttributes } from "../../../api/api-server";
import OnChangeAttribute from "./OnChangeAttribute";
const AttributesProduct = ({
  variants,
  setVariants,
  productItemsUser,
  setProductItemsUser,
}) => {
  const [attributes, setAttributes] = useState([]);
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

          // Nếu value_ids rỗng, xóa attribute
          if (updatedAttributes[attributeIndex].value_ids.length === 0) {
            updatedAttributes.splice(attributeIndex, 1);
          }
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

  return (
    <div className="col-span-full rounded-lg bg-slate-100 shadow-inner p-4">
      <h2 className="block text-3xl font-medium text-gray-900 pb-4">
        Thuộc tính
      </h2>
      <div className="flex px-2">
        <div className="basis-1/3">
          {attributes.map((attribute) => (
            <div key={attribute.id} className="mb-6">
              <p className="text-sm pb-4 text-xl">{attribute.name}</p>
              <div className="bg-white rounded-lg shadow-inner">
                {attribute.values.map((value) => (
                  <Checkbox
                    className="text-lg p-4"
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

        <OnChangeAttribute
          productItemsUser={productItemsUser}
          setProductItemsUser={setProductItemsUser}
        />
      </div>
    </div>
  );
};

AttributesProduct.propTypes = {
  variants: PropTypes.any,
  setVariants: PropTypes.any,
  idProduct: PropTypes.any,
  productItemsUser: PropTypes.any,
  setProductItemsUser: PropTypes.any,
};

export default AttributesProduct;
