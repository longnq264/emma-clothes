// import { useState } from "react";
import PropTypes from "prop-types";
const ProductVariants = ({ variants }) => {
  const colorsSet = new Set();
  const sizesSet = new Set();

  variants.forEach((variant) => {
    variant.attributes.forEach((attr) => {
      if (attr.attribute_id === 1) {
        // Màu sắc
        colorsSet.add(attr.value);
      } else if (attr.attribute_id === 2) {
        // Kích cỡ
        sizesSet.add(attr.value);
      }
    });
  });

  return (
    <div>
      <h1 className="text-2xl my-4">Product variants</h1>
      <ul></ul>
    </div>
  );
};

ProductVariants.propTypes = {
  variants: PropTypes.any,
};

export default ProductVariants;
