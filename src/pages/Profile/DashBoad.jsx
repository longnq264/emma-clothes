import { useSelector } from "react-redux";

const DashBoad = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  if (!token) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gray-200 text-center p-4">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
      </div>
      <div className="p-4">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Date of Birth:</strong> {user.date_of_birth}
        </p>
      </div>
    </div>
  );
};

export default DashBoad;
