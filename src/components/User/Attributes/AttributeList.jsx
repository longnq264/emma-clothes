import { Table, Button, Popconfirm } from 'antd';
import { fetchAttributes, deleteAttribute } from '../../../api/attributes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'; // Import the icons

const AttributeList = () => {
    const [attributes, setAttributes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loadAttributes = async () => {
        setLoading(true);
        try {
            const response = await fetchAttributes();
            setAttributes(response.data);
        } catch (error) {
            console.error('Lỗi khi tải thuộc tính:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAttributes();
    }, []);

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await deleteAttribute(id);
            loadAttributes();
        } catch (error) {
            console.error('Lỗi khi xóa thuộc tính:', error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Tên thuộc tính',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá trị',
            key: 'values',
            render: (_, record) => (
                <div>
                    {record.values.map((value) => (
                        <span key={value.id} className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm mr-1 mb-1">
                            {value.value}
                        </span>
                    ))}
                </div>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button
                        type="link"
                        icon={<EditOutlined />} // Add the edit icon
                        onClick={() => navigate(`/admin/attributes/edit/${record.id}`)}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button
                            type="link"
                            danger
                            icon={<DeleteOutlined />} // Add the delete icon
                        >
                            Xóa
                        </Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Danh sách thuộc tính</h2>
            <Button
                type="primary"
                icon={<PlusOutlined />} // Add the add icon
                onClick={() => navigate('/admin/attributes/new')}
                className="mb-4"
            >
                Thêm thuộc tính
            </Button>
            <Table
                columns={columns}
                dataSource={attributes}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
};

export default AttributeList;
