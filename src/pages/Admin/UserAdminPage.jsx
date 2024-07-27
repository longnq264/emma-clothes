// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form, Input, DatePicker, Select, message, Upload } from 'antd';
// import { getUsers, addUser, updateUser, deleteUser, importUsers } from '../../api/api-server';
// import moment from 'moment';
// import { SearchOutlined, UploadOutlined } from '@ant-design/icons';
// import FileSaver from 'file-saver';

// const { Option } = Select;

// const UserAdminPage = () => {
//   const [users, setUsers] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [form] = Form.useForm();
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const usersData = await getUsers();
//       setUsers(usersData);
//     } catch (error) {
//       console.error('Lỗi khi lấy dữ liệu người dùng:', error);
//       message.error('Lỗi khi lấy dữ liệu người dùng.');
//     }
//   };

//   const handleAddUser = () => {
//     form.resetFields();
//     setIsEditMode(false);
//     setIsModalVisible(true);
//   };

//   const handleEditUser = (record) => {
//     form.setFieldsValue({
//       ...record,
//       date_of_birth: moment(record.date_of_birth),
//     });
//     setSelectedUser(record);
//     setIsEditMode(true);
//     setIsModalVisible(true);
//   };

//   const handleDeleteUser = async (userId) => {
//     try {
//       await deleteUser(userId);
//       message.success('Xóa người dùng thành công');
//       fetchUsers();
//     } catch (error) {
//       console.error('Lỗi khi xóa người dùng:', error);
//       message.error('Lỗi khi xóa người dùng.');
//     }
//   };

//   const handleFormSubmit = async (values) => {
//     try {
//       if (isEditMode) {
//         await updateUser(selectedUser.id, values);
//         message.success('Cập nhật người dùng thành công');
//       } else {
//         await addUser(values);
//         message.success('Thêm người dùng thành công');
//       }
//       setIsModalVisible(false);
//       fetchUsers();
//     } catch (error) {
//       console.error('Lỗi khi gửi biểu mẫu:', error);
//       message.error('Lỗi khi gửi biểu mẫu.');
//     }
//   };

//   const handleSearch = (value) => {
//     setSearchTerm(value);
//   };

//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.phone_number.includes(searchTerm)
//   );

//   const handleExport = async () => {
//     try {
//       const usersData = await getUsers();  // Fetch users data
//       const blob = new Blob([JSON.stringify(usersData)], { type: 'application/json' });
//       FileSaver.saveAs(blob, 'users.json');
//       message.success('Xuất dữ liệu người dùng thành công');
//     } catch (error) {
//       console.error('Lỗi khi xuất dữ liệu người dùng:', error);
//       message.error('Lỗi khi xuất dữ liệu người dùng.');
//     }
//   };

//   const handleImport = async (info) => {
//     const file = info.file.originFileObj;
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       await importUsers(formData);
//       message.success('Nhập dữ liệu người dùng thành công');
//       fetchUsers();
//     } catch (error) {
//       console.error('Lỗi khi nhập dữ liệu người dùng:', error);
//       message.error('Lỗi khi nhập dữ liệu người dùng.');
//     }
//   };

//   const columns = [
//     {
//       title: 'Tên',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Email',
//       dataIndex: 'email',
//       key: 'email',
//     },
//     {
//       title: 'Vai trò',
//       dataIndex: 'role',
//       key: 'role',
//     },
//     {
//       title: 'Ngày sinh',
//       dataIndex: 'date_of_birth',
//       key: 'date_of_birth',
//       render: (text) => moment(text).format('YYYY-MM-DD'),
//     },
//     {
//       title: 'Địa chỉ',
//       dataIndex: 'address',
//       key: 'address',
//     },
//     {
//       title: 'Số điện thoại',
//       dataIndex: 'phone_number',
//       key: 'phone_number',
//     },
//     {
//       title: 'Hành động',
//       key: 'actions',
//       render: (text, record) => (
//         <span>
//           <Button type="link" onClick={() => handleEditUser(record)}>
//             Sửa
//           </Button>
//           <Button type="link" danger onClick={() => handleDeleteUser(record.id)}>
//             Xóa
//           </Button>
//         </span>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Input
//         placeholder="Tìm kiếm người dùng"
//         prefix={<SearchOutlined />}
//         onChange={(e) => handleSearch(e.target.value)}
//         style={{ width: '300px', marginBottom: '16px' }}
//       />
//       <Button type="primary" onClick={handleAddUser} style={{ marginBottom: '16px', marginLeft: '16px' }}>
//         Thêm người dùng
//       </Button>
//       <Button onClick={handleExport} style={{ marginBottom: '16px', marginLeft: '16px' }}>
//         Xuất người dùng
//       </Button>
//       <Upload
//         customRequest={handleImport}
//         showUploadList={false}
//       >
//         <Button icon={<UploadOutlined />} style={{ marginBottom: '16px', marginLeft: '16px' }}>
//           Nhập người dùng
//         </Button>
//       </Upload>
//       <Table columns={columns} dataSource={filteredUsers} rowKey="id" />
//       <Modal
//         title={isEditMode ? 'Sửa người dùng' : 'Thêm người dùng'}
//         visible={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={null}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleFormSubmit}
//         >
//           <Form.Item
//             name="name"
//             label="Tên"
//             rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="email"
//             label="Email"
//             rules={[{ required: true, message: 'Vui lòng nhập email người dùng' }]}
//           >
//             <Input type="email" />
//           </Form.Item>
//           <Form.Item
//             name="role"
//             label="Vai trò"
//             rules={[{ required: true, message: 'Vui lòng chọn vai trò của người dùng' }]}
//           >
//             <Select>
//               <Option value="admin">Quản trị viên</Option>
//               <Option value="user">Người dùng</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item
//             name="date_of_birth"
//             label="Ngày sinh"
//             rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
//           >
//             <DatePicker format="YYYY-MM-DD" />
//           </Form.Item>
//           <Form.Item
//             name="address"
//             label="Địa chỉ"
//             rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="phone_number"
//             label="Số điện thoại"
//             rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               {isEditMode ? 'Cập nhật' : 'Thêm'}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default UserAdminPage;
