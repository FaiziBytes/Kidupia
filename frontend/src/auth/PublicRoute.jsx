import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = ({ redirectPath = '/', children }) => {
  const token = localStorage.getItem('token');
  if (token) return <Navigate to={redirectPath} replace />;
  return children ?? <Outlet />;
};

export default PublicRoute;