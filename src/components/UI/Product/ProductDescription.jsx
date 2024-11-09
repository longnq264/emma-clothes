import PropTypes from "prop-types";
import { formatCurrency } from "../../../utils/helperFunction";
const ProductDescription = ({ product }) => {
  console.log(product);
  return (
    <div className="px-2 md:px-4 pb-4">
      <h2 className="font-semibold mt-4 text-sm">{product.name}</h2>
      <p className="pt-2">{formatCurrency(product.price)}</p>
    </div>
  );
};

ProductDescription.propTypes = {
  product: PropTypes.any,
};

export default ProductDescription;
