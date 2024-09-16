import react from "react";
import PropTypes from "prop-types";  // Import thêm prop-types
import { Card, Statistic } from "antd";

const ProductStatistics = ({ productData }) => {
  const { productStock, inventoryTotalValue, countSoldProducts } = productData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <Statistic title="Sản phẩm tồn kho" value={productStock} />
      </Card>
      <Card>
        <Statistic title="Tổng giá trị tồn kho" value={inventoryTotalValue} precision={2} prefix="₫" />
      </Card>
      <Card>
        <Statistic title="Sản phẩm đã bán" value={countSoldProducts} />
      </Card>
    </div>
  );
};

// Khai báo kiểu dữ liệu cho productData
ProductStatistics.propTypes = {
  productData: PropTypes.shape({
    productStock: PropTypes.number.isRequired,
    inventoryTotalValue: PropTypes.number.isRequired,
    countSoldProducts: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductStatistics;
