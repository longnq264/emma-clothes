import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Input, Form } from "antd";
import "antd/dist/reset.css"; // Đảm bảo import CSS của Ant Design
const { Search } = Input;

const SearchCoupon = ({ setCoupons, coupons }) => {
  const [originalCoupons, setOriginalCoupons] = useState([]); // Lưu danh sách coupons gốc

  // Lưu danh sách gốc khi component mount hoặc khi danh sách coupons thay đổi
  useEffect(() => {
    setOriginalCoupons(coupons);
  }, [coupons]);

  const handleSearch = (value) => {
    if (value.trim() === "") {
      // Nếu không có từ khóa, đặt lại danh sách coupons gốc
      setCoupons(originalCoupons);
    } else {
      // console.log("Tìm kiếm từ khóa:", value);
      const searchCoupon = originalCoupons.filter(
        (data) => data.code === value
      );
      setCoupons(searchCoupon);
    }
  };

  return (
    <div className="search-coupon px-28">
      <Form>
        <Form.Item>
          <Search
            className="relative pl-4"
            placeholder="Tìm mã giảm giá"
            size="large"
            onSearch={handleSearch} // Gọi hàm xử lý khi nhấn tìm kiếm
          />
        </Form.Item>
      </Form>
    </div>
  );
};

SearchCoupon.propTypes = {
  setCoupons: PropTypes.func.isRequired, // Đảm bảo setCoupons là hàm
  coupons: PropTypes.array.isRequired, // Đảm bảo coupons là mảng
};

export default SearchCoupon;
