import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useSearchParams } from 'react-router-dom';

const CategoryPage = ({ title, categoryId }) => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [availability, setAvailability] = useState('all');
    const [expandedFilters, setExpandedFilters] = useState({
        availability: true,
        price: false,
        brand: false,
        processor: false,
        graphics: false,
        memory: false,
        storage: false,
        panelSize: false
    });
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("query");

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                var response;
                if (searchTerm) response = await fetch(`https://localhost:44373/api/products/search?query=${encodeURIComponent(searchTerm)}`);
                else response = await fetch(`https://localhost:44373/api/products/category/${categoryId}`);
                const result = await response.json();

                if (result.success) {
                    if (searchTerm) {
                        // Handle /search API response
                        setProducts(result.data); // `data` is an array of products
                        setCategory(null); // No category data in /search response
                    } else {
                    // Handle /category API response
                        setProducts(result.data.products);
                        setCategory(result.data.category);

                        // Extract unique brands from products
                        if (result.data.products && result.data.products.length > 0) {
                            const uniqueBrands = [...new Set(result.data.products.map(product => product.brand))];
                            setBrands(uniqueBrands);
                        }
                    }
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

        if (categoryId || searchTerm) {
            fetchProducts();
        }
    }, [categoryId]);

    const handleBrandFilter = (brand) => {
        setSelectedBrands(prev => {
            if (prev.includes(brand)) {
                return prev.filter(b => b !== brand);
            } else {
                return [...prev, brand];
            }
        });
    };

    const handleAvailabilityChange = (status) => {
        setAvailability(status);
    };

    const handlePriceChange = (type, value) => {
        setPriceRange(prev => ({
            ...prev,
            [type]: value
        }));
    };

    const filteredProducts = products.filter(product => {
        // Filter by availability
        if (availability === 'inStock' && product.stocks <= 0) return false;
        if (availability === 'outOfStock' && product.stocks > 0) return false;

        // Filter by brand
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;

        // Filter by price
        if (product.price < priceRange.min || product.price > priceRange.max) return false;

        return true;
    });

    if (loading) {
        return (
            <div className="d-flex justify-content-center my-5">
                <div className="spinner-border text-blue" role="status">
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
            currency: 'PHP',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price);
    };

    const formatPriceWithoutSymbol = (price) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price);
    };


    // Add this function to handle toggling of filters
    const toggleFilter = (filterName) => {
        setExpandedFilters(prev => ({
            ...prev,
            [filterName]: !prev[filterName]
        }));
    };

    return (
        <div className="container-fluid">
            <div className="row my-3">
                {/* Breadcrumb */}
                <div className="col-12">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{title ? title : "Search"}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="row">
                {/* Left sidebar filters */}
                <div className="col-md-3 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-body p-4 text-blue">
                            <h5 className="fw-bold mb-4 ">Filters</h5>

                            {/* Active Filters Section */}
                            {(availability !== 'all' || selectedBrands.length > 0 || priceRange.min > 0 || priceRange.max < 100000) && (
                                <div className="mb-4 pb-3 border-bottom">
                                    {availability === 'inStock' && (
                                        <div className="d-flex align-items-center mb-2">
                                            <span className="badge bg-lightblue text-white d-flex align-items-center py-2">
                                                <i className="bi bi-x me-1" style={{ cursor: 'pointer' }} onClick={() => handleAvailabilityChange('all')}></i>
                                                In stock
                                            </span>
                                        </div>
                                    )}

                                    {availability === 'outOfStock' && (
                                        <div className="d-flex align-items-center mb-2">
                                            <span className="badge bg-lightblue text-white d-flex align-items-center py-2">
                                                <i className="bi bi-x me-1" style={{ cursor: 'pointer' }} onClick={() => handleAvailabilityChange('all')}></i>
                                                Out of stock
                                            </span>
                                        </div>
                                    )}

                                    {selectedBrands.map(brand => (
                                        <div key={`selected-${brand}`} className="d-flex align-items-center mb-2">
                                            <span className="badge bg-lightblue text-white d-flex align-items-center py-2">
                                                <i className="bi bi-x me-1" style={{ cursor: 'pointer' }} onClick={() => handleBrandFilter(brand)}></i>
                                                {brand}
                                            </span>
                                        </div>
                                    ))}

                                    {(priceRange.min > 0 || priceRange.max < 100000) && (
                                        <div className="d-flex align-items-center mb-2">
                                            <span className="badge bg-lightblue text-white d-flex align-items-center py-2">
                                                <i className="bi bi-x me-1" style={{ cursor: 'pointer' }} onClick={() => setPriceRange({ min: 0, max: 100000 })}></i>
                                                PHP{formatPriceWithoutSymbol(priceRange.min)} - PHP{formatPriceWithoutSymbol(priceRange.max)}
                                            </span>
                                        </div>
                                    )}

                                    <button
                                        className="btn btn-md btn-outline-secondary w-100 mt-2"
                                        onClick={() => {
                                            setAvailability('all');
                                            setSelectedBrands([]);
                                            setPriceRange({ min: 0, max: 100000 });
                                        }}
                                    >
                                        Clear all
                                    </button>
                                </div>
                            )}

                            {/* Availability Filter */}
                            <div className="mb-4">
                                <h6
                                    className="d-flex align-items-center justify-content-between cursor-pointer"
                                    onClick={() => toggleFilter('availability')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Availability
                                    <i className={`bi bi-chevron-${expandedFilters.availability ? 'up' : 'down'} small`}></i>
                                </h6>
                                {expandedFilters.availability && (
                                    <div className="mt-2 text-dark">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="inStock"
                                                checked={availability === 'inStock'}
                                                onChange={() => handleAvailabilityChange('inStock')}
                                            />
                                            <label className="form-check-label" htmlFor="inStock">
                                                In stock ({products.filter(p => p.stocks > 0).length})
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="outOfStock"
                                                checked={availability === 'outOfStock'}
                                                onChange={() => handleAvailabilityChange('outOfStock')}
                                            />
                                            <label className="form-check-label" htmlFor="outOfStock">
                                                Out of stock ({products.filter(p => p.stocks <= 0).length})
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Price Filter */}
                            <div className="mb-4">
                                <h6
                                    className="d-flex align-items-center justify-content-between"
                                    onClick={() => toggleFilter('price')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Price
                                    <i className={`bi bi-chevron-${expandedFilters.price ? 'up' : 'down'} small`}></i>
                                </h6>
                                {expandedFilters.price && (
                                    <div className="mt-3 text-dark">
                                        <input
                                            type="range"
                                            className="form-range mb-2"
                                            min="0"
                                            max="100000"
                                            step="1000"
                                            value={priceRange.max}
                                            onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                                        />
                                        <div className="d-flex justify-content-between">
                                            <div className="input-group input-group-sm">
                                                <span className="input-group-text">₱</span>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={priceRange.min}
                                                    onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                                                />
                                            </div>
                                            <span className="mx-2">-</span>
                                            <div className="input-group input-group-sm">
                                                <span className="input-group-text">₱</span>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={priceRange.max}
                                                    onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Brand Filter */}
                            <div className="mb-4">
                                <h6
                                    className="d-flex align-items-center justify-content-between"
                                    onClick={() => toggleFilter('brand')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Brand
                                    <i className={`bi bi-chevron-${expandedFilters.brand ? 'up' : 'down'} small`}></i>
                                </h6>
                                {expandedFilters.brand && (
                                    <div className="mt-2 text-dark">
                                        {brands.map((brand) => {
                                            const countByBrand = products.filter(p => p.brand === brand).length;
                                            return (
                                                <div className="form-check" key={brand}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`brand-${brand}`}
                                                        checked={selectedBrands.includes(brand)}
                                                        onChange={() => handleBrandFilter(brand)}
                                                    />
                                                    <label className="form-check-label" htmlFor={`brand-${brand}`}>
                                                        {brand} ({countByBrand})
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Processor Filter */}
                            <div className="mb-4">
                                <h6
                                    className="d-flex align-items-center justify-content-between"
                                    onClick={() => toggleFilter('processor')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Processor
                                    <i className={`bi bi-chevron-${expandedFilters.processor ? 'up' : 'down'} small`}></i>
                                </h6>
                                {expandedFilters.processor && (
                                    <div className="mt-2 text-dark">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="intel-i3" />
                                            <label className="form-check-label" htmlFor="intel-i3">
                                                Intel Core i3
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="intel-i5" />
                                            <label className="form-check-label" htmlFor="intel-i5">
                                                Intel Core i5
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="intel-i7" />
                                            <label className="form-check-label" htmlFor="intel-i7">
                                                Intel Core i7
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="intel-i9" />
                                            <label className="form-check-label" htmlFor="intel-i9">
                                                Intel Core i9
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="amd-ryzen" />
                                            <label className="form-check-label" htmlFor="amd-ryzen">
                                                AMD Ryzen
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Graphics Filter */}
                            <div className="mb-4">
                                <h6
                                    className="d-flex align-items-center justify-content-between"
                                    onClick={() => toggleFilter('graphics')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Graphics
                                    <i className={`bi bi-chevron-${expandedFilters.graphics ? 'up' : 'down'} small`}></i>
                                </h6>
                                {expandedFilters.graphics && (
                                    <div className="mt-2 text-dark">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="nvidia-rtx" />
                                            <label className="form-check-label" htmlFor="nvidia-rtx">
                                                NVIDIA RTX
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="nvidia-gtx" />
                                            <label className="form-check-label" htmlFor="nvidia-gtx">
                                                NVIDIA GTX
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="amd-radeon" />
                                            <label className="form-check-label" htmlFor="amd-radeon">
                                                AMD Radeon
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="intel-iris" />
                                            <label className="form-check-label" htmlFor="intel-iris">
                                                Intel Iris
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="integrated" />
                                            <label className="form-check-label" htmlFor="integrated">
                                                Integrated
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Memory Filter */}
                            <div className="mb-4">
                                <h6
                                    className="d-flex align-items-center justify-content-between"
                                    onClick={() => toggleFilter('memory')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Memory
                                    <i className={`bi bi-chevron-${expandedFilters.memory ? 'up' : 'down'} small`}></i>
                                </h6>
                                {expandedFilters.memory && (
                                    <div className="mt-2 text-dark">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="4gb" />
                                            <label className="form-check-label" htmlFor="4gb">
                                                4GB
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="8gb" />
                                            <label className="form-check-label" htmlFor="8gb">
                                                8GB
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="16gb" />
                                            <label className="form-check-label" htmlFor="16gb">
                                                16GB
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="32gb" />
                                            <label className="form-check-label" htmlFor="32gb">
                                                32GB
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="64gb" />
                                            <label className="form-check-label" htmlFor="64gb">
                                                64GB+
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Storage Filter */}
                            <div className="mb-4">
                                <h6
                                    className="d-flex align-items-center justify-content-between"
                                    onClick={() => toggleFilter('storage')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Storage
                                    <i className={`bi bi-chevron-${expandedFilters.storage ? 'up' : 'down'} small`}></i>
                                </h6>
                                {expandedFilters.storage && (
                                    <div className="mt-2 text-dark">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="256gb" />
                                            <label className="form-check-label" htmlFor="256gb">
                                                256GB SSD
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="512gb" />
                                            <label className="form-check-label" htmlFor="512gb">
                                                512GB SSD
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="1tb" />
                                            <label className="form-check-label" htmlFor="1tb">
                                                1TB SSD
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="2tb" />
                                            <label className="form-check-label" htmlFor="2tb">
                                                2TB+ SSD
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="hdd" />
                                            <label className="form-check-label" htmlFor="hdd">
                                                HDD Storage
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Panel Size Filter */}
                            <div className="mb-4">
                                <h6
                                    className="d-flex align-items-center justify-content-between"
                                    onClick={() => toggleFilter('panelSize')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Panel Size
                                    <i className={`bi bi-chevron-${expandedFilters.panelSize ? 'up' : 'down'} small`}></i>
                                </h6>
                                {expandedFilters.panelSize && (
                                    <div className="mt-2 text-dark">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="13-inch" />
                                            <label className="form-check-label" htmlFor="13-inch">
                                                13" and below
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="14-inch" />
                                            <label className="form-check-label" htmlFor="14-inch">
                                                14"
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="15-inch" />
                                            <label className="form-check-label" htmlFor="15-inch">
                                                15.6"
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="16-inch" />
                                            <label className="form-check-label" htmlFor="16-inch">
                                                16"
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="17-inch" />
                                            <label className="form-check-label" htmlFor="17-inch">
                                                17" and above
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content area */}
                <div className="col-md-9">
                    {/* Banner and title */}
                    <div className="mb-4">
                        {!searchTerm ?
                            <>
                                <div className="rounded overflow-hidden position-relative">
                                    <img
                                        src={`https://dummyimage.com/800x180/0008F1/00BADB&text=${category.name}`}
                                        className="img-fluid w-100"
                                        alt="Laptops Banner"
                                        style={{ height: '200px', objectFit: 'fill' }}
                                    />
                                </div>

                                <div className="mt-4">
                                    <h1 className="fw-bold text-blue">{title}</h1>
                                    {category && category.description && (
                                        <p>{category.description}</p>
                                    )}
                                    <div className="text-blue">
                                        View more
                                    </div>
                                </div>
                            </>
                            :
                            <div className="mt-4">
                                <h1 className="fw-bold text-blue">Products for '{searchTerm}'</h1>
                            </div>
                        }
                    </div>

                    {/* Controls and sorting */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            Showing 1 - {filteredProducts.length} of {products.length} products
                        </div>
                        <div className="d-flex gap-3 align-items-center">
                            <div className="dropdown">
                                <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" id="displayDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    Display: 24 per page
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="displayDropdown">
                                    <li><a className="dropdown-item" href="#">12 per page</a></li>
                                    <li><a className="dropdown-item" href="#">24 per page</a></li>
                                    <li><a className="dropdown-item" href="#">48 per page</a></li>
                                </ul>
                            </div>
                            <div className="dropdown">
                                <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" id="sortDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sort by: Featured
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                                    <li><a className="dropdown-item" href="#">Featured</a></li>
                                    <li><a className="dropdown-item" href="#">Price: Low to High</a></li>
                                    <li><a className="dropdown-item" href="#">Price: High to Low</a></li>
                                    <li><a className="dropdown-item" href="#">Newest</a></li>
                                </ul>
                            </div>
                            <div className="btn-group">
                                <button
                                    type="button"
                                    className={`btn btn-sm btn-outline-secondary ${viewMode === 'grid' ? 'active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <i className="bi bi-grid-3x3-gap-fill"></i>
                                </button>
                                <button
                                    type="button"
                                    className={`btn btn-sm btn-outline-secondary ${viewMode === 'list' ? 'active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                >
                                    <i className="bi bi-list"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Products display */}
                    {filteredProducts.length === 0 ? (
                        <div className="alert alert-info">No products found in this category.</div>
                    ) : (
                            <div className="row g-4">
                                {filteredProducts.map(product => {
                                    // Calculate the discount percentage
                                    const originalPrice = product.originalPrice || (product.price * 1.25); // If originalPrice is not available, simulate one
                                    const discountPercentage = Math.round((1 - (product.price / originalPrice)) * 100);
                                    const savings = originalPrice - product.price;

                                    return (
                                        <div key={product.productId} className="col-md-4 mb-4">
                                            <div className="card h-100 border-0 shadow-sm position-relative">
                                                {/* Discount badge */}
                                                {discountPercentage > 0 && (
                                                    <div className="position-absolute start-0 top-0 bg-danger text-white py-1 px-2 m-2">
                                                        Save PHP{formatPriceWithoutSymbol(savings)}
                                                    </div>
                                                )}

                                                {/* Brand logo */}
                                                <div className="position-absolute end-0 top-0 p-1 m-2">
                                                    <img
                                                        src="https://dummyimage.com/80x30/0008F1/ffffff&text=Gigahertz"
                                                        alt="Gigahertz"
                                                        className="img-fluid"
                                                        style={{ height: '30px', objectFit: 'fill' }}
                                                    />
                                                </div>

                                                {/* Product image */}
                                                <div className="text-center pt-4 pb-2">
                                                    {product.imageUrl && product.imageUrl !== 'na' ? (
                                                        <img
                                                            src={`https://dummyimage.com/500x500/00BADB/ffffff&text=${product.name}`}
                                                            className="img-fluid"
                                                            alt={product.name}
                                                            style={{ height: '200px', objectFit: 'fill' }}
                                                        />
                                                    ) : (
                                                        <div
                                                            className="bg-light d-flex align-items-center justify-content-center"
                                                            style={{ height: '200px' }}
                                                        >
                                                            <span className="text-muted">No image available</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Best seller badge */}
                                                {product.isBestseller && (
                                                    <div className="position-absolute start-0 bottom-0 m-2">
                                                        <div className="rounded-circle bg-warning text-white d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', fontSize: '0.7rem', textAlign: 'center', fontWeight: 'bold' }}>
                                                            BEST SELLER
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Product details */}
                                                <div className="card-body d-flex flex-column">
                                                    <div className="">
                                                        <h6 className="card-title fw-bold text-blue">{product.name}</h6>
                                                    </div>

                                                    {/* Specs summary */}
                                                    <div className="specs-summary small text-secondary my-1">
                                                        {product.description && (
                                                            <div className="mb-2">
                                                                <small>{product.description.substring(0, 100)}...</small>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Price and stock info */}
                                                    <div className="mt-auto">
                                                        <div className="mb-2">
                                                            <h5 className="fw-bold text-danger mb-0">PHP{formatPriceWithoutSymbol(product.price)}</h5>
                                                            {discountPercentage > 0 && (
                                                                <small className="text-decoration-line-through text-muted">PHP{formatPriceWithoutSymbol(originalPrice)}</small>
                                                            )}
                                                        </div>

                                                        {/* Stock status */}
                                                        <div className="d-flex align-items-center mb-3">
                                                            {product.stocks > 0 ? (
                                                                <>
                                                                    <span className="text-success me-2">●</span>
                                                                    <small className="text-success">In stock</small>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span className="text-danger me-2">●</span>
                                                                    <small className="text-danger">Out of stock</small>
                                                                </>
                                                            )}
                                                        </div>

                                                        {/* Add to cart button */}
                                                        <button
                                                            className="btn btn-primary w-100"
                                                            disabled={product.stocks <= 0}
                                                            onClick={() => alert(`Added ${product.name} to cart`)}
                                                        >
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

CategoryPage.propTypes = {
    title: PropTypes.string.isRequired,
    categoryId: PropTypes.number.isRequired
};

export default CategoryPage;