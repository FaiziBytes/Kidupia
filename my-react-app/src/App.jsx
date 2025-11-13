import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import VerifyGmail from './pages/VerifyGmail';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const isLoggedIn = () => {
    return localStorage.getItem('token') !== null;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn() ? <Home /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/login" element={isLoggedIn() ? <Navigate to="/" /> : <Login />} />
        <Route path="/verify/:token" element={isLoggedIn() ? <Navigate to="/" /> : <VerifyGmail />} />
      </Routes>
    </Router>
  );
};

export default App;