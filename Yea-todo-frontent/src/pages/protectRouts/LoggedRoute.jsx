import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function LoggedRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
        setIsChecking(false);
    }, []);

    // Show nothing while checking
    if (isChecking) {
        return null;
    }

    // Not logged in → redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Logged in → render the child routes
    return <Outlet />;
}

export default LoggedRoute;
