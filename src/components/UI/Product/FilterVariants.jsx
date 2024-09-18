import { useState } from "react";
import ProductVariants from "./ProductVariants";
import PropTypes from "prop-types";

const FilterVariants = ({ variants }) => {
  // console.log("filter variant", variants);
  const [filter, setFilter] = useState({ color: "", size: "" });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const filteredVariants = variants.filter((variant) => {
    // console.log(variant);
    return (
      (filter.color === "" ||
        variant.attributes.some(
          (attr) => attr.attribute_id === 1 && attr.value === filter.color
        )) &&
      (filter.size === "" ||
        variant.attributes.some(
          (attr) => attr.attribute_id === 2 && attr.value === filter.size
        ))
    );
  });

  return (
    <div>
      <h3 className="text-2xl my-4">Filter Variants</h3>
      <label>
        Color:
        <select name="color" value={filter.color} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Nâu">Nâu</option>
          <option value="Cam">Cam</option>
          <option value="Đỏ">Đỏ</option>
          <option value="Xám">Xám</option>
        </select>
      </label>
      <label>
        Size:
        <select name="size" value={filter.size} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </label>
      <ProductVariants variants={filteredVariants} />
    </div>
  );
};

FilterVariants.propTypes = {
  variants: PropTypes.any,
};

export default FilterVariants;
