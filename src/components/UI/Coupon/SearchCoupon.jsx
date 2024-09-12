import { useState } from "react";
import { Input, Form } from "antd";
import "antd/dist/reset.css"; // Đảm bảo import CSS của Ant Design
// import { BiSolidCoupon } from "react-icons/bi";
const { Search } = Input;
const SearchCoupon = () => {
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);

  const handleSearch = (value) => {
    console.log("Tìm kiếm từ khóa:", value);
    setSearchTerm(value);
    // Bạn có thể thêm logic xử lý tìm kiếm tại đây
  };
  return (
    <div className="search-coupon px-28">
      <Form>
        <Form.Item>
          <Search
            className="relative pl-4"
            placeholder={` Tìm mã giảm giá`}
            size="large"
            onSearch={handleSearch} // Gọi hàm xử lý khi nhấn tìm kiếm
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default SearchCoupon;
