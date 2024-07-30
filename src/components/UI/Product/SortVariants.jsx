import { useState } from "react";
import PropTypes from "prop-types";
import ProductVariants from "./ProductVariants";

const SortVariants = ({ variants }) => {
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortedVariants = [...variants].sort((a, b) => {
    if (sortOrder === "asc") {
      return parseFloat(a.price) - parseFloat(b.price);
    } else {
      return parseFloat(b.price) - parseFloat(a.price);
    }
  });

  return (
    <div>
      <h3>Sort Variants</h3>
      <label>
        Sort by Price:
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </label>
      <ProductVariants variants={sortedVariants} />
    </div>
  );
};

SortVariants.propTypes = {
  variants: PropTypes.any,
};
export default SortVariants;
