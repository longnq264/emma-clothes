import React, { useState, useEffect } from "react";
import { getUsers } from "../../api/api-server";

const StaffList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data || []); // Adjust based on actual API response
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Lỗi khi lấy dữ liệu người dùng");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (users.length === 0) return <div>Không có dữ liệu người dùng.</div>;

  return (
    <div>
      <h1>Danh sách người dùng</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default StaffList;
