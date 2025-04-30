import React, { useState, useEffect } from 'react';
import { FaSearch, FaPhoneAlt, FaEnvelope, FaCalendarAlt, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { MdDescription, MdSubject } from 'react-icons/md';
import axios from 'axios';

const Inquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedInquiry, setSelectedInquiry] = useState(null);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://localhost:44373/api/contact');
            
            // Ensure we're setting an array to state
            const data = Array.isArray(response.data.data) ? response.data.data : [];
            setInquiries(data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch inquiries:', err);
            setError('Failed to load inquiries. Please try again.');
            // Make sure inquiries is reset to an empty array on error
            setInquiries([]);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (submissionId) => {
        try {
            const inquiry = inquiries.find(item => item.submissionId === submissionId);
            const updatedStatus = !inquiry.isHandled;

            const response = await axios.put(`https://localhost:44373/api/contact/${submissionId}/status`, {
                isHandled: updatedStatus // Fixed to use the updated status variable
            });

            setInquiries(inquiries.map(item =>
                item.submissionId === submissionId
                    ? { ...item, isHandled: updatedStatus }
                    : item
            ));

            if (selectedInquiry && selectedInquiry.submissionId === submissionId) {
                setSelectedInquiry({ ...selectedInquiry, isHandled: updatedStatus });
            }
        } catch (err) {
            console.error('Failed to update inquiry status:', err);
            setError('Failed to update status. Please try again.');
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectInquiry = (inquiry) => {
        setSelectedInquiry(inquiry === selectedInquiry ? null : inquiry);
    };

    // Ensure we're working with an array before filtering
    const filteredInquiries = Array.isArray(inquiries) ? inquiries.filter(inquiry => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            inquiry.name?.toLowerCase().includes(searchTermLower) ||
            inquiry.email?.toLowerCase().includes(searchTermLower) ||
            inquiry.phone?.toLowerCase().includes(searchTermLower) ||
            inquiry.subject?.toLowerCase().includes(searchTermLower) ||
            inquiry.message?.toLowerCase().includes(searchTermLower)
        );
    }) : [];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    if (loading) {
        return (
            <div className="text-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="row mb-4">
                <div className="col">
                    <h2 className="h4">Repair Inquiries</h2>
                    <p className="text-muted">Manage and respond to customer repair inquiries</p>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col">
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaSearch />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search inquiries..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </div>

            {filteredInquiries.length === 0 ? (
                <div className="alert alert-info">
                    No inquiries found. {searchTerm && 'Try adjusting your search.'}
                </div>
            ) : (
                <div className="row">
                    <div className={selectedInquiry ? "col-md-7" : "col-12"}>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead className="table-light">
                                    <tr>
                                        <th>Name</th>
                                        <th>Subject</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredInquiries.map(inquiry => (
                                        <tr
                                            key={inquiry.submissionId}
                                            className={selectedInquiry && selectedInquiry.submissionId === inquiry.submissionId ? 'table-active' : ''}
                                            onClick={() => handleSelectInquiry(inquiry)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <td>{inquiry.name}</td>
                                            <td>
                                                <div className="text-truncate" style={{ maxWidth: '150px' }}>
                                                    {inquiry.subject}
                                                </div>
                                            </td>
                                            <td><small>{formatDate(inquiry.submissionDate)}</small></td>
                                            <td>
                                                <span className={`badge ${inquiry.isHandled ? 'bg-success' : 'bg-warning'}`}>
                                                    {inquiry.isHandled ? 'Handled' : 'Pending'}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className={`btn btn-sm ${inquiry.isHandled ? 'btn-outline-secondary' : 'btn-outline-success'} me-2`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleToggleStatus(inquiry.submissionId);
                                                    }}
                                                    title={inquiry.isHandled ? "Mark as Pending" : "Mark as Handled"}
                                                >
                                                    {inquiry.isHandled ? <FaTimes /> : <FaCheck />}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {selectedInquiry && (
                        <div className="col-md-5">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Inquiry Details</h5>
                                    <button
                                        className="btn-close"
                                        onClick={() => setSelectedInquiry(null)}
                                    ></button>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{selectedInquiry.name}</h5>

                                    <div className="mb-3">
                                        <div className="d-flex align-items-center mb-2">
                                            <FaEnvelope className="me-2 text-muted" />
                                            <a href={`mailto:${selectedInquiry.email}`}>{selectedInquiry.email}</a>
                                        </div>

                                        {selectedInquiry.phone && (
                                            <div className="d-flex align-items-center mb-2">
                                                <FaPhoneAlt className="me-2 text-muted" />
                                                <a href={`tel:${selectedInquiry.phone}`}>{selectedInquiry.phone}</a>
                                            </div>
                                        )}

                                        <div className="d-flex align-items-center mb-2">
                                            <MdSubject className="me-2 text-muted" />
                                            <span>{selectedInquiry.subject}</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3">
                                            <FaCalendarAlt className="me-2 text-muted" />
                                            <span>{formatDate(selectedInquiry.submissionDate)}</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3">
                                            <span className={`badge ${selectedInquiry.isHandled ? 'bg-success' : 'bg-warning'} me-2`}>
                                                {selectedInquiry.isHandled ? 'Handled' : 'Pending'}
                                            </span>
                                            <button
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => handleToggleStatus(selectedInquiry.submissionId)}
                                            >
                                                {selectedInquiry.isHandled ? 'Mark as Pending' : 'Mark as Handled'}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="d-flex align-items-center mb-2">
                                            <MdDescription className="me-2 text-muted" />
                                            <strong>Message</strong>
                                        </div>
                                        <p className="border rounded p-3 bg-light">{selectedInquiry.message}</p>
                                    </div>

                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-primary me-2">
                                            <FaEnvelope className="me-1" /> Reply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Inquiries;