import React from 'react';
import { Form, Input, Button, notification, Row, Col} from 'antd';
import axios from 'axios';

const CreateProduct = ({ onProductCreated }) => {
    const [form] = Form.useForm();

    const handleFinish = async (values) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/products/', values);
            onProductCreated(response.data);
            notification.success({ message: 'Product created successfully!' });
            form.resetFields();  // Clear the form fields after successful creation
        } catch (error) {
            console.error('Error creating product:', error);
            notification.error({ message: 'Error creating product!' });
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{
                name: '',
                description: '',
                price: 0,
                stock: 0,
            }}
        >
            <Row>
                <Col span={24}>
                    <Form.Item
                        name="name"
                        label="Product Name"
                        rules={[{ required: true, message: 'Please enter the product name!' }]}
                    >
                        <Input placeholder="Product Name" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter the description!' }]}
                    >
                        <Input placeholder="Description" />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please enter the price!' }]}
                    >
                        <Input type="number" placeholder="Price" />
                    </Form.Item>
                    <Form.Item
                        name="stock"
                        label="Stock"
                        rules={[{ required: true, message: 'Please enter the stock!' }]}
                    >
                        <Input type="number" placeholder="Stock" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col offset={10}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Create Product
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default CreateProduct;
