import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CategoryPage = ({ title, categoryId }) => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://localhost:44373/api/products/category/${categoryId}`);
                const result = await response.json();

                if (result.success) {
                    setProducts(result.data.products);
                    setCategory(result.data.category);
                } else {
                    setError(result.message || 'Failed to load products');
                }
            } catch (err) {
                setError('Error connecting to the server');
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        if (categoryId) {
            fetchProducts();
        }
    }, [categoryId]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Error!</h4>
                <p>{error}</p>
            </div>
        );
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    return (
        <section>
            <h1 className="mb-4">{title}</h1>
            {category && category.description && (
                <div className="mb-4">
                    <p className="lead">{category.description}</p>
                </div>
            )}

            {products.length === 0 ? (
                <div className="alert alert-info">No products found in this category.</div>
            ) : (
                <div className="row">
                        {products.map(product => (
                            <div key={product.productId} className="col-md-4 mb-4">
                                <div className="card h-100">
                                    {product.imageUrl ? (
                                        <img
                                            src={product.imageUrl}
                                            className="card-img-top"
                                            alt={product.name}
                                            style={{ height: '200px', objectFit: 'contain', padding: '1rem' }}
                                        />
                                    ) : (
                                        <div
                                            className="bg-light d-flex align-items-center justify-content-center"
                                            style={{ height: '200px' }}
                                        >
                                            <span className="text-muted">No image available</span>
                                        </div>
                                    )}
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{product.name}</h5>
                                        {product.shortDescription && (
                                            <p className="card-text mb-3">{product.shortDescription}</p>
                                        )}
                                        <div className="mt-auto">
                                            {product.price > 0 ? (
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className="fs-5 fw-bold">{formatPrice(product.price)}</span>
                                                    {product.isInStock ? (
                                                        <span className="badge bg-success">In Stock</span>
                                                    ) : (
                                                        <span className="badge bg-danger">Out of Stock</span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-muted">Price not available</span>
                                            )}
                                            <div className="d-grid gap-2 mt-3">
                                                <button
                                                    className="btn btn-primary"
                                                    disabled={!product.isInStock}
                                                    onClick={() => alert(`Added ${product.name} to cart`)}
                                                >
                                                    Add to Cart
                                                </button>
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => alert(`Viewing details for ${product.name}`)}
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
            )}
        </section>
    );
};

CategoryPage.propTypes = {
    title: PropTypes.string.isRequired,
    categoryId: PropTypes.number.isRequired
};

export default CategoryPage;