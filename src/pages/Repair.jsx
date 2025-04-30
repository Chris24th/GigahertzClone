import React, { useState } from 'react';
import { FiPackage, FiTruck, FiTool, FiClock, FiCheckCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaPhoneAlt } from 'react-icons/fa';
import axios from 'axios';

export default function GigahertzServicePage() {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        brand: '',
        replacementParts: '',
        subject: 'Laptop Repair Service',
        message: 'I need help with my laptop repair'
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Transform the data to match the backend model
            const submitData = {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                subject: `${formData.brand} Laptop Repair - ${formData.replacementParts}`,
                message: formData.message
            };
            console.log('Submitting data:', submitData);
            const response = await axios.post('https://localhost:44373/api/contact', submitData);
            console.log('Response:', response.data);
            if (response.data.success) {
                setSuccess(true);
                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    brand: '',
                    replacementParts: '',
                    subject: 'Laptop Repair Service',
                    message: 'I need help with my laptop repair'
                });
            } else {
                setError('Submission failed. Please try again.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCall = () => {
        window.location.href = 'tel:+63912345678';
    };

    // Options for the dropdown menus
    const brandOptions = ['Asus', 'Acer', 'Lenovo', 'MSI'];
    const partsOptions = [
        'Adapter',
        'Battery',
        'Bottom Case',
        'EDP Cable',
        'Fan',
        'Hinge',
        'IO Board',
        'Keyboard',
        'LCD',
        'LCD Bezel',
        'Main Board',
        'Speaker',
        'Others'
    ];

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    const faqs = [
        {
            question: "How do I request for repair service?",
            answer: "You can submit a repair request through our online form on this page, call our customer service at (02) 8123-4567, or visit any of our service centers across the Philippines."
        },
        {
            question: "How long does the repair process take?",
            answer: "Repair time varies depending on the issue and availability of parts. Simple repairs may take 1-3 business days, while more complex issues may take 5-7 business days. You'll receive an estimated timeline when you drop off your device."
        },
        {
            question: "Do you offer warranty for repairs?",
            answer: "Yes, all our repairs come with a 90-day warranty covering both parts and service. This ensures you're protected against any recurring issues related to the repair we performed."
        },
        {
            question: "What if my device cannot be repaired?",
            answer: "If we determine that your device cannot be repaired economically, we'll discuss alternative options with you, including potential trade-in opportunities for a new device."
        },
        {
            question: "Do you offer on-site service for large appliances?",
            answer: "Yes, we provide on-site service for large appliances like refrigerators, washing machines, and TVs over 43 inches. Additional service charges may apply depending on your location."
        }
    ];

    return (
        <section>
            {/* Hero div */}
            <div className="">
                <img src="/assets/repair-banner.jpg" alt="Repair Page Banner"
                    className="img-fluid mb-3"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div className='d-flex flex-column align-items-center mx-auto mt-4 justify-content-center' style={{ maxWidth: '1200px' }}>
                {/* Brands div */}
                <div className="text-center py-5">
                    <h2 className="fw-bold mb-3">We Offer Expert Laptop Repair & Service</h2>
                    <p className="lead fs-6">
                        Get your Acer, ASUS, Lenovo, and MSI laptops repaired by professionals! We provide
                        fast, reliable, and affordable solutions for all hardware and software issues.
                    </p>
                </div>

                {/* Brand Cards */}
                <div className="container">
                    <div className="row g-4">
                        {brandOptions.map((brand, index) => {
                            return (
                                <div key={index} className="col-12 col-sm-6 col-md-3">
                                    <div className="card h-100 border-1">
                                        <div className="card-body text-center">
                                            <img
                                                src={`assets/${brand.toLowerCase()}.png`}
                                                alt={`${brand} logo`}
                                                className="img-fluid mb-3"
                                            />
                                        </div>
                                        <div className="card-footer p-2 bg-white border-0">
                                            <button className="btn btn-primary w-100 rounded-0 bg-blue">
                                                Learn More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Services div
                <div className="py-5">
                    <div className="container">
                        <h2 className="text-center mb-5">Our Repair Services</h2>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <div className="card h-100 shadow-sm border-0">
                                    <div className="card-body text-center p-4">
                                        <div className="mb-3">
                                            <img src="/api/placeholder/80/80?text=Computers" alt="Computers" className="img-fluid" />
                                        </div>
                                        <h3 className="h4 mb-3">Computers & Laptops</h3>
                                        <p className="text-muted">Hardware repairs, software issues, virus removal, data recovery, upgrades, and system optimization.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card h-100 shadow-sm border-0">
                                    <div className="card-body text-center p-4">
                                        <div className="mb-3">
                                            <img src="/api/placeholder/80/80?text=Mobile" alt="Mobile Devices" className="img-fluid" />
                                        </div>
                                        <h3 className="h4 mb-3">Mobile Devices</h3>
                                        <p className="text-muted">Screen replacements, battery replacements, water damage repair, charging port fixes, and more.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card h-100 shadow-sm border-0">
                                    <div className="card-body text-center p-4">
                                        <div className="mb-3">
                                            <img src="/api/placeholder/80/80?text=Home" alt="Home Appliances" className="img-fluid" />
                                        </div>
                                        <h3 className="h4 mb-3">Home Appliances</h3>
                                        <p className="text-muted">Refrigerators, washing machines, air conditioners, TVs, audio systems, and small home appliances.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Repair form */}
                <div className="container my-5 ">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body p-4">
                                    <h3 className="text-center text-blue mb-4">Contact Us for Expert Laptop Repair & Service</h3>

                                    <div className="d-flex row justify-content-center align-items-center">
                                        <img    
                                            src="/assets/technician-animated.png"
                                            alt="Laptop Technician"
                                            className="col-lg-5"
                                            style={{ maxWidth: '350px', objectFit: 'cover' }}
                                        />

                                        <div className="col-lg-7">
                                            {success ? (
                                                <div className="alert alert-success">
                                                    Thank you for your submission! We'll contact you shortly.
                                                </div>
                                            ) : (
                                                <form onSubmit={handleSubmit}>
                                                        {error && <div className="alert alert-danger">{error}</div>}

                                                        <div className="row mb-3">
                                                            <div className="col-md-6 mb-3 mb-md-0">
                                                                <label htmlFor="firstName" className="form-label">First Name <span className="text-danger">*</span></label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="firstName"
                                                                    name="firstName"
                                                                    placeholder="First Name"
                                                                    value={formData.firstName}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="lastName" className="form-label">Last Name <span className="text-danger">*</span></label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="lastName"
                                                                    name="lastName"
                                                                    placeholder="Last Name"
                                                                    value={formData.lastName}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="row mb-3">
                                                            <div className="col-md-6 mb-3 mb-md-0">
                                                                <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                                                                <input
                                                                    type="email"
                                                                    className="form-control"
                                                                    id="email"
                                                                    name="email"
                                                                    placeholder="Email"
                                                                    value={formData.email}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="phone" className="form-label">Phone <span className="text-danger">*</span></label>
                                                                <div className="input-group">
                                                                    <span className="input-group-text">
                                                                        +63
                                                                    </span>
                                                                    <input
                                                                        type="tel"
                                                                        className="form-control"
                                                                        id="phone"
                                                                        name="phone"
                                                                        placeholder="912 345 6789"
                                                                        value={formData.phone}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row mb-3">
                                                            <div className="col-md-6 mb-3 mb-md-0">
                                                                <label htmlFor="brand" className="form-label">Brand <span className="text-danger">*</span></label>
                                                                <select
                                                                    className="form-select"
                                                                    id="brand"
                                                                    name="brand"
                                                                    value={formData.brand}
                                                                    onChange={handleChange}
                                                                    required
                                                                >
                                                                    <option value="">Please select</option>
                                                                    {brandOptions.map(option => (
                                                                        <option key={option} value={option}>{option}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="replacementParts" className="form-label">Replacement Parts Needed <span className="text-danger">*</span></label>
                                                                <select
                                                                    className="form-select"
                                                                    id="replacementParts"
                                                                    name="replacementParts"
                                                                    value={formData.replacementParts}
                                                                    onChange={handleChange}
                                                                    required
                                                                >
                                                                    <option value="">Please select</option>
                                                                    {partsOptions.map(option => (
                                                                        <option key={option} value={option}>{option}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="d-grid gap-3 mt-4">
                                                            <button
                                                                type="button"
                                                                className="btn bg-darkblue py-2 text-light"
                                                                onClick={handleCall}
                                                            >
                                                                <FaPhoneAlt className="me-2" /> Call Us
                                                            </button>

                                                            <div className="text-center">or</div>

                                                            <button
                                                                type="submit"
                                                                className="btn bg-darkblue py-2 text-light"
                                                                disabled={loading}
                                                            >
                                                                {loading ? 'Submitting...' : 'Submit'}
                                                            </button>
                                                    </div>
                                                    </form>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Info */}
                <div className="why-choose-section my-5">
                    <h2>Why Choose GigaHertz Laptop Services?</h2>

                    <p>
                        At GigaHertz, we understand how crucial your laptop is for work, study, and entertainment.
                        Our certified technicians are here to solve any issue, large or small, and return your
                        laptop to optimal condition. Here's why GigaHertz is the best choice for your laptop repair needs:
                    </p>

                    {/* Expanded content */}
                    {expanded && (
                        <div className="expanded-content mt-3">
                            <ol className='d-flex flex-column gap-4'>
                                <li>
                                    <p>We offer high-quality repair services for leading laptop brands, including:</p>
                                    <ul>
                                        <li>Acer</li>
                                        <li>ASUS</li>
                                        <li>Lenovo</li>
                                        <li>MSI</li>
                                    </ul>
                                    <br />
                                    <p>Whether it's a software issue, a broken screen, or faulty hardware, our team is trained to handle problems specific to these brands and provide you with the best solutions.</p>
                                </li>
                                <li>
                                    <p> Experienced Laptop Technicians  Our expert technicians are trained to handle various laptop issues, from malfunctioning keyboards to slow performance. Whatever the problem is, our technicians will diagnose and fix it quickly and effectively.</p>
                                </li>
                                <li>
                                    <p> Affordable and Reliable Repairs  At GigaHertz, we believe in providing affordable services without compromising on quality. We offer transparent pricing and quick estimates, so there are no surprises when it comes to the cost of your repair. You can count on us for budget-friendly, reliable solutions.</p>
                                </li>
                                <li>
                                    <p> Quick Turnaround Time  We know how important it is to get your laptop back in working condition as quickly as possible. Our service team strives to offer fast turnaround times for all repairs, so you're not left waiting long for your laptop to be repaired.</p>
                                </li>
                                <li>
                                    <p> GigaHertz Service Centers Near You  At GigaHertz, we have multiple branches, so you can easily find one near you. Whether you need to drop off your laptop for repair or book a service appointment, we make it simple and convenient.</p>
                                    <p>To find the nearest GigaHertz branch, visit our Branch Locator and get the information you need.</p>
                                </li>
                            </ol>

                            <p className="mt-4 fw-bold">Services We Offer</p>
                            <ul className="services-list d-flex flex-column gap-4">
                                <li>Battery Repair/Replacement - Restore your battery's life with high-quality replacements.</li>
                                <li>Bottom Case Replacement - Fix cracks or damage to protect your laptop's internal components.</li>
                                <li>EDP Cable Repair - Resolve screen flickering or blackouts caused by damaged cables.</li>
                                <li>Fan Repair/Replacement - Keep your laptop cool and running smoothly with a new fan.</li>
                                <li>Hinge Repair/Replacement - Fix broken or stiff hinges for better movement.</li>
                                <li>I/O Board Repair - Get all your ports (USB, HDMI, charging) working again.</li>
                                <li>Keyboard Repair/Replacement - Replace or repair unresponsive keys on your keyboard.</li>
                                <li>LCD Repair/Replacement - Fix cracked screens or replace faulty displays.</li>
                                <li>LCD Bezel Repair - Replace damaged bezels to keep your screen secure.</li>
                                <li>Mainboard Repair - Fix issues with your laptop's motherboard for smooth performance.</li>
                                <li>Speaker Repair/Replacement - Restore clear audio with new speakers.</li>
                                <li>Laptop Cleaning - Remove dust and debris from your laptop to keep it running cool.</li>
                                <li>Thermal Paste Replacement - Improve your laptop's cooling system with fresh thermal paste.</li>
                            </ul>

                            <div className="call-to-action mt-5 d-flex flex-column gap-4">
                                <p className='fw-bold'>Get Your Laptop Fixed at GigaHertz Today!</p>
                                <p>
                                    If you need reliable laptop repair, don't hesitate! Whether it's a laptop screen repair, routine cleaning, or a more complex issue, GigaHertz Laptop Services is ready to help.
                                </p>
                                <p>
                                    Visit our service center or schedule an appointment with one of our skilled technicians today!
                                </p>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={toggleExpand}
                        className="read-more-btn text-primary border-0 bg-transparent d-flex align-items-center p-0 mt-2"
                    >
                        {expanded ? "Read less" : "Read more"}
                        <span
                            className="ms-1"
                            style={{
                                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            }}>▼</span>
                    </button>
                </div>

                {/* FAQ div */}
                <div className="py-5" style={{ width: '900px' }}>
                    <div className="container" >
                        <h2 className="text-center mb-5">Frequently Asked Questions</h2>
                        <div className="row justify-content-center">
                            <div className="accordion">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="accordion-item mb-3 shadow-sm border-0 ">
                                        <div
                                            className="accordion-header cursor-pointer p-3"
                                            onClick={() => toggleAccordion(index)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h5 className="mb-0">{faq.question}</h5>
                                                {activeAccordion === index ?
                                                    <FiChevronUp className="text-primary" size={20} /> :
                                                    <FiChevronDown className="text-primary" size={20} />
                                                }
                                            </div>
                                        </div>
                                        {activeAccordion === index && (
                                            <div className="accordion-body p-3 bg-white">
                                                <p className="mb-0">{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}