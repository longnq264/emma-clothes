import { useEffect, useState } from 'react';
import { Table, Select, Button, Popconfirm, message, DatePicker, Input, Space } from 'antd';
import { fetchOrders, updateOrderStatus } from '../../../api/order';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { PrinterOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;

const ListOrder = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [statusFilter] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const ordersData = await fetchOrders();
        setOrders(ordersData);
        setFilteredOrders(ordersData);
      } catch (error) {
        console.error('Không thể lấy dữ liệu đơn hàng:', error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  const applyFilters = () => {
    let filtered = orders;

    if (dateRange && dateRange.length === 2) {
      const [startDate, endDate] = dateRange;
      filtered = filtered.filter((order) => {
        const orderDate = moment(order.created_at);
        return orderDate.isBetween(startDate, endDate, 'days', '[]');
      });
    }

    if (searchText) {
      filtered = filtered.filter(order =>
        order.user_name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (statusFilter !== null) {
      filtered = filtered.filter(order => order.status_id === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
    applyFilters();
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const order = orders.find(order => order.id === orderId);
  
    // Kiểm tra nếu đơn hàng đã bị hủy hoặc đã giao hàng
    if (order.status_id === 5) {
      message.warning('Đơn hàng đã bị hủy, không thể cập nhật trạng thái');
      return;
    }
  
    if (order.status_id === 4) {
      message.warning('Đơn hàng đã giao xong, không thể cập nhật trạng thái');
      return;
    }
  
    try {
      const response = await updateOrderStatus(orderId, newStatus);
      if (response.status) {
        message.success('Trạng thái đơn hàng đã được cập nhật');
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderId ? { ...order, status_id: newStatus } : order
          )
        );
        applyFilters();
      } else {
        message.error('Cập nhật trạng thái thất bại');
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật trạng thái');
    }
  };

  const handlePrintOrder = (orderId) => {
    message.info(`In đơn hàng với mã: ${orderId}`);
  };

  
  const handleCancelOrder = async (orderId) => {
    try {
      const response = await updateOrderStatus(orderId, 5); // 5 is the status for "Cancelled"
      if (response.status) {
        message.success('Đơn hàng đã được hủy');
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderId ? { ...order, status_id: 5 } : order
          )
        );
        applyFilters();
      } else {
        message.error('Hủy đơn hàng thất bại');
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi hủy đơn hàng');
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    applyFilters();
  };

  const handleAmountFilter = (value, record) => {
    const amount = parseFloat(record.total_amount);
    const [min, max] = value.split('-').map(Number);

    if (isNaN(min) && isNaN(max)) return true;
    if (isNaN(min)) return amount <= max;
    if (isNaN(max)) return amount >= min;
    return amount >= min && amount <= max;
  };

  const statusColorMap = {
    1: 'orange',   // Chờ xử lý
    2: 'blue',     // Đã xử lý
    3: 'purple',   // Đã gửi hàng
    4: 'green',    // Đã giao hàng
    5: 'red',      // Đã hủy
  };

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: 'descend',
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'user_name',
      key: 'user_name',
      filterDropdown: () => (
        <Search
          placeholder="Tìm kiếm tên người dùng"
          onSearch={handleSearch}
          style={{ marginBottom: 8, display: 'block' }}
        />
      ),
      onFilter: (value, record) =>
        record.user_name.toLowerCase().includes(searchText.toLowerCase()),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'user_phone',
      key: 'user_phone',
    },
    {
      title: 'Tổng số tiền',
      dataIndex: 'total_amount',
      key: 'total_amount',
      filters: [
        { text: 'Dưới 1,000,000', value: '0-1000000' },
        { text: '1,000,000 - 5,000,000', value: '1000000-5000000' },
        { text: '5,000,000 - 10,000,000', value: '5000000-10000000' },
        { text: 'Trên 10,000,000', value: '10000000-' },
      ],
      onFilter: handleAmountFilter,
      sorter: (a, b) => parseFloat(a.total_amount) - parseFloat(b.total_amount),
      render: (text) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status_id',
      key: 'status_id',
      filters: [
        { text: 'Chờ xử lý', value: 1 },
        { text: 'Đã xử lý', value: 2 },
        { text: 'Đã gửi hàng', value: 3 },
        { text: 'Đã giao hàng', value: 4 },
        { text: 'Đã hủy', value: 5 },
      ],
      onFilter: (value, record) => record.status_id === value,
      render: (text, record) => (
        <Select
          defaultValue={text}
          onChange={(newStatus) => handleStatusChange(record.id, newStatus)}
          style={{ color: statusColorMap[text], backgroundColor: 'white' }}
        >
          <Option value={1} style={{ color: 'orange' }}>Chờ xử lý</Option>
          <Option value={2} style={{ color: 'blue' }}>Đã xử lý</Option>
          <Option value={3} style={{ color: 'purple' }}>Đã gửi hàng</Option>
          <Option value={4} style={{ color: 'green' }}>Đã giao hàng</Option>
          <Option value={5} style={{ color: 'red' }}>Đã hủy</Option>
        </Select>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a, b) => moment(b.created_at).unix() - moment(a.created_at).unix(),
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {/* Only show Print button for orders that are neither shipped nor delivered nor canceled */}
          {record.status_id !== 3 && record.status_id !== 4 && record.status_id !== 5 && (
            <Button
              type="primary"
              icon={<PrinterOutlined />}
              onClick={() => handlePrintOrder(record.id)}
            >
              In đơn
            </Button>
          )}
          <Button
            type="default"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/admin/orders/${record.id}`)}
          >
            Chi tiết
          </Button>
          {/* Only show Cancel button for orders that are not shipped, delivered, or canceled */}
          {record.status_id !== 3 && record.status_id !== 4 && record.status_id !== 5 && (
            <Popconfirm
              title="Bạn có chắc muốn hủy đơn hàng này?"
              onConfirm={() => handleCancelOrder(record.id)}
              okText="Có"
              cancelText="Không"
            >
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
              >
                Hủy
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];
  

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Đơn hàng quản trị viên</h2>
      <div className="flex justify-between mb-4">
        <Search
          placeholder="Tìm kiếm tên người dùng"
          onSearch={handleSearch}
          style={{ width: 300, marginRight: 16 }}
        />
        <RangePicker onChange={handleDateChange} />
        {/* <Select
          placeholder="Chọn trạng thái"
          onChange={(value) => {
            setStatusFilter(value);
            applyFilters();
          }}
          style={{ width: 200 }}
          allowClear
        >
          <Option value={null}>Tất cả</Option>
          <Option value={1} style={{ color: 'orange' }}>Chờ xử lý</Option>
          <Option value={2} style={{ color: 'blue' }}>Đã xử lý</Option>
          <Option value={3} style={{ color: 'purple' }}>Đã gửi hàng</Option>
          <Option value={4} style={{ color: 'green' }}>Đã giao hàng</Option>
          <Option value={5} style={{ color: 'red' }}>Đã hủy</Option>
        </Select> */}
      </div>
      
      <Table
        columns={columns}
        dataSource={filteredOrders}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ListOrder;
