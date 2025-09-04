import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAllowed, children }) => {
  if (!isAllowed) {
    // If not allowed, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If allowed, show the component
  return children;
};

export default ProtectedRoute;