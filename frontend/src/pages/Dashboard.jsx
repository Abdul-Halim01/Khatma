import { useEffect, useState } from 'react';
import api from '../api';

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initializeDashboard = async () => {
            try {
                setLoading(true);
                // You can add API calls here when you have dashboard data endpoints
                setData({ message: 'Welcome to your Dashboard!' });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        initializeDashboard();
    }, []);

    if (loading) {
        return (
            <div className="dashboard-container">
                <h2>Loading...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-container">
                <h2>Error: {error}</h2>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            {data && <p>{data.message}</p>}
        </div>
    );
}

export default Dashboard;
