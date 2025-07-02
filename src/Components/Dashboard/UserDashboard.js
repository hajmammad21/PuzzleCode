import React, { useState, useEffect } from 'react';
import ChangePasswordForm from './ChangePassword';
import NotificationSection from '../NotificationSection/NotificationSection';
import './UserDashboard.css';

const UserDashboard = ({ user, showToast }) => {
  const [toasts, setToasts] = useState([]);

  // Toast management
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    const newToast = { id, message, type };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Toast success and error handlers for ChangePasswordForm
  const handleToastSuccess = (message) => {
    addToast(message, 'success');
  };

  const handleToastError = (message) => {
    addToast(message, 'error');
  };

  return (
    <div className="dashboard-main">
      {/* Toast notifications */}
      {toasts.map(toast => (
        <div 
          key={toast.id} 
          className={`toast ${toast.type}`}
          onClick={() => removeToast(toast.id)}
          style={{ cursor: 'pointer' }}
        >
          {toast.message}
        </div>
      ))}

      <div className="dashboard-grid" style={{ marginTop: 32 }}>
        <div className="card">
          <NotificationSection />
        </div>
        <div className="card">
          <ChangePasswordForm 
            showToast={showToast}
            onSuccess={handleToastSuccess}
            onError={handleToastError}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;