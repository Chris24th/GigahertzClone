import { useState, useEffect } from 'react';
import axios from 'axios';

const RepairAdminForm = () => {
    // Form state
    const [formData, setFormData] = useState({
        customerId: 0,
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        customerAddress: '',
        serviceTypeId: 0,
        serviceCenterId: 0,
        productId: 0,
        serialNumber: '',
        issueDescription: '',
        additionalNotes: '',
        isWarrantyRepair: false,
        // Include serviceTypeList and serviceCenterList with proper structure
        serviceTypeList: [],
        serviceCenterList: [],
    });

    // Store the product categories separately since they have a complex structure
    const [serviceTypes, setServiceTypes] = useState([]);
    const [serviceCenters, setServiceCenters] = useState([]);
    const [productCategories, setProductCategories] = useState([]);
    const [brands, setBrands] = useState(['Asus', 'Acer', 'Lenovo', 'MSI']);
    const [selectedBrand, setSelectedBrand] = useState(null);

    // Form submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [requestId, setRequestId] = useState(null);

    // Fetch initial data
    useEffect(() => {
        const fetchFormData = async () => {
            try {
                // These would be your actual API endpoints
                const serviceTypesResponse = await axios.get('https://localhost:44373/api/repairs/types');
                const serviceCentersResponse = await axios.get('https://localhost:44373/api/repairs/centers');
                const productCategoriesResponse = await axios.get('https://localhost:44373/api/categories');

                const serviceTypesList = serviceTypesResponse.data || [];
                const serviceCentersList = serviceCentersResponse.data || [];
                const productCategoriesList = productCategoriesResponse.data || [];

                setServiceTypes(serviceTypesList);
                setServiceCenters(serviceCentersList);
                setProductCategories(productCategoriesList);
                // Update form data with the retrieved lists
                setFormData(prev => ({
                    ...prev,
                    serviceTypeList: serviceTypesList.map(type => ({
                        disabled: false,
                        group: { disabled: false, name: type.name },
                        selected: false,
                        text: type.name,
                        value: type.typeId.toString()
                    })),
                    serviceCenterList: serviceCentersList.map(center => ({
                        disabled: false,
                        group: { disabled: false, name: center.name },
                        selected: false,
                        text: center.name,
                        value: center.centerId.toString()
                    }))
                }));

                // Store product categories separately
                setProductCategories(productCategoriesList);
            } catch (error) {
                console.error('Error fetching form data:', error);
                setSubmitError('Failed to load form data. Please refresh the page.');
            }
        };

        fetchFormData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // Create the payload in the format the API expects
            const payload = {
                model: { ...formData }, // Wrap the form data in a "model" property
                productCategories: productCategories // Add the product categories with the correct structure
            };

            const response = await axios.post('https://localhost:44373/api/repairs', payload);

            if (response.data.success) {
                setSubmitSuccess(true);
                setRequestId(response.data.data.requestId);
                // Reset form
                setFormData({
                    customerId: 0,
                    customerName: '',
                    customerEmail: '',
                    customerPhone: '',
                    customerAddress: '',
                    serviceTypeId: 0,
                    serviceCenterId: 0,
                    productId: 0,
                    serialNumber: '',
                    issueDescription: '',
                    additionalNotes: '',
                    isWarrantyRepair: false,
                    serviceTypeList: formData.serviceTypeList,
                    serviceCenterList: formData.serviceCenterList
                });
            } else {
                setSubmitError(response.data.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Error submitting repair request:', error);

            if (error.response?.data?.errors) {
                const errorMessages = [];

                // Extract error messages from the response
                Object.entries(error.response.data.errors).forEach(([key, messages]) => {
                    messages.forEach(message => {
                        errorMessages.push(`${key}: ${message}`);
                    });
                });

                setSubmitError(errorMessages.join(', '));
            } else {
                setSubmitError(error.response?.data?.message || 'An error occurred while submitting your request');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h2 className="h4 mb-0">Electronics Repair Request</h2>
                        </div>

                        <div className="card-body">
                            {submitSuccess ? (
                                <div className="alert alert-success">
                                    <h4>Thank you for your repair request!</h4>
                                    <p>Your request has been submitted successfully. Your repair request ID is: <strong>{requestId}</strong></p>
                                    <p>We will contact you shortly with further details.</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setSubmitSuccess(false)}
                                    >
                                        Submit Another Request
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    {/* Customer Information */}
                                    <h3 className="h5 mb-3">Customer Information</h3>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="customerName" className="form-label">Full Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="customerName"
                                                name="customerName"
                                                value={formData.customerName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="customerEmail" className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="customerEmail"
                                                name="customerEmail"
                                                value={formData.customerEmail}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="customerPhone" className="form-label">Phone Number</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                id="customerPhone"
                                                name="customerPhone"
                                                value={formData.customerPhone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="customerAddress" className="form-label">Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="customerAddress"
                                                name="customerAddress"
                                                value={formData.customerAddress}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <hr className="my-4" />

                                    {/* Service Information */}
                                    <h3 className="h5 mb-3">Service Details</h3>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="serviceTypeId" className="form-label">Service Type</label>
                                            <select
                                                className="form-select"
                                                id="serviceTypeId"
                                                name="serviceTypeId"
                                                value={formData.serviceTypeId}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">Select Service Type</option>
                                                {serviceTypes.map(type => (
                                                    <option key={type.typeId} value={type.typeId}>
                                                        {type.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="serviceCenterId" className="form-label">Service Center</label>
                                            <select
                                                className="form-select"
                                                id="serviceCenterId"
                                                name="serviceCenterId"
                                                value={formData.serviceCenterId}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">Select Service Center</option>
                                                {serviceCenters.map(center => (
                                                    <option key={center.centerId} value={center.centerId}>
                                                        {center.name} - {center.address}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <hr className="my-4" />

                                    {/* Product Information */}
                                    <h3 className="h5 mb-3">Product Information</h3>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="categoryId" className="form-label">Product Brand</label>
                                            <select
                                                className="form-select"
                                                id="categoryId"
                                                onChange={e => setSelectedBrand(e.target.value)}                                                required
                                            >
                                                <option value="">Select Brand</option>
                                                {brands.map(brand => (
                                                    <option key={brand} value={brand}>
                                                        {brand}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="productId" className="form-label">Product ID</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="productId"
                                                name="productId"
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="serialNumber" className="form-label">Serial Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="serialNumber"
                                            name="serialNumber"
                                            value={formData.serialNumber}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="issueDescription" className="form-label">Issue Description</label>
                                        <textarea
                                            className="form-control"
                                            id="issueDescription"
                                            name="issueDescription"
                                            rows="3"
                                            value={formData.issueDescription}
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="additionalNotes" className="form-label">Additional Notes (Optional)</label>
                                        <textarea
                                            className="form-control"
                                            id="additionalNotes"
                                            name="additionalNotes"
                                            rows="2"
                                            value={formData.additionalNotes}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>

                                    <div className="mb-4 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="isWarrantyRepair"
                                            name="isWarrantyRepair"
                                            checked={formData.isWarrantyRepair}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label" htmlFor="isWarrantyRepair">
                                            This is a warranty repair
                                        </label>
                                    </div>

                                    {submitError && (
                                        <div className="alert alert-danger mb-3">
                                            {submitError}
                                        </div>
                                    )}

                                    <div className="d-grid">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Submit Repair Request'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RepairAdminForm;