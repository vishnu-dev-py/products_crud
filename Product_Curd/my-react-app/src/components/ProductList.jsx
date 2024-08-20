import React, { useEffect } from 'react';
import { Table, Button, notification } from 'antd';
import axios from 'axios';

const ProductList = ({ onEditProduct, products, onProductsFetched }) => {

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/products/');
            onProductsFetched(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/products/${productId}/`);
            onProductsFetched(products.filter(product => product.id !== productId));
            notification.success({ message: 'Product deleted successfully!' });
        } catch (error) {
            console.error('Error deleting product:', error);
            notification.error({ message: 'Error deleting product!' });
        }
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Stock', dataIndex: 'stock', key: 'stock' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button onClick={() => onEditProduct(record.id)} style={{ marginRight: 8 }}>Edit</Button>
                    <Button onClick={() => handleDelete(record.id)} danger>Delete</Button>
                </>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={products}
            rowKey="id"
            pagination={false}
        />
    );
};

export default ProductList;
