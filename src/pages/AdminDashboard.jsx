import { useState, useEffect } from 'react';
import authService from '../authService';
import { useNavigate } from 'react-router-dom';
import RepairAdminStatus from './RepairAdminStatus';
import RepairAdminForm from './RepairAdminForm';

const AdminDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('status');
    const navigate = useNavigate();
    const isAdmin = sessionStorage.getItem('isAdmin');

    useEffect(() => {
        if (!isAdmin) {
            navigate(-1);
        } else {
            checkAuthStatus();
        }
    }, []);

    const checkAuthStatus = async () => {
        try {
            setLoading(true);
            const response = await authService.checkAuthStatus();
            if (!response.isAuthenticated || !response.isAdmin) {
                navigate(-1);
            }
        } catch (error) {
            console.error('Authentication check failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'status':
                return <RepairAdminStatus />;
            case 'form':
                return <RepairAdminForm />;
            default:
                return null;
        }
    };

    return (
        isAdmin &&
        <div className="container-fluid py-4">
            <h1 className="h3 mb-4">Repair Management Dashboard</h1>
            <div className="row">
                <div className="col-md-3 mb-3">
                    <div className="list-group">
                        <button
                            className={`list-group-item list-group-item-action ${activeTab === 'status' ? 'active' : ''}`}
                            onClick={() => setActiveTab('status')}
                        >
                            Status
                        </button>
                        <button
                            className={`list-group-item list-group-item-action ${activeTab === 'form' ? 'active' : ''}`}
                            onClick={() => setActiveTab('form')}
                        >
                            Form
                        </button>
                    </div>
                </div>
                <div className="col-md-9">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};


export default AdminDashboard;