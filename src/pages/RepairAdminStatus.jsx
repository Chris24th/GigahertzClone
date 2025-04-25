import React, { useEffect, useState } from 'react';
import axios from 'axios';


const RepairAdminStatus = () => {

    const [repairs, setRepairs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRepair, setSelectedRepair] = useState(null);
    const [statusUpdateForm, setStatusUpdateForm] = useState({
        technicianId: 0,
        status: '',
        partsUsed: '',
        partsCost: 0,
        notes: ''
    });
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [filter, setFilter] = useState('all');

    // Status options
    const statusOptions = [
        'Submitted',
        'Diagnosed',
        'In Progress',
        'Parts Ordered',
        'Waiting for Approval',
        'Completed',
        'Ready for Pickup',
        'Cancelled'
    ];

    useEffect(() => {
        fetchRepairs();
    }, []);

    const fetchRepairs = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('https://localhost:44373/api/repairs');

            if (response.data.success) {
                setRepairs(response.data.data);
            } else {
                setError(response.data.message || 'Failed to fetch repair requests');
            }
        } catch (error) {
            console.error('Error fetching repairs:', error);
            setError(error.response?.data?.message || 'An error occurred while fetching repair requests');
        } finally {
            setLoading(false);
        }
    };

    const fetchRepairDetails = async (repairId) => {
        try {
            const response = await axios.get(`https://localhost:44373/api/repairs/${repairId}`);

            if (response.data.success) {
                setSelectedRepair(response.data.data);
                return response.data.data;
            } else {
                setError(response.data.message || 'Failed to fetch repair details');
                return null;
            }
        } catch (error) {
            console.error('Error fetching repair details:', error);
            setError(error.response?.data?.message || 'An error occurred while fetching repair details');
            return null;
        }
    };

    const handleSelectRepair = async (repairId) => {
        const repair = await fetchRepairDetails(repairId);
        if (repair) {
            setSelectedRepair(repair);
            // Reset the status update form
            setStatusUpdateForm({
                technicianId: 0,
                status: '',
                partsUsed: '',
                partsCost: 0,
                notes: ''
            });
            setUpdateSuccess(false);
        }
    };

    const handleStatusFormChange = (e) => {
        const { name, value } = e.target;
        setStatusUpdateForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitStatusUpdate = async (e) => {
        e.preventDefault();
        setUpdateSuccess(false);

        if (!statusUpdateForm.status || !statusUpdateForm.partsUsed || !statusUpdateForm.technicianId) {
            setError('Please complete all fields');
            return;
        }

        try {
            const response = await axios.post(
                `https://localhost:44373/api/repairs/status/${selectedRepair.requestId}`,
                statusUpdateForm
            );

            if (response.data.success) {
                setUpdateSuccess(true);
                // Refresh the repair details to show updated status
                await fetchRepairDetails(selectedRepair.requestId);
                // Refresh the repairs list to update the status in the list
                fetchRepairs();
                // Reset form
                setStatusUpdateForm({
                    technicianId: 0,
                    status: '',
                    partsUsed: '',
                    partsCost: '',
                    notes: ''
                });
            } else {
                setError(response.data.message || 'Failed to update status');
            }
        } catch (error) {
            console.error('Error updating repair status:', error);
            setError(error.response?.data?.message || 'An error occurred while updating status');
        }
    };

    const getCurrentStatus = (repair) => {
        if (repair.statusUpdates && repair.statusUpdates.length > 0) {
            return repair.statusUpdates[repair.statusUpdates.length - 1].status;
        }
        return 'Unknown';
    };

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
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

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const filteredRepairs = repairs.filter(repair => {
        if (filter === 'all') return true;

        // Get the current status of the repair
        const currentStatus = repair.statusUpdates && repair.statusUpdates.length > 0
            ? repair.statusUpdates[repair.statusUpdates.length - 1].status.toLowerCase()
            : 'unknown';

        if (filter === 'active') {
            return !['completed', 'cancelled', 'ready for pickup'].includes(currentStatus);
        } else if (filter === 'completed') {
            return ['completed', 'ready for pickup'].includes(currentStatus);
        } else if (filter === 'cancelled') {
            return currentStatus === 'cancelled';
        }

        return true;
    });

    return (
        <div className="row">
            <div className="col-xxl-4">
                <div className="card shadow mb-4">
                    <div className="card-header d-flex flex-column justify-content-between align-items-center">
                        <h2 className="h5 mb-2">Repair Requests</h2>
                        <div className="btn-group">
                            <button
                                className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setFilter('all')}
                            >
                                All
                            </button>
                            <button
                                className={`btn btn-sm ${filter === 'active' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setFilter('active')}
                            >
                                Active
                            </button>
                            <button
                                className={`btn btn-sm ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setFilter('completed')}
                            >
                                Completed
                            </button>
                            <button
                                className={`btn btn-sm ${filter === 'cancelled' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setFilter('cancelled')}
                            >
                                Cancelled
                            </button>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-2">Loading repair requests...</p>
                            </div>
                        ) : error ? (
                            <div className="alert alert-danger m-3">
                                {error}
                            </div>
                        ) : filteredRepairs.length === 0 ? (
                            <div className="text-center py-5">
                                <p className="mb-0">No repair requests found</p>
                            </div>
                        ) : (
                            <div className="list-group list-group-flush">
                                {filteredRepairs.map(repair => (
                                    <button
                                        key={repair.requestId}
                                        className={`list-group-item list-group-item-action ${selectedRepair?.requestId === repair.requestId ? 'active' : ''}`}
                                        onClick={() => handleSelectRepair(repair.requestId)}
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5 className="mb-1">
                                                    Request #{repair.requestId} - {repair.customer.name}
                                                </h5>
                                                <p className="mb-1 small">
                                                    {repair.model || 'Unknown Product'} |
                                                    S/N: {repair.serialNumber}
                                                </p>
                                                <small>
                                                    Submitted: {formatDate(repair.requestDate)}
                                                </small>
                                            </div>
                                            <span className={`badge ${getStatusClass(getCurrentStatus(repair))}`}>
                                                {getCurrentStatus(repair)}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="card-footer">
                        <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={fetchRepairs}
                            disabled={loading}
                        >
                            <i className="bi bi-arrow-clockwise me-1"></i>
                            Refresh
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-xxl-8">
                {selectedRepair ? (
                    <div className="card shadow">
                        <div className="card-header">
                            <h2 className="h5 mb-0">
                                Repair Details - Request #{selectedRepair.requestId}
                            </h2>
                        </div>
                        <div className="card-body">
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <h3 className="h6">Customer Information</h3>
                                    <p className="mb-1"><strong>Name:</strong> {selectedRepair.customer.name}</p>
                                    <p className="mb-1"><strong>Email:</strong> {selectedRepair.customer.email}</p>
                                    <p className="mb-1"><strong>Phone:</strong> {selectedRepair.customer.phone}</p>
                                    <p className="mb-0"><strong>Address:</strong> {selectedRepair.customer.address}</p>
                                </div>
                                <div className="col-md-6">
                                    <h3 className="h6">Repair Information</h3>
                                    <p className="mb-1"><strong>Date:</strong> {formatDate(selectedRepair.requestDate)}</p>
                                    <p className="mb-1"><strong>Service Type:</strong> {selectedRepair.serviceType?.name || 'N/A'}</p>
                                    <p className="mb-1"><strong>Service Center:</strong> {selectedRepair.serviceCenter?.name || 'N/A'}</p>
                                    <p className="mb-0">
                                        <strong>Warranty Repair:</strong>
                                        {selectedRepair.isWarrantyRepair ? 'Yes' : 'No'}
                                    </p>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <h3 className="h6">Product Information</h3>
                                    <p className="mb-1"><strong>Model:</strong> {selectedRepair.model || 'N/A'}</p>
                                    <p className="mb-0"><strong>Serial Number:</strong> {selectedRepair.serialNumber}</p>
                                </div>
                                <div className="col-md-6">
                                    <h3 className="h6">Issue Details</h3>
                                    <p className="mb-1">{selectedRepair.issueDescription}</p>
                                    {selectedRepair.additionalNotes && (
                                        <p className="mb-0 small text-muted">
                                            <strong>Additional Notes:</strong> {selectedRepair.additionalNotes}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <hr className="my-4" />

                            <h3 className="h5 mb-3">Status History</h3>
                            {selectedRepair.statusUpdates && selectedRepair.statusUpdates.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-sm table-striped">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Status</th>
                                                <th>Parts Used</th>
                                                <th>Parts Cost</th>
                                                <th>Technician</th>
                                                <th>Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedRepair.statusUpdates.map(status => (
                                                <tr key={status.statusId}>
                                                    <td>{formatDate(status.updatedDate)}</td>
                                                    <td>
                                                        <span className={`badge ${getStatusClass(status.status)}`}>
                                                            {status.status}
                                                        </span>
                                                    </td>
                                                    <td>{status.partsUsed}</td>
                                                    <td>{status.partsCost}</td>
                                                    <td>{status.technician?.name || 'N/A'}</td>
                                                    <td>{status.notes}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-muted">No status updates found</p>
                            )}

                            <hr className="my-4" />

                            <h3 className="h5 mb-3">Update Status</h3>
                            <form onSubmit={handleSubmitStatusUpdate}>
                                {updateSuccess && (
                                    <div className="alert alert-success mb-3">
                                        Status updated successfully!
                                    </div>
                                )}

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="status" className="form-label">New Status</label>
                                        <select
                                            className="form-select"
                                            id="status"
                                            name="status"
                                            value={statusUpdateForm.status}
                                            onChange={handleStatusFormChange}
                                            required
                                        >
                                            <option value="">Select Status</option>
                                            {statusOptions.map(option => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>


                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="notes" className="form-label">Parts Used</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="partsUsed"
                                            name="partsUsed"
                                            value={statusUpdateForm.partsUsed}
                                            onChange={handleStatusFormChange}
                                            placeholder="Enter Parts Used"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="notes" className="form-label">Parts Cost</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="partsCost"
                                            name="partsCost"
                                            value={statusUpdateForm.partsCost}
                                            onChange={handleStatusFormChange}
                                            placeholder="Enter Parts Cost"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="notes" className="form-label">Technician ID</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="technicianId"
                                            name="technicianId"
                                            value={statusUpdateForm.technicianId}
                                            onChange={handleStatusFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="notes" className="form-label">Notes</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="notes"
                                            name="notes"
                                            value={statusUpdateForm.notes}
                                            onChange={handleStatusFormChange}
                                            placeholder="Enter status notes"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Update Status
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="card shadow">
                        <div className="card-body py-5 text-center">
                            <p className="mb-0">Select a repair request to view details</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RepairAdminStatus;