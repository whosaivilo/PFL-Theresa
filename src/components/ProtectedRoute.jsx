import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { session, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Jika tidak ada session (belum login), redirect ke login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Jika session ada tapi route ini dibatasi untuk role tertentu
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/error-403" replace />;
  }

  // Jika lolos semua check, render children routes
  return <Outlet />;
}
