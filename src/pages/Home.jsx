import React, { useState, useEffect, useRef } from 'react';
import {
    FaStar,
    FaRegStar,
    FaTruck,
    FaShieldAlt,
    FaHeadset,
    FaExchangeAlt
} from 'react-icons/fa';
import { ChevronLeft, ChevronRight, Search, ShoppingCart, User, Heart, Menu } from 'lucide-react';
import './Home.css'; // Import your CSS file for custom styles
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [activeHeroSlide, setActiveHeroSlide] = useState(0);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    const heroSlides = [
        {
            id: 1,
            image: "https://www.gigahertz.com.ph/cdn/shop/files/GAMING_HERO_homepage.jpg?v=1738546275&width=1600",
            link: "/laptops/gaming-laptops"
        },
        {
            id: 2,
            image: "https://www.gigahertz.com.ph/cdn/shop/files/PERIPHALS_homepage.jpg?v=1738546192&width=1600",
            link: "/components/sodimm-ram"
        },
    ];

    const tabsContent = [
        { id: "featured", name: "Featured" },
        { id: "best-sellers", name: "Best Sellers" },
        { id: "new-arrivals", name: "New Arrivals" },
    ];

    const productCategories = [
        {
            name: "Laptops",
            image: "https://cdn.shopify.com/s/files/1/0564/4694/3414/files/LAPTOP.png?v=1743733582&width=375",
            link: "/laptops/gaming-laptops"
        },
        {
            name: "Desktops",
            image: "https://cdn.shopify.com/s/files/1/0564/4694/3414/files/DESKTOP.png?v=1743733582&width=375",
            link: "/desktops/gaming-entry"
        },
        {
            name: "Consoles",
            image: "https://cdn.shopify.com/s/files/1/0564/4694/3414/files/CONSOLE_2b7ab6ea-da26-43bd-8b28-246c51a087b3.png?v=1743733581&width=375",
            link: "/handheld-devices/consoles"
        },
        {
            name: "Handhelds",
            image: "https://cdn.shopify.com/s/files/1/0564/4694/3414/files/TABLETS_d2206e66-03d1-45d3-a6eb-932ca7167266.png?v=1743733582&width=375",
            link: "/handheld-devices/Tablets"
        },
        {
            name: "Replacement Parts",
            image: "https://cdn.shopify.com/s/files/1/0564/4694/3414/files/PARTS_88c7c0c8-5644-41e9-b880-49efb9383635.png?v=1743733582&width=375",
            link: "/replacement-parts/lcd-replacement-parts"
        },
        {
            name: "Components",
            image: "https://cdn.shopify.com/s/files/1/0564/4694/3414/files/HDD_9e32d20e-935b-4b99-9b44-f797f09d9dea.png?v=1743733582&width=375",
            link: "/components/sodimm-ram"
        },
    ];

    const featuredBrands = [
        {
            name: "Acer",
            image: "https://cdn.shopify.com/s/files/1/0564/4694/3414/files/Landing_page-brands_Button-Acer-min_b05e0a18-34c5-45e9-8e9b-1d22982465e6.jpg?v=1721711557&width=375"
        },
        {
            name: "Asus",
            image: "https://cdn.shopify.com/s/files/1/0564/4694/3414/files/Landing_page-brands_ASUS_BUTTON-min_1e12f0ad-9449-448f-84e2-c68b5eb0aa87.jpg?v=1721711557&width=375"
        },
        {
            name: "Dell",
            image: "https://cdn.shopify.com/s/files/1/0564/4694/3414/files/dell_button-min_86718d07-762d-493f-821d-bb52cac3916b.jpg?v=1721711557&width=375"
        },
        {
            name: "Lenovo",
            image: "https://cdn.shopify.com/s/files/1/0564/4694/3414/files/Landing_page-brands_BUTTON_-_LENOVO-min_27d578b7-1562-4d3b-8c58-a4eecf1c92a1.jpg?v=1721711558&width=375"
        },
        {
            name: "MSI",
            image: "https://cdn.shopify.com/s/files/1/0564/4694/3414/files/Landing_page-brands_MSI_BUTTON-min_d44cd0f4-ae94-42f3-8a85-41c786011ff1.jpg?v=1721711557&width=375"
        },
        {
            name: "HP",
            image: "https://cdn.shopify.com/s/files/1/0564/4694/3414/files/hp_button_59f18de7-760e-458e-9840-e212a3e4a860.jpg?v=1721711558&width=375"
        },
        {
            name: "Samsung",
            image: "https://cdn.shopify.com/s/files/1/0564/4694/3414/files/SAMSUNG_60db9b6e-02ae-4801-b947-b420d0dff779.jpg?v=1721711557&width=375"
        }
    ];

    const nextHeroSlide = () => {
        setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const prevHeroSlide = () => {
        setActiveHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const result1 = await fetch('https://localhost:44373/api/products/category/43');
            const result2 = await fetch('https://localhost:44373/api/products/category/48');
            const gamingLaptops = await result1.json();
            const gamingDesktops = await result2.json();
            if (gamingLaptops.success || gamingDesktops.success) {
                setProducts([
                    ...gamingLaptops.data.products.filter(product => product.stocks > 0).slice(0, 5),
                    ...gamingDesktops.data.products.filter(product => product.stocks > 0).slice(0, 5)
                ]);
            } else {
                console.error('Failed to load products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    const formatPriceWithoutSymbol = (price) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price);
    };

    const scrollToNext = () => {
        if (containerRef.current) {
            const container = containerRef.current;
            const cardWidth = container.querySelector('.product-card').offsetWidth + 16; // Width + margin
            container.scrollBy({ left: cardWidth, behavior: 'smooth' });

            // Update current index
            if (currentIndex < products.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        }
    };

    const scrollToPrev = () => {
        if (containerRef.current) {
            const container = containerRef.current;
            const cardWidth = container.querySelector('.product-card').offsetWidth + 16; // Width + margin
            container.scrollBy({ left: -cardWidth, behavior: 'smooth' });

            // Update current index
            if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        }
    };

    return (
        <div className="container-fluid p-0">
            {/* Mobile Navigation Bar */}
            <div className="d-md-none bg-dark text-white p-3">
                <div className="d-flex justify-content-between align-items-center">
                    <Menu size={24} />
                    <div className="d-flex">
                        <Search className="me-3" size={24} />
                        <ShoppingCart className="me-3" size={24} />
                        <User size={24} />
                    </div>
                </div>
            </div>

            {/* Hero Carousel */}
            <div className="position-relative">
                <div className="carousel slide">
                    <div className="carousel-inner">
                        {heroSlides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`carousel-item ${index === activeHeroSlide ? 'active' : ''}`}
                            >
                                <img
                                    src={slide.image}
                                    className="d-block w-100"
                                    alt={`Hero Banner ${slide.id}`}
                                    style={{ height: "auto", maxHeight: "520px", objectFit: "cover" }}
                                    onClick={() => navigate(slide.link)}
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        className="carousel-control-prev bg-white rounded-circle"
                        style={{ width: "40px", height: "40px", top: "50%", transform: "translateY(-50%)", left: "20px" }}
                        onClick={prevHeroSlide}
                    >
                        <ChevronLeft className="text-dark" size={20} />
                    </button>
                    <button
                        className="carousel-control-next bg-white rounded-circle"
                        style={{ width: "40px", height: "40px", top: "50%", transform: "translateY(-50%)", right: "20px" }}
                        onClick={nextHeroSlide}
                    >
                        <ChevronRight className="text-dark" size={20} />
                    </button>
                    <div className="carousel-indicators position-absolute bottom-0">
                        {heroSlides.map((_, index) => (
                            <button
                                key={index}
                                className={`rounded-circle mx-1 ${index === activeHeroSlide ? 'bg-primary' : 'bg-secondary'}`}
                                style={{ width: "10px", height: "10px" }}
                                onClick={() => setActiveHeroSlide(index)}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Category Navigation */}
            <div className="container mt-4">
                <div className="row">
                    {productCategories.map((category, index) => (
                        <div key={index} className="col-6 col-md-3 col-lg-2 mb-3">
                            <div className="h-100 category-card">
                                <div className="card-body category-image mx-auto mb-2">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="img-fluid"
                                        style={{ objectFit: "contain" }}
                                        onClick={() => navigate(category.link)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Promotions Banner */}
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12 col-md-8 mb-3">
                        <div className="promo-banner">
                            <img
                                src="https://cdn.shopify.com/s/files/1/0564/4694/3414/files/gaming_laptop.jpg?v=1721633832&width=1280"
                                alt="Main Promotion Banner"
                                className="img-fluid w-100 rounded"
                                style={{ height: "auto", objectFit: "cover" }}
                                onClick={() => navigate('/laptops/gaming-laptops')}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mb-3">
                        <div className="promo-banner">
                            <img
                                src="https://cdn.shopify.com/s/files/1/0564/4694/3414/files/MAINSTREAM_LAPTOP_1.jpg?v=1722394990&width=1280"
                                alt="Secondary Promotion"
                                className="img-fluid w-100 rounded"
                                style={{ height: "100%", objectFit: "cover" }}
                                onClick={() => navigate('/laptops/mainstream-laptops')}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Tabs */}
            <div className="container mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="mb-0">Products</h2>
                    <ul className="nav nav-tabs border-0">
                        {tabsContent.map((tab, index) => (
                            <li key={tab.id} className="nav-item">
                                <button
                                    className={`nav-link ${activeTabIndex === index ? 'active fw-bold' : ''}`}
                                    onClick={() => setActiveTabIndex(index)}
                                >
                                    {tab.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>


                <div className="tab-content">
                    <div className="tab-pane active">
                        <div className="relative w-full">
                            {/* Container */}
                            <div className="position-relative">
                                {/* Container */}
                                <div
                                    ref={containerRef}
                                    className="d-flex overflow-hidden py-3 px-2"
                                    style={{ scrollBehavior: 'smooth' }}
                                >
                                    {products.map((product) => {

                                        // Calculate the discount percentage
                                        const originalPrice = product.originalPrice || (product.price * 1.25);
                                        const savings = originalPrice - product.price;
                                        return (
                                            product.stocks > 0 &&
                                            <div key={product.id} className="product-card mx-2" style={{ minWidth: '240px', flexShrink: 0 }}>
                                                <div className="card h-100 shadow-sm">
                                                    {/* Product image with badges */}
                                                    <div className="position-relative">
                                                        <img
                                                            src={product.categoryId == 43 ? "https://www.gigahertz.com.ph/cdn/shop/files/asus-proart-studiobook-one-w590g6t-hi004r-asus-gigahertz-768947.jpg?v=1726731415&width=600" : "https://www.gigahertz.com.ph/cdn/shop/files/DESKTOP-ASUSROGASUG15CF-1270KF017WSG15CFI7-12700KF32GBDDR341TBSSDRTX3060Ti8GBDDR6WIN11s.jpg?v=1727854064&width=600"}
                                                            alt={product.name}
                                                            className="card-img-top p-2"
                                                            style={{ height: '240px', objectFit: 'contain' }}
                                                        />
                                                        </div>

                                                        {/* Product details */}
                                                        <div className="card-body d-flex flex-column">
                                                            {/* Product name */}
                                                            <h6 className="card-title text-primary fw-bold" title={product.fullName}>
                                                                {product.name}
                                                            </h6>

                                                            <div className="mt-auto">
                                                                {/* Price section */}
                                                                <div className="mb-2">
                                                                    <h5 className="fw-bold text-danger mb-0">PHP{formatPriceWithoutSymbol(savings)}</h5>
                                                                    <small className="text-decoration-line-through text-muted">PHP{formatPriceWithoutSymbol(originalPrice)}</small>
                                                                </div>

                                                                {/* Add to cart button */}
                                                            <button className="btn btn-primary w-100">
                                                                Add To Cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Navigation arrows */}
                                <button
                                    onClick={scrollToPrev}
                                    className={`btn btn-secondary rounded-circle position-absolute start-0 top-50 translate-middle-y shadow-sm d-flex align-items-center justify-content-center ${currentIndex === 0 ? 'opacity-50' : ''}`}
                                    disabled={currentIndex === 0}
                                    style={{ zIndex: 1, height: '40px', width: '45px' }}
                                >
                                    <ChevronLeft size={25} className="text-light" />
                                </button>

                                <button
                                    onClick={scrollToNext}
                                    className={`btn btn-secondary rounded-circle position-absolute end-0 top-50 translate-middle-y shadow-lg d-flex align-items-center justify-content-center ${currentIndex === products.length - 1 ? 'opacity-50' : ''}`}
                                    disabled={currentIndex === products.length - 1}
                                    style={{ zIndex: 1, height: '40px', width: '45px' }}
                                >
                                    <ChevronRight className="text-light" />
                                </button>
                            </div>
                        </div>
                        <div className="text-center mt-2 mb-5">
                            <button className="btn btn-outline-primary px-4 view-more-btn"
                                onClick={() => { navigate('laptops/gaming-laptops') }}>View More</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary Banner */}
            <div className="container mt-4 mb-5 d-flex">
                <div className="secondary-banner">
                    <img
                        src="https://cdn.shopify.com/s/files/1/0564/4694/3414/files/PERIPHERALS_HOME_PAGE.jpg?v=1721706270&width=1280"
                        alt="Secondary Promotion Banner"
                        className="img-fluid"
                        style={{ height: "auto", objectFit: "cover" }}
                        onClick={() => navigate('/components/sodimm-ram')}
                    />
                </div>
                <div className="secondary-banner">
                    <img
                        src="https://cdn.shopify.com/s/files/1/0564/4694/3414/files/NEW_ARRIVAL_b5a285e8-5828-48b4-84fa-df9cb2a3441a.jpg?v=1721715753&width=1280"
                        alt="Secondary Promotion Banner"
                        className="img-fluid"
                        style={{ height: "auto", objectFit: "cover" }}
                        onClick={() => navigate('/desktops/gaming-entry')}
                    />
                </div>
                <div className="secondary-banner">
                    <img
                        src="https://cdn.shopify.com/s/files/1/0564/4694/3414/files/FREEBIES_BANNER_1.jpg?v=1721706270&width=1280"
                        alt="Secondary Promotion Banner"
                        className="img-fluid"
                        style={{ height: "auto", objectFit: "cover" }}
                        onClick={() => navigate('/laptops/gaming-laptops')}
                    />
                </div>
            </div>

            {/* Featured Brands */}
            <div className="container mt-5 mb-5">
                <h3 className="mb-4 fw-bold">Featured Brands</h3>
                <div className="row">
                    {featuredBrands.map((brand, index) => (
                        <div key={index} className="col-6 col-md-3 mb-5">
                            <img
                                src={brand.image}
                                alt={brand.name}
                                className="img-fluid card h-100 border-0 brand-card rounded"
                                style={{ height: "100px", objectFit: "contain" }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <img src="https://cdn.shopify.com/s/files/1/0564/4694/3414/files/SERVICE_CENTER_1_7dfde258-41e7-4912-946c-b51eec35389e-pfti.jpg?v=1740117446&width=1280" alt="Service Center" className="img-fluid w-100 mb-5" style={{ height: "auto", objectFit: "cover" }} />

            <img src="https://cdn.shopify.com/s/files/1/0564/4694/3414/files/LOGOS_BANKS.jpg?v=1743656750&width=1280" alt="Payment Options" className="img-fluid w-100 mb-5" style={{ height: "auto", objectFit: "cover" }} />
        </div>
    );
}

export default HomePage;