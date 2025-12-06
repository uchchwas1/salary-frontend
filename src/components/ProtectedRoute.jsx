import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    
    // This prevents "flashing" the login page before the user is authenticated
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    
    if (!user) {
        // 'state' saves the current location so we can send them back there after login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    
    return children;
};

export default ProtectedRoute;