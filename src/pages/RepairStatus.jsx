import { useState, useEffect } from 'react';
import axios from 'axios';

const RepairStatus = () => {
    const [requestId, setRequestId] = useState('');
    const [repairRequest, setRepairRequest] = useState(null);
    const [statusUpdates, setStatusUpdates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchPerformed, setSearchPerformed] = useState(false);

    const handleRequestIdChange = (e) => {
        setRequestId(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!requestId || isNaN(parseInt(requestId))) {
            setError('Please enter a valid request ID');
            return;
        }

        setLoading(true);
        setError(null);
        setSearchPerformed(true);

        try {
            // Get repair request details
            const requestResponse = await axios.get(`https://localhost:44373/api/repairs/${requestId}`);

            if (requestResponse.data.success) {
                setRepairRequest(requestResponse.data.data);

                // Get status updates
                const statusResponse = await axios.get(`https://localhost:44373/api/repairs/status/${requestId}`);

                if (statusResponse.data.success) {
                    setStatusUpdates(statusResponse.data.data);
                } else {
                    setStatusUpdates([]);
                }
            } else {
                setError(requestResponse.data.message || 'Request not found');
                setRepairRequest(null);
                setStatusUpdates([]);
            }
        } catch (error) {
            console.error('Error fetching repair status:', error);
            setError(error.response?.data?.message || 'Failed to retrieve repair information');
            setRepairRequest(null);
            setStatusUpdates([]);
        } finally {
            setLoading(false);
        }
    };

    // Get current status from status updates
    const getCurrentStatus = () => {
        if (statusUpdates && statusUpdates.length > 0) {
            return statusUpdates[0].status;
        }
        return 'Unknown';
    };

    // Get status class for timeline
    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'submitted':
                return 'bg-info';
            case 'diagnosed':
                return 'bg-primary';
            case 'in progress':
                return 'bg-warning';
            case 'parts ordered':
                return 'bg-secondary';
            case 'waiting for approval':
                return 'bg-dark';
            case 'completed':
                return 'bg-success';
            case 'ready for pickup':
                return 'bg-success';
            case 'cancelled':
                return 'bg-danger';
            default:
                return 'bg-secondary';
        }
    };

    // Calculate estimated progress percentage
    const calculateProgress = () => {
        const statusWeights = {
            'submitted': 10,
            'diagnosed': 30,
            'in progress': 50,
            'parts ordered': 60,
            'waiting for approval': 70,
            'completed': 90,
            'ready for pickup': 100,
            'cancelled': 100
        };

        const currentStatus = getCurrentStatus().toLowerCase();
        return statusWeights[currentStatus] || 0;
    };

    // Format date
    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className="card shadow">
                        <div className="card-header bg-blue text-white">
                            <h2 className="h4 mb-0">Track Your Repair Status</h2>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSearch} className="mb-4">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your repair request ID"
                                        value={requestId}
                                        onChange={handleRequestIdChange}
                                        required
                                    />
                                    <button className="btn btn-primary" type="submit" disabled={loading}>
                                        {loading ? 'Searching...' : 'Track'}
                                    </button>
                                </div>
                                {error && <div className="text-danger mt-2">{error}</div>}
                            </form>

                            {loading && (
                                <div className="text-center my-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-2">Loading repair information...</p>
                                </div>
                            )}

                            {!loading && searchPerformed && repairRequest && (
                                <div className="repair-details">
                                    <div className="card mb-4">
                                        <div className="card-header bg-light">
                                            <h3 className="h5 mb-0">Repair Request Details</h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <p><strong>Request ID:</strong> #{repairRequest.requestId || 'N/A'}</p>
                                                    <p><strong>Customer ID:</strong> {repairRequest.customerId || 'N/A'}</p>
                                                    <p><strong>Customer:</strong> {repairRequest.customer?.name || 'N/A'}</p>
                                                    <p><strong>Product:</strong> {repairRequest.product?.name || 'N/A'}</p>
                                                    <p><strong>Serial Number:</strong> {repairRequest.serialNumber || 'N/A'}</p>
                                                    <p><strong>Model:</strong> {repairRequest.model || 'N/A'}</p>
                                                    <p><strong>Parts Used:</strong> {repairRequest.partsUsed || 'N/A'}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p><strong>Service Type:</strong> {repairRequest.serviceType?.name || 'N/A'}</p>
                                                    <p><strong>Service Center:</strong> {repairRequest.serviceCenter?.name || 'N/A'}</p>
                                                    <p><strong>Request Date:</strong> {repairRequest.requestDate ? formatDate(repairRequest.requestDate) : 'N/A'}</p>
                                                    <p><strong>Expected Completion Date:</strong> {repairRequest.expectedCompletionDate ? formatDate(repairRequest.expectedCompletionDate) : 'N/A'}</p>
                                                    <p><strong>Warranty Repair:</strong> {repairRequest.isWarrantyRepair ? 'Yes' : 'No'}</p>
                                                    <p><strong>Estimated Cost:</strong> {repairRequest.estimatedCost ? `$${repairRequest.estimatedCost}` : 'N/A'}</p>
                                                    <p><strong>Additional Notes:</strong> {repairRequest.additionalNotes || 'N/A'}</p>
                                                </div>

                                            </div>

                                            <div className="mt-3">
                                                <h4 className="h6">Issue Description:</h4>
                                                <p className="mb-0">{repairRequest.issueDescription}</p>
                                            </div>

                                            {repairRequest.additionalNotes && (
                                                <div className="mt-3">
                                                    <h4 className="h6">Additional Notes:</h4>
                                                    <p className="mb-0">{repairRequest.additionalNotes}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="card mb-4">
                                        <div className="card-header bg-light">
                                            <h3 className="h5 mb-0">Current Status: <span className="badge bg-blue">{getCurrentStatus()}</span></h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="progress mb-3" style={{ height: '25px' }}>
                                                <div
                                                    className="progress-bar progress-bar-striped progress-bar-animated"
                                                    role="progressbar"
                                                    style={{ width: `${calculateProgress()}%` }}
                                                    aria-valuenow={calculateProgress()}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                >
                                                    {calculateProgress()}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header bg-light">
                                            <h3 className="h5 mb-0">Status Timeline</h3>
                                        </div>
                                        <div className="card-body">
                                            {statusUpdates.length > 0 ? (
                                                <div className="timeline">
                                                    {statusUpdates.map((status, index) => (
                                                        <div key={status.statusId} className="timeline-item pb-4 position-relative ms-4">
                                                            <div className={`timeline-marker position-absolute ${getStatusClass(status.status)}`}
                                                                style={{ width: '16px', height: '16px', borderRadius: '50%', left: '-24px', top: '4px' }}>
                                                            </div>
                                                            <div className="card shadow-sm">
                                                                <div className="card-header py-2 d-flex justify-content-between align-items-center">
                                                                    <span className={`badge ${getStatusClass(status.status)}`}>
                                                                        {status.status}
                                                                    </span>
                                                                    <small className="text-muted">{formatDate(status.updatedDate)}</small>
                                                                </div>
                                                                <div className="card-body py-2">
                                                                    {status.notes && (
                                                                        <p className="mb-0">Notes: {status.notes}</p>
                                                                    )}
                                                                    {status.partsUsed && (
                                                                        <p className="small text-muted mt-1 mb-0">
                                                                            <strong>Parts used:</strong> {status.partsUsed}
                                                                        </p>
                                                                    )}
                                                                    {status.partsCost && (
                                                                        <p className="small text-muted mt-1 mb-0">
                                                                            <strong>Parts cost:</strong> {status.partsCost}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {index < statusUpdates.length - 1 && (
                                                                <div className="timeline-connector position-absolute bg-secondary"
                                                                    style={{ width: '2px', top: '20px', bottom: '0', left: '-17px' }}>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-center py-3">No status updates available</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!loading && searchPerformed && !repairRequest && !error && (
                                <div className="alert alert-warning">
                                    No repair request found with ID: {requestId}
                                </div>
                            )}

                            {!searchPerformed && !loading && (
                                <div className="text-center py-5">
                                    <div className="mb-3">
                                        <i className="bi bi-search" style={{ fontSize: '3rem' }}></i>
                                    </div>
                                    <h3 className="h5">Enter your repair request ID to track the status</h3>
                                    <p className="text-muted">
                                        You can find your request ID in the confirmation email you received
                                        after submitting your repair request.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RepairStatus;