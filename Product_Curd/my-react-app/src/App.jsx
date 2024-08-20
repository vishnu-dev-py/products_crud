import React, { useState } from 'react';
import CreateProduct from './components/CreateProduct';
import UpdateProduct from './components/UpdateProduct';
import ProductList from './components/ProductList';
import { Button, Row, Col} from 'antd';

function App() {
    const [editingProductId, setEditingProductId] = useState(null);
    const [products, setProducts] = useState([]);

    const handleProductCreated = (newProduct) => {
        setProducts([...products, newProduct]);
    };

    const handleProductUpdated = (updatedProduct) => {
        setProducts(products.map(product =>
            product.id === updatedProduct.id ? updatedProduct : product
        ));
        setEditingProductId(null);  // Hide the update form after successful update
    };

    const handleProductsFetched = (fetchedProducts) => {
        setProducts(fetchedProducts);
    };

    const handleEditProduct = (productId) => {
        setEditingProductId(productId);
    };

    const handleCancelEdit = () => {
        setEditingProductId(null); // Show the create form again
    };

    return (
        <div>
            <Row gutter={60}>
                <Col span={6}>
                    {editingProductId ? (
                        <>
                            <UpdateProduct
                                productId={editingProductId}
                                onProductUpdated={handleProductUpdated}
                                onCancelEdit={handleCancelEdit}
                            />
                        </>

                    ) : (

                        <CreateProduct onProductCreated={handleProductCreated} />

                    )}
                </Col>


                <Col span={12} >
                    <ProductList
                        products={products}
                        onProductsFetched={handleProductsFetched}
                        onEditProduct={handleEditProduct}
                    />
                </Col>
            </Row>

        </div>
    );
}

export default App;
