import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight, FaStar, FaRegStar, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import './Home.css';

// Mock data for carousel slides
const carouselSlides = [
    {
        id: 1,
        imageUrl: "https://www.gigahertz.com.ph/cdn/shop/files/GH_Web_Top_Banner_2400_x_880_px_iPhone_15_series_2400x880.webp",
        altText: "iPhone 15 series",
        title: "THE NEWEST IPHONE 15 SERIES",
        subtitle: "Experience the revolutionary features of the latest iPhone",
        buttonText: "SHOP NOW"
    },
    {
        id: 2,
        imageUrl: "https://www.gigahertz.com.ph/cdn/shop/files/AW9_Banner_2400x880_2400x880.webp",
        altText: "Apple Watch Series 9",
        title: "APPLE WATCH SERIES 9",
        subtitle: "Smarter. Brighter. Mightier.",
        buttonText: "SHOP NOW"
    },
    {
        id: 3,
        imageUrl: "https://www.gigahertz.com.ph/cdn/shop/files/GH_Web_Banner-Mac_2400x880px_2400x880.webp",
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
        name: "iPhone",
        imageUrl: "https://www.gigahertz.com.ph/cdn/shop/products/iPhone_15_Pro_Natural_Titanium_PDP_Image_Position-1__WWEN_600x.jpg",
        url: "/collections/iphone"
    },
    {
        id: 2,
        name: "iPad",
        imageUrl: "https://www.gigahertz.com.ph/cdn/shop/products/iPad_Pro_13_inch_Wi-Fi_Space_Black_Front_Screen__WWEN_medium.jpg",
        url: "/collections/ipad"
    },
    {
        id: 3,
        name: "Mac",
        imageUrl: "https://www.gigahertz.com.ph/cdn/shop/products/mbp-spacegray-gallery1-202206_GEO_US_medium.jpg",
        url: "/collections/mac"
    },
    {
        id: 4,
        name: "Watch",
        imageUrl: "https://www.gigahertz.com.ph/cdn/shop/products/MQER3ref_VW_34FR_watch-49-titanium-ultra2_VW_34FR_WF_CO_GEO_US_medium.jpg",
        url: "/collections/apple-watch"
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
        isNew: true
    },
    {
        id: 2,
        name: "MacBook Pro 14-inch with M2 Pro Chip",
        price: 116990,
        originalPrice: 119990,
        imageUrl: "https://www.gigahertz.com.ph/cdn/shop/products/mbp-spacegray-gallery1-202206_GEO_US_medium.jpg",
        rating: 4,
        isNew: true
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
        isNew: true
    }
];

// Mock data for promotion banners
const promotionBanners = [
    {
        id: 1,
        imageUrl: "https://www.gigahertz.com.ph/cdn/shop/files/GH_Web_Banner_1200x628_px_1200x628.webp",
        altText: "30% off on all accessories",
        url: "/collections/accessories"
    },
    {
        id: 2,
        imageUrl: "https://www.gigahertz.com.ph/cdn/shop/files/GH_Web_Banner-ITS_1200x628_px_1200x628.webp",
        altText: "iPhone trade-in special offers",
        url: "/pages/trade-in"
    }
];

// Mock data for services div
const services = [
    {
        id: 1,
        title: "REPAIR & SERVICE",
        imageUrl: "https://www.gigahertz.com.ph/cdn/shop/files/GH_Web_Free_Assessment_500x500px_500x500.webp",
        description: "Professional Apple device repair and maintenance",
        url: "/pages/repair-and-service"
    },
    {
        id: 2,
        title: "TRADE-IN",
        imageUrl: "https://www.gigahertz.com.ph/cdn/shop/files/GH_Web_Trade_In_500x500px_500x500.webp",
        description: "Trade your old device for a new one",
        url: "/pages/trade-in"
    }
];

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

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
            stars.push(<FaStar key={`full-${i}`} className="star filled" />);
        }

        if (hasHalfStar) {
            stars.push(<FaStar key="half" className="star half-filled" />);
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="star" />);
        }

        return <div className="product-rating">{stars}</div>;
    };

    return (
        <section className={`homepage ${isLoaded ? 'loaded' : ''}`}>
            {/* Hero Carousel */}
            <div className="hero-carousel">
                <div className="carousel-container">
                    <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {carouselSlides.map((slide) => (
                            <div key={slide.id} className="carousel-slide">
                                <img src={slide.imageUrl} alt={slide.altText} className="carousel-image" />
                                <div className="carousel-content container">
                                    <div className="carousel-text">
                                        <h1>{slide.title}</h1>
                                        <p>{slide.subtitle}</p>
                                        <a href="#" className="btn btn-primary">{slide.buttonText}</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control carousel-prev" onClick={goToPreviousSlide}>
                        <FaAngleLeft />
                    </button>
                    <button className="carousel-control carousel-next" onClick={goToNextSlide}>
                        <FaAngleRight />
                    </button>
                    <div className="carousel-indicators">
                        {carouselSlides.map((_, index) => (
                            <button
                                key={index}
                                className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Categories */}
            <div className="featured-categories">
                <div className="container">
                    <h2 className="div-title">SHOP BY CATEGORY</h2>
                    <div className="row">
                        {featuredCategories.map(category => (
                            <div key={category.id} className="col-6 col-md-3">
                                <a href={category.url} className="category-card">
                                    <div className="category-image-container">
                                        <img src={category.imageUrl} alt={category.name} className="category-image" />
                                    </div>
                                    <h3 className="category-name">{category.name}</h3>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Products */}
            <div className="featured-products">
                <div className="container">
                    <h2 className="div-title">FEATURED PRODUCTS</h2>
                    <div className="row">
                        {featuredProducts.map(product => (
                            <div key={product.id} className="col-6 col-md-3">
                                <div className="product-card">
                                    {product.isNew && <span className="badge-new">New</span>}
                                    <div className="product-image-container">
                                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                                        <div className="product-actions">
                                            <button className="btn-action btn-wishlist">
                                                <FaRegHeart />
                                            </button>
                                            <button className="btn-action btn-cart">
                                                <FaShoppingCart />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="product-details">
                                        <h3 className="product-name">{product.name}</h3>
                                        {renderRating(product.rating)}
                                        <div className="product-price">
                                            <span className="current-price">{formatPrice(product.price)}</span>
                                            {product.price < product.originalPrice && (
                                                <span className="original-price">{formatPrice(product.originalPrice)}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-4">
                        <a href="/collections/all" className="btn btn-outline-primary">VIEW ALL PRODUCTS</a>
                    </div>
                </div>
            </div>

            {/* Promotion Banners */}
            <div className="promo-banners">
                <div className="container">
                    <div className="row">
                        {promotionBanners.map(banner => (
                            <div key={banner.id} className="col-12 col-md-6 mb-4">
                                <a href={banner.url} className="promo-banner">
                                    <img src={banner.imageUrl} alt={banner.altText} className="promo-image" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Services div */}
            <div className="services-div">
                <div className="container">
                    <h2 className="div-title">OUR SERVICES</h2>
                    <div className="row">
                        {services.map(service => (
                            <div key={service.id} className="col-12 col-md-6">
                                <div className="service-card">
                                    <div className="service-image-container">
                                        <img src={service.imageUrl} alt={service.title} className="service-image" />
                                    </div>
                                    <div className="service-details">
                                        <h3 className="service-title">{service.title}</h3>
                                        <p className="service-description">{service.description}</p>
                                        <a href={service.url} className="btn btn-outline-primary">LEARN MORE</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Newsletter div */}
            <div className="newsletter-div">
                <div className="container">
                    <div className="newsletter-container">
                        <div className="row align-items-center">
                            <div className="col-12 col-md-6">
                                <h2 className="newsletter-title">SUBSCRIBE TO OUR NEWSLETTER</h2>
                                <p className="newsletter-text">Get the latest updates on new products and upcoming sales</p>
                            </div>
                            <div className="col-12 col-md-6">
                                <form className="newsletter-form">
                                    <div className="input-group">
                                        <input type="email" className="form-control" placeholder="Your email address" required />
                                        <button className="btn btn-primary" type="submit">SUBSCRIBE</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-6 col-md-3">
                            <div className="trust-badge">
                                <i className="badge-icon fa fa-truck"></i>
                                <h4>FREE SHIPPING</h4>
                                <p>On orders over ₱5,000</p>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="trust-badge">
                                <i className="badge-icon fa fa-shield"></i>
                                <h4>SECURE PAYMENT</h4>
                                <p>100% secure payment</p>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="trust-badge">
                                <i className="badge-icon fa fa-headset"></i>
                                <h4>24/7 SUPPORT</h4>
                                <p>Dedicated support</p>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="trust-badge">
                                <i className="badge-icon fa fa-exchange"></i>
                                <h4>14-DAY RETURNS</h4>
                                <p>Money back guarantee</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomePage;