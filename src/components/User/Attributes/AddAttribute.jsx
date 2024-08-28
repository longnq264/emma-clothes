import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { createAttribute } from '../../../api/attributes';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons'; // Import the icon

const AddAttribute = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            // Đảm bảo rằng values có cấu trúc đúng và không thiếu trường
            const formattedValues = {
                name: values.name,
                values: values.values.split(',').map(value => ({ value: value.trim() }))
            };
            await createAttribute(formattedValues);
            navigate('/admin/attributes');  // Điều hướng về trang danh sách thuộc tính sau khi thêm thành công
        } catch (error) {
            console.error('Lỗi khi thêm thuộc tính:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Thêm thuộc tính</h2>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item
                    label="Tên thuộc tính"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên thuộc tính!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Giá trị"
                    name="values"
                    rules={[{ required: true, message: 'Vui lòng nhập giá trị thuộc tính!' }]}
                >
                    <Input placeholder="Nhập giá trị, cách nhau bởi dấu ','" />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        icon={<PlusOutlined />} // Add the icon here
                    >
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddAttribute;
