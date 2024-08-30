import { Card, Descriptions } from "antd";

const ProfileAdmin = () => {
  const adminInfo = JSON.parse(localStorage.getItem("admin")) || {};

  return (
    <div className="flex justify-center w-full">
      <Card
        className="w-full max-w-2xl mt-10"
        title="Thông tin cá nhân Quản Trị Viên"
      >
        <Descriptions bordered>
          {/* tên  */}
          <Descriptions.Item label="Tên" span={3}>
            {adminInfo.name || "Không có dữ liệu"}
          </Descriptions.Item>
          {/* email */}
          <Descriptions.Item label="Email" span={3}>
            {adminInfo.email || "Không có dữ liệu"}
          </Descriptions.Item>
          {/* ngày sinh */}
          <Descriptions.Item label="Email" span={3}>
            {adminInfo.date_of_birth || "Không có dữ liệu"}
          </Descriptions.Item>

          {/* địa chỉ */}
          <Descriptions.Item label="Email" span={3}>
            {adminInfo.address || "Không có dữ liệu"}
          </Descriptions.Item>

          {/* số điện thoại */}
          <Descriptions.Item label="Email" span={3}>
            {adminInfo.phone_number || "Không có dữ liệu"}
          </Descriptions.Item>

          {/* role */}
          <Descriptions.Item label="Vai trò" span={3}>
            {adminInfo.role || "Không có dữ liệu"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default ProfileAdmin;
