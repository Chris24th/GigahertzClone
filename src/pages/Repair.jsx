import React, { useState } from 'react';
import { FiPackage, FiTruck, FiTool, FiClock, FiCheckCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function GigahertzServicePage() {
    const [validated, setValidated] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState(null);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        setValidated(true);
    };

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    const brands = [
        'Apple', 'Samsung', 'Sony', 'LG', 'Asus',
        'Dell', 'HP', 'Lenovo', 'Acer', 'Microsoft'
    ];

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

    const processSteps = [
        { icon: <FiPackage size={40} className="text-primary mb-3" />, title: "Request Service", desc: "Submit your repair request online, by phone, or at our service centers" },
        { icon: <FiTruck size={40} className="text-primary mb-3" />, title: "Drop Off or Pickup", desc: "Drop off your device or schedule a pickup service for your convenience" },
        { icon: <FiTool size={40} className="text-primary mb-3" />, title: "Diagnosis & Repair", desc: "Our technicians will diagnose the issue and perform necessary repairs" },
        { icon: <FiClock size={40} className="text-primary mb-3" />, title: "Completion", desc: "We'll notify you once your device is repaired and ready for pickup or delivery" },
        { icon: <FiCheckCircle size={40} className="text-primary mb-3" />, title: "90-Day Warranty", desc: "All our repairs come with a 90-day warranty for your peace of mind" }
    ];

    return (
        <section className="gigahertz-service-page">
            {/* Hero div */}
            <div className="bg-primary text-white py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8 col-md-7 mb-4 mb-md-0">
                            <h1 className="display-4 fw-bold mb-4">Expert Repair & Service</h1>
                            <p className="lead mb-4">
                                Trust your devices with our certified technicians. We provide professional repair services for all major brands of electronics, computers, and appliances.
                            </p>
                            <button className="btn btn-light btn-lg fw-bold">
                                Request Service Now
                            </button>
                        </div>
                        <div className="col-lg-4 col-md-5 d-none d-md-block text-center">
                            <img src="/api/placeholder/400/300" alt="Service technician" className="img-fluid rounded" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Brands div */}
            <div className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5">We Service All Major Brands</h2>
                    <div className="row g-4">
                        {brands.map((brand, index) => (
                            <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">
                                <div className="card h-100 shadow-sm border-0">
                                    <div className="card-body d-flex align-items-center justify-content-center">
                                        <img
                                            src={`/api/placeholder/120/60?text=${brand}`}
                                            alt={`${brand} logo`}
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Services div */}
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
            </div>

            {/* Process Steps div */}
            <div className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5">Our Repair Process</h2>
                    <div className="row g-4">
                        {processSteps.map((step, index) => (
                            <div key={index} className="col-md-4 col-lg-2 text-center mb-4">
                                <div className="d-flex flex-column align-items-center">
                                    {step.icon}
                                    <h3 className="h5 mb-2">{step.title}</h3>
                                    <p className="small text-muted">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Additional Services Info */}
            <div className="py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <img src="/api/placeholder/500/300" alt="Technician repairing device" className="img-fluid rounded" />
                        </div>
                        <div className="col-lg-6">
                            <h2 className="mb-4">Why Choose Our Service</h2>
                            <ul className="list-unstyled">
                                <li className="mb-3 d-flex align-items-start">
                                    <FiCheckCircle className="text-primary me-2 mt-1" size={20} />
                                    <div>
                                        <h4 className="h5 mb-1">Certified Technicians</h4>
                                        <p className="text-muted">Our repair specialists are manufacturer-certified and undergo continuous training.</p>
                                    </div>
                                </li>
                                <li className="mb-3 d-flex align-items-start">
                                    <FiCheckCircle className="text-primary me-2 mt-1" size={20} />
                                    <div>
                                        <h4 className="h5 mb-1">Genuine Parts</h4>
                                        <p className="text-muted">We only use authentic replacement parts to ensure quality and reliability.</p>
                                    </div>
                                </li>
                                <li className="mb-3 d-flex align-items-start">
                                    <FiCheckCircle className="text-primary me-2 mt-1" size={20} />
                                    <div>
                                        <h4 className="h5 mb-1">90-Day Warranty</h4>
                                        <p className="text-muted">All our repairs come with a 3-month warranty on parts and service.</p>
                                    </div>
                                </li>
                                <li className="d-flex align-items-start">
                                    <FiCheckCircle className="text-primary me-2 mt-1" size={20} />
                                    <div>
                                        <h4 className="h5 mb-1">Nationwide Service</h4>
                                        <p className="text-muted">With service centers across the Philippines, we're always close to you.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ div */}
            <div className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5">Frequently Asked Questions</h2>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="accordion">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="accordion-item mb-3 shadow-sm border-0">
                                        <div
                                            className="accordion-header cursor-pointer p-3"
                                            onClick={() => toggleAccordion(index)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h3 className="h5 mb-0 fw-bold">{faq.question}</h3>
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

            {/* Contact Form div */}
            <div className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10">
                            <div className="card border-0 shadow">
                                <div className="card-body p-4 p-md-5">
                                    <h2 className="text-center mb-4">Request Service</h2>
                                    <p className="text-center text-muted mb-4">
                                        Fill out the form below and our team will get back to you within 24 hours.
                                    </p>

                                    <form onSubmit={handleSubmit}>
                                        <div className="row mb-3">
                                            <div className="col-md-6 mb-3 mb-md-0">
                                                <div className="form-group">
                                                    <label htmlFor="formName" className="form-label fw-bold">Full Name</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${validated && !document.getElementById('formName')?.value ? 'is-invalid' : ''}`}
                                                        id="formName"
                                                        placeholder="Enter your full name"
                                                        required
                                                    />
                                                    {validated && !document.getElementById('formName')?.value && (
                                                        <div className="invalid-feedback">
                                                            Please provide your name.
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="formEmail" className="form-label fw-bold">Email Address</label>
                                                    <input
                                                        type="email"
                                                        className={`form-control ${validated && !document.getElementById('formEmail')?.value ? 'is-invalid' : ''}`}
                                                        id="formEmail"
                                                        placeholder="Enter your email"
                                                        required
                                                    />
                                                    {validated && !document.getElementById('formEmail')?.value && (
                                                        <div className="invalid-feedback">
                                                            Please provide a valid email.
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col-md-6 mb-3 mb-md-0">
                                                <div className="form-group">
                                                    <label htmlFor="formPhone" className="form-label fw-bold">Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        className={`form-control ${validated && !document.getElementById('formPhone')?.value ? 'is-invalid' : ''}`}
                                                        id="formPhone"
                                                        placeholder="Enter your phone number"
                                                        required
                                                    />
                                                    {validated && !document.getElementById('formPhone')?.value && (
                                                        <div className="invalid-feedback">
                                                            Please provide your phone number.
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="formDeviceType" className="form-label fw-bold">Device Type</label>
                                                    <select
                                                        className={`form-select ${validated && !document.getElementById('formDeviceType')?.value ? 'is-invalid' : ''}`}
                                                        id="formDeviceType"
                                                        required
                                                    >
                                                        <option value="">Select device type</option>
                                                        <option value="laptop">Laptop/Computer</option>
                                                        <option value="smartphone">Smartphone</option>
                                                        <option value="tablet">Tablet</option>
                                                        <option value="tv">Television</option>
                                                        <option value="appliance">Home Appliance</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                    {validated && !document.getElementById('formDeviceType')?.value && (
                                                        <div className="invalid-feedback">
                                                            Please select a device type.
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <div className="form-group">
                                                <label htmlFor="formBrand" className="form-label fw-bold">Brand & Model</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${validated && !document.getElementById('formBrand')?.value ? 'is-invalid' : ''}`}
                                                    id="formBrand"
                                                    placeholder="e.g., Samsung Galaxy S23 Ultra"
                                                    required
                                                />
                                                {validated && !document.getElementById('formBrand')?.value && (
                                                    <div className="invalid-feedback">
                                                        Please provide the brand and model.
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <div className="form-group">
                                                <label htmlFor="formIssue" className="form-label fw-bold">Issue Description</label>
                                                <textarea
                                                    className={`form-control ${validated && !document.getElementById('formIssue')?.value ? 'is-invalid' : ''}`}
                                                    id="formIssue"
                                                    rows={4}
                                                    placeholder="Please describe the issue you're experiencing in detail"
                                                    required
                                                />
                                                {validated && !document.getElementById('formIssue')?.value && (
                                                    <div className="invalid-feedback">
                                                        Please describe the issue.
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="form-group">
                                                <label htmlFor="formLocation" className="form-label fw-bold">Preferred Service Center</label>
                                                <select
                                                    className={`form-select ${validated && !document.getElementById('formLocation')?.value ? 'is-invalid' : ''}`}
                                                    id="formLocation"
                                                    required
                                                >
                                                    <option value="">Select location</option>
                                                    <option value="makati">Makati City Branch</option>
                                                    <option value="quezon">Quezon City Branch</option>
                                                    <option value="cebu">Cebu City Branch</option>
                                                    <option value="davao">Davao City Branch</option>
                                                </select>
                                                {validated && !document.getElementById('formLocation')?.value && (
                                                    <div className="invalid-feedback">
                                                        Please select a service center.
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-lg px-5"
                                            >
                                                Submit Request
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}