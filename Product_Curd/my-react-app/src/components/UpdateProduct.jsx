import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification, Spin } from 'antd';
import axios from 'axios';

const UpdateProduct = ({ productId, onProductUpdated, onCancelEdit }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (productId) {
            axios.get(`http://127.0.0.1:8000/api/products/${productId}/`)
                .then(response => {
                    form.setFieldsValue(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching product:', error);
                    setLoading(false);
                    notification.error({ message: 'Error fetching product!' });
                });
        }
    }, [productId]);

    const handleFinish = async (values) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/products/${productId}/`, values);
            onProductUpdated(response.data);
            notification.success({ message: 'Product updated successfully!' });
        } catch (error) {
            console.error('Error updating product:', error);
            notification.error({ message: 'Error updating product!' });
        }
    };

    if (loading) return <Spin />;

    return (
        <Form form={form} layout="vertical" onFinish={handleFinish}>
            <h2>Edit Product</h2>
            <Form.Item name="name" label="Product Name" rules={[{ required: true, message: 'Please enter the product name!' }]}>
                <Input placeholder="Product Name" />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the description!' }]}>
                <Input placeholder="Description" />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the price!' }]}>
                <Input type="number" placeholder="Price" />
            </Form.Item>
            <Form.Item name="stock" label="Stock" rules={[{ required: true, message: 'Please enter the stock!' }]}>
                <Input type="number" placeholder="Stock" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Update</Button>
                <Button onClick={onCancelEdit} style={{ marginLeft: 8 }}>Cancel</Button>
            </Form.Item>
        </Form>
    );
};

export default UpdateProduct;
