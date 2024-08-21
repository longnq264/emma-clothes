import { useState, useEffect } from 'react';
import { Table, Button, Input, message, Upload } from 'antd';
import { getUsers, deleteUser, importUsers } from '../../../api/api-server';
import moment from 'moment';
import { SearchOutlined, UploadOutlined } from '@ant-design/icons';
import FileSaver from 'file-saver';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      message.error('Lỗi khi lấy dữ liệu người dùng.');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      message.success('Xóa người dùng thành công');
      fetchUsers();
    } catch (error) {
      message.error('Lỗi khi xóa người dùng.');
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone_number.includes(searchTerm)
  );

  const handleExport = async () => {
    try {
      const usersData = await getUsers();
      const blob = new Blob([JSON.stringify(usersData)], { type: 'application/json' });
      FileSaver.saveAs(blob, 'users.json');
      message.success('Xuất dữ liệu người dùng thành công');
    } catch (error) {
      message.error('Lỗi khi xuất dữ liệu người dùng.');
    }
  };

  const handleImport = async (info) => {
    const file = info.file.originFileObj;
    try {
      const formData = new FormData();
      formData.append('file', file);
      await importUsers(formData);
      message.success('Nhập dữ liệu người dùng thành công');
      fetchUsers();
    } catch (error) {
      message.error('Lỗi khi nhập dữ liệu người dùng.');
    }
  };

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => navigate(`/users/edit/${record.id}`)}>
            Sửa
          </Button>
          <Button type="link" danger onClick={() => handleDeleteUser(record.id)}>
            Xóa
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Input
        placeholder="Tìm kiếm người dùng"
        prefix={<SearchOutlined />}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: '300px', marginBottom: '16px' }}
      />
      <Button type="primary" onClick={() => navigate('/users/add')} style={{ marginBottom: '16px', marginLeft: '16px' }}>
        Thêm người dùng
      </Button>
      <Button onClick={handleExport} style={{ marginBottom: '16px', marginLeft: '16px' }}>
        Xuất người dùng
      </Button>
      <Upload
        customRequest={handleImport}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />} style={{ marginBottom: '16px', marginLeft: '16px' }}>
          Nhập người dùng
        </Button>
      </Upload>
      <Table columns={columns} dataSource={filteredUsers} rowKey="id" />
    </div>
  );
};

export default UserList;
