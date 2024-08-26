import { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { updateAttribute, fetchAttributes } from '../../../api/attributes';
import { useParams, useNavigate } from 'react-router-dom';
import { SaveOutlined } from '@ant-design/icons'; // Import the icon

const EditAttribute = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const loadAttribute = async () => {
            try {
                const response = await fetchAttributes();
                const attribute = response.data.find(attr => attr.id === Number(id));
                if (attribute) {
                    form.setFieldsValue({
                        name: attribute.name,
                        values: attribute.values.map(v => v.value).join(', '),
                    });
                }
            } catch (error) {
                console.error('Lỗi khi tải thuộc tính:', error);
            }
        };
        loadAttribute();
    }, [id, form]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const updatedValues = values.values.split(',').map(value => ({ value }));
            await updateAttribute(id, { ...values, values: updatedValues });
            navigate('/admin/attributes');  // Điều hướng về trang danh sách thuộc tính sau khi cập nhật thành công
        } catch (error) {
            console.error('Lỗi khi cập nhật thuộc tính:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Chỉnh sửa thuộc tính</h2>
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
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        icon={<SaveOutlined />} // Add the icon here
                    >
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditAttribute;
