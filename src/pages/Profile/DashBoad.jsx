import { useSelector } from "react-redux";

const DashBoad = () => {
  // const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.auth.status); // Thêm trạng thái cho việc fetch dữ liệu
  const error = useSelector((state) => state.auth.error); // Thêm lỗi nếu có
  console.log("user redux", user);

  console.log(token);

  if (!token) {
    return <div>Loading...</div>;
  }

  if (status === "loading") {
    return <div>Loading user data...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="w-full">
      <div className="px-8 py-4">
        <div className="p-4">
          <h1 className="text-3xl font-semibold uppercase">Chào {user.name}</h1>
          <p className="pt-3">
            Hãy chỉnh sửa bất kỳ thông tin chi tiết nào bên dưới để tài khoản
            của bạn luôn được cập nhật.
          </p>
        </div>
        <div className="p-4 mt-4">
          <h1 className="text-3xl font-semibold uppercase">
            Thông Tin Chi Tiết
          </h1>
          <p className="uppercase py-2">{user.name}</p>
          <p>{user.date_of_birth}</p>
        </div>
        <div className="p-4 mt-4">
          <h1 className="text-3xl font-semibold uppercase">
            Chi tiết đăng nhập
          </h1>
          <p className="text-lg font-semibold uppercase mt-4">Email</p>
          <p className="uppercase py-2">{user.email}</p>
          <p>{user.date_of_birth}</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoad;
