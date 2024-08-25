import { useEffect, useState } from "react";
import { Select, Card } from "antd";
import { getAttributes } from "../../../api/api-server";
import PropTypes from "prop-types";
const { Option } = Select;
const AttributesProduct = ({ variants, setVariants }) => {
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);

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

  const handleAttributeChange = (attributeId, valueId) => {
    console.log("Attribute ID:", attributeId);
    console.log("valueId", valueId);

    setSelectedAttributes((prevItem) => {
      console.log(prevItem);

      const existingAttributeIndex = prevItem.findIndex(
        (attr) => attr.attribute_id === attributeId
      );
      console.log(existingAttributeIndex);

      if (existingAttributeIndex > -1) {
        const updatedAttributes = [...prevItem];
        updatedAttributes[existingAttributeIndex].value_id = valueId;
        return updatedAttributes;
      } else {
        return [
          ...prevItem,
          {
            attribute_id: attributeId,
            value_id: valueId,
          },
        ];
      }
    });
  };

  const addVariant = () => {
    if (selectedAttributes.length === 0) {
      alert("Vui lòng chọn thuộc tính trước khi thêm biến thể.");
      return;
    }

    // Tạo SKU từ selectedAttributes
    const sku = selectedAttributes
      .map((attribute) => attribute.value_id)
      .join("-");

    // Tìm biến thể có thuộc tính trùng khớp
    const existingVariantIndex = variants.findIndex(
      (variant) =>
        variant.attributes.length === selectedAttributes.length &&
        variant.attributes.every((attr) =>
          selectedAttributes.some(
            (selectedAttr) =>
              selectedAttr.attribute_id === attr.attribute_id &&
              selectedAttr.value_id === attr.value_id
          )
        )
    );
    console.log(existingVariantIndex);

    if (existingVariantIndex !== -1) {
      const existingVariant = variants[existingVariantIndex];
      const existingAttributeCount = existingVariant.attributes.length;
      const selectedAttributeCount = selectedAttributes.length;

      if (existingAttributeCount + selectedAttributeCount <= 3) {
        const updatedAttributes = [
          ...existingVariant.attributes.filter((attr) =>
            selectedAttributes.some(
              (selectedAttr) =>
                selectedAttr.attribute_id !== attr.attribute_id &&
                selectedAttr.value_id !== attr.value_id
            )
          ),
          ...selectedAttributes,
        ];

        setVariants((prevVariants) =>
          prevVariants.map((variant, index) =>
            index === existingVariantIndex
              ? {
                  ...variant,
                  sku,
                  attributes: updatedAttributes,
                  stock: 0,
                  price: 0,
                }
              : variant
          )
        );
      } else {
        const newVariant = {
          id: new Date().getTime(),
          sku,
          stock: 0,
          price: 0,
          attributes: [...selectedAttributes],
        };

        setVariants((prevVariants) => [...prevVariants, newVariant]);
      }
    } else {
      const newVariant = {
        id: new Date().getTime(),
        sku,
        stock: 0,
        price: 0,
        attributes: [...selectedAttributes],
      };

      setVariants((prevVariants) => [...prevVariants, newVariant]);
    }
    alert("Biến thể đã được thêm thành công!");

    setSelectedAttributes([]);
  };

  const handleInputChange = (index, field, value) => {
    console.log(field);
    console.log(value);

    setVariants((prevVariants) =>
      prevVariants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      )
    );
  };

  const handleRemoveVariant = (variantId) => {
    setVariants((prevVariants) =>
      prevVariants.filter((variant) => variant.id !== variantId)
    );
  };

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
              <Select
                name="option"
                placeholder="Chọn giá trị"
                style={{ width: "100%" }}
                value={
                  selectedAttributes.find(
                    (attr) => attr.attribute_id === attribute.id
                  )?.value_id || undefined
                }
                onChange={(value) => handleAttributeChange(attribute.id, value)}
              >
                {attribute.values.map((value) => (
                  <Option key={value.id} value={value.id}>
                    {value.value}
                  </Option>
                ))}
              </Select>
            </div>
          ))}
          <div
            onClick={addVariant}
            className="w-1/3 bg-stone-300 py-1 px-1 rounded mt-6 text-center hover:bg-stone-400"
          >
            Thêm thuộc tính
          </div>
        </div>
        <div className="basis-3/4 pl-20">
          <div className="py-2">
            <Card title="Chi tiết thuộc tính">
              <div className="grid grid-cols-5 text-lg text-center pb-2">
                <p>Sku</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Image</p>
                <p>Action</p>
              </div>
            </Card>
            <div>
              {variants.map((variant, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 text-lg text-center pb-2 my-2"
                >
                  <div>{variant.sku}</div>
                  <div className="border">
                    <input
                      name="price"
                      type="text"
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "price",
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="border mx-2">
                    <input
                      name="stock"
                      type="number"
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "stock",
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="border">
                    <input
                      name="thumb_nail"
                      type="text"
                      onChange={(e) =>
                        handleInputChange(index, "thumb_nail", e.target.value)
                      }
                    />
                  </div>
                  <button onClick={() => handleRemoveVariant(variant.id)}>
                    Xóa
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AttributesProduct.propTypes = {
  variants: PropTypes.any,
  setVariants: PropTypes.any,
};

export default AttributesProduct;
