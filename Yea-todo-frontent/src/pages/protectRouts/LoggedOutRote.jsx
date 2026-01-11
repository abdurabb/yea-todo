import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function LoggedOutRote() {
    const user = localStorage.getItem('token');

    if (!user) {
        // No token → user is logged out → render nested routes (login/signup)
        return <Outlet />;
    } else {
        // User is logged in → redirect to dashboard/home
        return <Navigate to="/" replace />;
    }
}

export default LoggedOutRote;
