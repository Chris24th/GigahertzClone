import React, { useState, useEffect } from 'react';
import {
    FaStar,
    FaRegStar,
    FaTruck,
    FaShieldAlt,
    FaHeadset,
    FaExchangeAlt
} from 'react-icons/fa';

// Mock data for carousel slides
const carouselSlides = [
    {
        id: 1,
        imageUrl: "https://dummyimage.com/2400x880/212529",
        altText: "iPhone 15 series",
        title: "THE NEWEST IPHONE 15 SERIES",
        subtitle: "Experience the revolutionary features of the latest iPhone",
        buttonText: "SHOP NOW"
    },
    {
        id: 2,
        imageUrl: "https://dummyimage.com/2400x880/212529",
        altText: "Apple Watch Series 9",
        title: "APPLE WATCH SERIES 9",
        subtitle: "Smarter. Brighter. Mightier.",
        buttonText: "SHOP NOW"
    },
    {
        id: 3,
        imageUrl: "https://dummyimage.com/2400x880/212529",
        altText: "MacBook Pro with M2 Chip",
        title: "MACBOOK PRO WITH M2 CHIP",
        subtitle: "Power. Unleashed.",
        buttonText: "SHOP NOW"
    }
];

// Mock data for featured categories
const featuredCategories = [
    {
        id: 1,
        name: "Laptops",
        imageUrl: "https://dummyimage.com/500x500/4682b4 ",
        url: "/collections/iphone"
    },
    {
        id: 2,
        name: "Handheld",
        imageUrl: "https://dummyimage.com/500x500/1e90ff ",
        url: "/collections/ipad"
    },
    {
        id: 3,
        name: "Desktops",
        imageUrl: "https://dummyimage.com/500x500/17a2b8 ",
        url: "/collections/mac"
    },
    {
        id: 4,
        name: "Watch",
        imageUrl: "https://dummyimage.com/500x500/6c757d ",
        url: "/collections/apple-watch"
    },
    {
        id: 5,
        name: "Components",
        imageUrl: "https://dummyimage.com/500x500/0056b3 ",
        url: "/collections/airpods"
    },
    {
        id: 6,
        name: "Accessories",
        imageUrl: "https://dummyimage.com/500x500/007bff ",
        url: "/collections/accessories"
    }
];

// Mock data for featured products
const featuredProducts = [
    {
        id: 1,
        name: "iPhone 15 Pro 256GB Natural Titanium",
        price: 78990,
        originalPrice: 79990,
        imageUrl: "https://www.gigahertz.com.ph/cdn/shop/products/iPhone_15_Pro_Natural_Titanium_PDP_Image_Position-1__WWEN_medium.jpg",
        rating: 5,
        isNew: true,
        tag: "Save ₱1,000"
    },
    {
        id: 2,
        name: "MacBook Pro 14-inch with M2 Pro Chip",
        price: 116990,
        originalPrice: 119990,
        imageUrl: "https://www.gigahertz.com.ph/cdn/shop/products/mbp-spacegray-gallery1-202206_GEO_US_medium.jpg",
        rating: 4,
        isNew: true,
        tag: "Save ₱3,000"
    },
    {
        id: 3,
        name: "iPad Pro M2 11-inch Wi-Fi 128GB",
        price: 54990,
        originalPrice: 54990,
        imageUrl: "https://www.gigahertz.com.ph/cdn/shop/products/iPad_Pro_11-inch_Wi-Fi_Space_Gray_PDP_Image_Position-1b__WWEN_medium.jpg",
        rating: 5,
        isNew: false
    },
    {
        id: 4,
        name: "Apple Watch Series 9 GPS 41mm",
        price: 24990,
        originalPrice: 25990,
        imageUrl: "https://www.gigahertz.com.ph/cdn/shop/products/MT6J3ref_VW_34FR_watch-45-alum-midnight-nc-9s_VW_34FR_WF_CO_GEO_US_medium.jpg",
        rating: 4.5,
        isNew: true,
        tag: "Save ₱1,000"
    },
    {
        id: 5,
        name: "AirPods Pro (2nd Generation) with MagSafe Case",
        price: 14990,
        originalPrice: 15990,
        imageUrl: "https://www.gigahertz.com.ph/cdn/shop/products/MME73_AV1_medium.jpg",
        rating: 5,
        isNew: false,
        tag: "Save ₱1,000"
    },
    {
        id: 6,
        name: "iPhone 15 128GB Black",
        price: 56990,
        originalPrice: 57990,
        imageUrl: "https://www.gigahertz.com.ph/cdn/shop/products/iPhone15_Black_PDP_Image_position-1a_WWEN_medium.jpg",
        rating: 4.5,
        isNew: true,
        tag: "Save ₱1,000"
    },
    {
        id: 7,
        name: "Apple Watch Ultra 2 49mm Titanium Case",
        price: 54990,
        originalPrice: 54990,
        imageUrl: "https://www.gigahertz.com.ph/cdn/shop/products/MQER3ref_VW_34FR_watch-49-titanium-ultra2_VW_34FR_WF_CO_GEO_US_medium.jpg",
        rating: 5,
        isNew: true
    },
    {
        id: 8,
        name: "AirPods (3rd Generation) with Lightning Charging Case",
        price: 10990,
        originalPrice: 11990,
        imageUrl: "https://www.gigahertz.com.ph/cdn/shop/products/MME73_AV1_medium.jpg",
        rating: 4,
        isNew: false,
        tag: "Save ₱1,000"
    }
];

// Mock data for promotion banners
const promotionBanners = [
    {
        id: 1,
        imageUrl: "https://dummyimage.com/1200x628/00BADB",
        altText: "30% off on all accessories",
        url: "/collections/accessories"
    },
    {
        id: 2,
        imageUrl: "https://dummyimage.com/1200x628/00BADB",
        altText: "iPhone trade-in special offers",
        url: "/pages/trade-in"
    }
];

// Mock data for services div
const services = [
    {
        id: 1,
        title: "REPAIR & SERVICE",
        imageUrl: "https://dummyimage.com/500x500/00BADB",
        description: "Professional Apple device repair and maintenance",
        url: "/pages/repair-and-service"
    },
    {
        id: 2,
        title: "TRADE-IN",
        imageUrl: "https://dummyimage.com/500x500/00BADB",
        description: "Trade your old device for a new one",
        url: "/pages/trade-in"
    },
    {
        id: 3,
        title: "APPLE SERVICE",
        imageUrl: "https://dummyimage.com/500x500/00BADB",
        description: "Authorized Apple Service Provider",
        url: "/pages/apple-service"
    }
];

// Trust badges data
const trustBadges = [
    {
        id: 1,
        icon: <FaTruck className="fs-2 text-primary mb-3" />,
        title: "FREE SHIPPING",
        description: "On orders over ₱5,000"
    },
    {
        id: 2,
        icon: <FaShieldAlt className="fs-2 text-primary mb-3" />,
        title: "SECURE PAYMENT",
        description: "100% secure payment"
    },
    {
        id: 3,
        icon: <FaHeadset className="fs-2 text-primary mb-3" />,
        title: "24/7 SUPPORT",
        description: "Dedicated support"
    },
    {
        id: 4,
        icon: <FaExchangeAlt className="fs-2 text-primary mb-3" />,
        title: "14-DAY RETURNS",
        description: "Money back guarantee"
    }
];

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [visibleProducts, setVisibleProducts] = useState(3);

    // Simulate loading effect
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 500);
    }, []);

    // Auto carousel functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselSlides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Carousel navigation
    const goToPreviousSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? carouselSlides.length - 1 : prevSlide - 1));
    };

    const goToNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselSlides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Show more products
    const handleViewMore = () => {
        setVisibleProducts(prev =>
            prev + 4 <= featuredProducts.length ? prev + 4 : featuredProducts.length
        );
    };

    // Format price to Philippine Peso
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    // Generate star rating component
    const renderRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} className="text-warning" />);
        }

        if (hasHalfStar) {
            stars.push(<FaStar key="half" className="text-warning" />);
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="text-muted" />);
        }

        return <div className="d-flex gap-1 mb-2">{stars}</div>;
    };

    return (
        <div className={`fade ${isLoaded ? 'show' : ''}`} style={{ transition: 'opacity 0.5s ease' }}>
            {/* Hero Carousel */}
            <div id="heroCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {carouselSlides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
                            style={{ transition: 'transform 0.6s ease' }}
                        >
                            <img
                                src={slide.imageUrl}
                                className="d-block w-100"
                                alt={slide.altText}
                            />
                            <div className="carousel-caption d-none d-md-block text-start" style={{ bottom: 'auto', top: '50%', transform: 'translateY(-50%)' }}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h1 className="fw-bold display-5 text-shadow">{slide.title}</h1>
                                            <p className="lead text-shadow mb-4">{slide.subtitle}</p>
                                            <a href="#" className="btn btn-primary btn-lg fw-semibold px-4 py-2">
                                                {slide.buttonText}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    onClick={goToPreviousSlide}
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    onClick={goToNextSlide}
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                <div className="carousel-indicators">
                    {carouselSlides.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => goToSlide(index)}
                            className={index === currentSlide ? 'active' : ''}
                            aria-current={index === currentSlide ? 'true' : 'false'}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
            </div>

            {/* Featured Categories */}
            <div className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center fw-bold mb-4 position-relative pb-3">
                        SHOP BY CATEGORY
                        <span className="position-absolute start-50 translate-middle-x" style={{ bottom: 0, width: '60px', height: '3px', background: '#007bff' }}></span>
                    </h2>
                    <div className="row g-4">
                        {featuredCategories.map(category => (
                            <div key={category.id} className="col-6 col-md-4 col-lg-2">
                                <a
                                    href={category.url}
                                    className="text-decoration-none text-dark"
                                >
                                    <div className="card border-0 shadow-sm h-100 transition-transform" style={{ transform: 'translateY(0)', transition: 'transform 0.3s' }}>
                                        <div className="card-body text-center p-3">
                                            <div className="mb-3">
                                                <img
                                                    src={category.imageUrl}
                                                    alt={category.name}
                                                    className="img-fluid transition-transform"
                                                    style={{ transition: 'transform 0.5s' }}
                                                />
                                            </div>
                                            <h5 className="fw-semibold">{category.name}</h5>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Products */}
            <div className="py-5">
                <div className="container">
                    <h2 className="text-center fw-bold mb-4 position-relative pb-3">
                        FEATURED PRODUCTS
                        <span className="position-absolute start-50 translate-middle-x" style={{ bottom: 0, width: '60px', height: '3px', background: '#007bff' }}></span>
                    </h2>

                    {featuredProducts.slice(0, visibleProducts).length === 0 ? (
                        <div className="alert alert-info">No featured products available.</div>
                    ) : (
                        <div className="row g-4 mb-4">
                            {featuredProducts.slice(0, visibleProducts).map(product => {
                                // Calculate the discount percentage
                                const originalPrice = product.originalPrice || (product.price * 1.25); // If originalPrice is not available, simulate one
                                const discountPercentage = Math.round((1 - (product.price / originalPrice)) * 100);
                                const savings = originalPrice - product.price;

                                return (
                                    <div key={product.id} className="col-md-4 mb-4">
                                        <div className="card h-100 border-0 shadow-sm position-relative">
                                            {/* Discount badge */}
                                            {product.price < product.originalPrice && (
                                                <div className="position-absolute start-0 top-0 bg-danger text-white py-1 px-2 m-2">
                                                    Save {formatPrice(product.originalPrice - product.price)}
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
                                                {product.imageUrl ? (
                                                    <img
                                                        src={`https://dummyimage.com/500x500/00BADB/ffffff&text=${product.name}`}
                                                        className="img-fluid"
                                                        alt={product.name}
                                                        style={{ height: '200px', objectFit: 'fill' }}
                                                    />
                                                ) : (
                                                    <div
                                                        className="bg-light d-flex align-items-center justify-content-center"
                                                        style={{ height: '180px' }}
                                                    >
                                                        <span className="text-muted">No image available</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Best seller badge */}
                                            {product.isNew && (
                                                <div className="position-absolute start-0 bottom-0 m-2">
                                                    <div className="rounded-circle bg-warning text-white d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', fontSize: '0.7rem', textAlign: 'center', fontWeight: 'bold' }}>
                                                        NEW
                                                    </div>
                                                </div>
                                            )}

                                            {/* Product details */}
                                            <div className="card-body d-flex flex-column">
                                                <div className="mb-2">
                                                    <h6 className="card-title fw-bold text-blue mb-1">{product.name}</h6>
                                                    <p className="text-muted small mb-0">{product.subtitle || ''}</p>
                                                </div>

                                                {/* Rating */}
                                                <div className="specs-summary small text-secondary my-2">
                                                    {renderRating(product.rating)}
                                                </div>

                                                {/* Price and stock info */}
                                                <div className="mt-auto">
                                                    <div className="mb-2">
                                                        <h5 className="fw-bold text-danger mb-0">{formatPrice(product.price)}</h5>
                                                        {product.price < product.originalPrice && (
                                                            <small className="text-decoration-line-through text-muted">{formatPrice(product.originalPrice)}</small>
                                                        )}
                                                    </div>

                                                    {/* Stock status */}
                                                    <div className="d-flex align-items-center mb-3">
                                                        <span className="text-success me-2">●</span>
                                                        <small className="text-success">In stock</small>
                                                    </div>

                                                    {/* Add to cart button */}
                                                    <button
                                                        className="btn btn-primary w-100"
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

                    {visibleProducts < featuredProducts.length && (
                        <div className="text-center mt-4">
                            <button onClick={handleViewMore} className="btn btn-outline-primary px-4 py-2 fw-semibold">
                                VIEW MORE PRODUCTS
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Promotion Banners */}
            <div className="py-5 bg-light">
                <div className="container">
                    <div className="row g-4">
                        {promotionBanners.map(banner => (
                            <div key={banner.id} className="col-12 col-md-6">
                                <a
                                    href={banner.url}
                                    className="d-block rounded overflow-hidden shadow-sm transition-transform"
                                    style={{ transition: 'transform 0.3s' }}
                                >
                                    <img
                                        src={banner.imageUrl}
                                        alt={banner.altText}
                                        className="img-fluid w-100"
                                    />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Services div */}
            <div className="py-5">
                <div className="container">
                    <h2 className="text-center fw-bold mb-4 position-relative pb-3">
                        OUR SERVICES
                        <span className="position-absolute start-50 translate-middle-x" style={{ bottom: 0, width: '60px', height: '3px', background: '#007bff' }}></span>
                    </h2>
                    <div className="row g-4">
                        {services.map(service => (
                            <div key={service.id} className="col-12 col-md-4">
                                <div className="card h-100 border-0 shadow-sm overflow-hidden">
                                    <div className="overflow-hidden">
                                        <img
                                            src={service.imageUrl}
                                            alt={service.title}
                                            className="card-img-top transition-transform"
                                            style={{ transition: 'transform 0.5s' }}
                                        />
                                    </div>
                                    <div className="card-body text-center p-4">
                                        <h3 className="card-title fs-5 fw-bold text-blue mb-2">{service.title}</h3>
                                        <p className="card-text text-muted mb-4">{service.description}</p>
                                        <a href={service.url} className="btn btn-outline-primary px-4 fw-semibold">
                                            LEARN MORE
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Newsletter div */}
            <div className="py-5 bg-blue">
                <div className="container">
                    <div className="row align-items-center text-white">
                        <div className="col-12 col-md-6 mb-4 mb-md-0">
                            <h2 className="fw-bold mb-2">SUBSCRIBE TO OUR NEWSLETTER</h2>
                            <p className="mb-0 opacity-75">Get the latest updates on new products and upcoming sales</p>
                        </div>
                        <div className="col-12 col-md-6">
                            <form className="d-flex">
                                <input
                                    type="email"
                                    className="form-control form-control-lg me-2"
                                    placeholder="Your email address"
                                    required
                                />
                                <button type="submit" className="btn btn-light btn-lg fw-semibold px-4">
                                    SUBSCRIBE
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="py-5 bg-light">
                <div className="container">
                    <div className="row g-4 text-center">
                        {trustBadges.map(badge => (
                            <div key={badge.id} className="col-6 col-md-3">
                                <div className="p-3">
                                    {badge.icon}
                                    <h4 className="fs-6 fw-bold mb-1">{badge.title}</h4>
                                    <p className="small text-muted mb-0">{badge.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Authorized Reseller */}
            <div className="py-5">
                <div className="container">
                    <div className="text-center">
                        <h2 className="fw-bold mb-4 position-relative pb-3">
                            AUTHORIZED APPLE RESELLER
                            <span className="position-absolute start-50 translate-middle-x" style={{ bottom: 0, width: '60px', height: '3px', background: '#007bff' }}></span>
                        </h2>
                        <p className="text-muted mb-4">
                            Gigahertz is an Apple Premium Reseller offering the complete range of Apple products along with premium accessories.
                        </p>
                        <img
                            src="https://www.gigahertz.com.ph/cdn/shop/files/apple-authorised-reseller.png?v=1653367071"
                            alt="Apple Authorized Reseller"
                            className="img-fluid mb-4"
                            style={{ maxHeight: '80px' }}
                        />
                    </div>
                </div>
            </div>

            {/* Custom CSS for hover effects */}
            <style jsx>{`
                .card:hover {
                    transform: translateY(-5px) !important;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
                }
                
                .card:hover .card-img-top,
                .card:hover img.transition-transform {
                    transform: scale(1.05);
                }
                
                .card:hover .opacity-0 {
                    opacity: 1 !important;
                    transform: translateX(0) !important;
                }
                
                .text-shadow {
                    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                }
                
                .btn-light:hover .text-muted {
                    color: #007bff !important;
                }
                
                a.transition-transform:hover {
                    transform: translateY(-5px);
                }
            `}</style>
        </div>
    );
};

export default HomePage;