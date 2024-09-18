import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { createAttribute, fetchAttributes } from '../../../api/attributes';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons'; // Import the icon

const AddAttribute = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            // Fetch existing attributes to check for duplicates
            const response = await fetchAttributes();
            const attributes = response.data;

            // Check for duplicate values
            const newValues = values.values.split(',').map(value => value.trim());
            const uniqueValues = [...new Set(newValues)]; // Filter unique values

            if (newValues.length !== uniqueValues.length) {
                form.setFields([
                    {
                        name: 'values',
                        errors: ['Có giá trị trùng lặp, vui lòng nhập giá trị khác!'],
                    },
                ]);
                setLoading(false);
                return; // Stop if there are duplicate values
            }

            // Check if attribute with the same name already exists
            const duplicateName = attributes.some(attr => attr.name === values.name);
            if (duplicateName) {
                form.setFields([
                    {
                        name: 'name',
                        errors: ['Tên thuộc tính đã tồn tại, vui lòng nhập tên khác!'],
                    },
                ]);
                setLoading(false);
                return; // Stop if the name is duplicated
            }

            // Prepare formatted values
            const formattedValues = {
                name: values.name,
                values: uniqueValues.map(value => ({ value }))
            };

            await createAttribute(formattedValues);
            navigate('/admin/attributes'); // Navigate to attributes list page on success
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
