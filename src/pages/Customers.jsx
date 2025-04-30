// CustomerPage.js - Complete single-page component with modal for CRUD operations using pure Bootstrap
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const CustomerPage = () => {
    // State variables
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'
    const [formData, setFormData] = useState({
        customerId: 0,
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    // API URLs
    const API_URL = 'https://localhost:44373/api/customers';

    // Load customers on component mount
    useEffect(() => {
        loadCustomers();
    }, []);

    // Function to load all customers
    const loadCustomers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            setCustomers(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load customers. Please try again.');
            console.error('Error loading customers:', err);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear validation error when field changes
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: null
            });
        }
    };

    // Form validation
    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }

        if (!formData.phone.trim()) {
            errors.phone = 'Phone is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            if (formMode === 'create') {
                const response = await axios.post(API_URL, formData);
                setCustomers([...customers, response.data]);
            } else {
                await axios.put(`${API_URL}/${formData.customerId}`, formData);
                const updatedCustomers = customers.map(c =>
                    c.customerId === formData.customerId ? { ...formData } : c
                );
                setCustomers(updatedCustomers);
            }
            window.location.reload();
            setError(null);
        } catch (err) {
            setError(`Failed to ${formMode === 'create' ? 'create' : 'update'} customer. Please try again.`);
            console.error(`Error ${formMode === 'create' ? 'creating' : 'updating'} customer:`, err);
        }
    };

    // Function to handle customer deletion
    const handleDelete = async (customerId) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await axios.delete(`${API_URL}/${customerId}`);
                setCustomers(customers.filter(c => c.customerId !== customerId));
                setError(null);
            } catch (err) {
                setError('Failed to delete customer. Please try again.');
                console.error('Error deleting customer:', err);
            }
        }
    };

    // Function to open modal for editing
    const handleEdit = (customer) => {
        setFormMode('edit');
        setFormData({ ...customer });
        setShowModal(true);
    };

    // Function to open modal for creating
    const handleCreate = () => {
        setFormMode('create');
        setFormData({
            customerId: 0,
            name: '',
            email: '',
            phone: '',
            address: ''
        });
        setFormErrors({});
        setShowModal(true);
    };

    // Function to close modal
    const handleCloseModal = () => {
        setShowModal(false);
        setFormErrors({});
    };

    // Function to filter customers based on search term
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
    );

    return (
        <div className="container-fluid py-4">
            <div className="row mb-4">
                <div className="col">
                    <h2 className="mb-0">Customer Management</h2>
                    <p className="text-muted">Manage your customer database</p>
                </div>
                <div className="col-auto d-flex align-items-center">
                    <button
                        className="btn btn-primary"
                        onClick={handleCreate}
                        data-bs-toggle="modal"
                        data-bs-target="#customerModal"
                    >
                        <i className="bi bi-plus-circle me-2"></i>Add New Customer
                    </button>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="input-group">
                        <span className="input-group-text bg-light">
                            <i className="bi bi-search"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search customers..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => setSearchTerm('')}
                            >
                                <i className="bi bi-x"></i>
                            </button>
                        )}
                    </div>
                </div>
                <div className="col-md-6 text-md-end mt-3 mt-md-0">
                    <span className="text-muted">
                        Total Customers: <strong>{customers.length}</strong>
                    </span>
                </div>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setError(null)}
                        aria-label="Close"
                    ></button>
                </div>
            )}

            {/* Customer Table */}
            <div className="card shadow-sm">
                <div className="card-body p-0">
                    {loading ? (
                        <div className="text-center p-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-2 text-muted">Loading customers...</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Created</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCustomers.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="text-center py-4">
                                                {searchTerm ? (
                                                    <div>
                                                        <i className="bi bi-search display-6 text-muted"></i>
                                                        <p className="mt-2">No customers found matching "{searchTerm}"</p>
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary"
                                                            onClick={() => setSearchTerm('')}
                                                        >
                                                            Clear Search
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <i className="bi bi-people display-6 text-muted"></i>
                                                        <p className="mt-2">No customers found in the database</p>
                                                        <button
                                                            className="btn btn-sm btn-primary"
                                                            onClick={handleCreate}
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#customerModal"
                                                        >
                                                            Add Your First Customer
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredCustomers.map(customer => (
                                            <tr key={customer.customerId}>
                                                <td>{customer.customerId}</td>
                                                <td>{customer.name}</td>
                                                <td>{customer.email}</td>
                                                <td>{customer.phone}</td>
                                                <td>
                                                    {customer.address?.length > 30
                                                        ? `${customer.address.substring(0, 30)}...`
                                                        : customer.address}
                                                </td>
                                                <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    <div className="d-flex justify-content-end gap-2">
                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={() => handleEdit(customer)}
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#customerModal"
                                                            title="Edit"
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => handleDelete(customer.customerId)}
                                                            title="Delete"
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Customer Form Modal - Using vanilla Bootstrap modal */}
            <div
                className={`modal fade ${showModal ? 'show' : ''}`}
                id="customerModal"
                tabIndex="-1"
                aria-labelledby="customerModalLabel"
                aria-hidden={!showModal}
                style={{ display: showModal ? 'block' : 'none' }}
            >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title" id="customerModalLabel">
                                {formMode === 'create' ? 'Add New Customer' : 'Edit Customer'}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                            ></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="customerName" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                                            id="customerName"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            maxLength="100"
                                            placeholder="Enter customer name"
                                        />
                                        {formErrors.name && (
                                            <div className="invalid-feedback">
                                                {formErrors.name}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="customerEmail" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                                            id="customerEmail"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            maxLength="150"
                                            placeholder="Enter customer email"
                                        />
                                        {formErrors.email && (
                                            <div className="invalid-feedback">
                                                {formErrors.email}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="customerPhone" className="form-label">Phone</label>
                                        <input
                                            type="tel"
                                            className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`}
                                            id="customerPhone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            maxLength="20"
                                            placeholder="Enter customer phone"
                                        />
                                        {formErrors.phone && (
                                            <div className="invalid-feedback">
                                                {formErrors.phone}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="customerAddress" className="form-label">Address</label>
                                        <textarea
                                            className="form-control"
                                            id="customerAddress"
                                            name="address"
                                            rows="3"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            maxLength="255"
                                            placeholder="Enter customer address"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer bg-light">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    {formMode === 'create' ? 'Create Customer' : 'Update Customer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerPage;