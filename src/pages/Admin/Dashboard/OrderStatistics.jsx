import react from "react";
import PropTypes from "prop-types"; 
import { Card, Statistic } from "antd";

const OrderStatistics = ({ orderData }) => {
  const { countOrder, sumOrder, countCompletedOrders, countCancelledOrders } = orderData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <Statistic title="Tổng số đơn hàng" value={countOrder} />
      </Card>
      <Card>
        <Statistic title="Tổng doanh thu" value={sumOrder} precision={2} prefix="₫" />
      </Card>
      <Card>
        <Statistic title="Đơn hàng hoàn thành" value={countCompletedOrders} />
      </Card>
      <Card>
        <Statistic title="Đơn hàng đã hủy" value={countCancelledOrders} />
      </Card>
    </div>
  );
};

// Khai báo kiểu dữ liệu cho orderData
OrderStatistics.propTypes = {
  orderData: PropTypes.shape({
    countOrder: PropTypes.number.isRequired,
    sumOrder: PropTypes.number.isRequired,
    countCompletedOrders: PropTypes.number.isRequired,
    countCancelledOrders: PropTypes.number.isRequired,
  }).isRequired,
};

export default OrderStatistics;
