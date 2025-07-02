import React from 'react';
import ChangePasswordForm from './ChangePassword';
import NotificationSection from '../NotificationSection/NotificationSection';

const UserDashboard = ({ user, showToast }) => {
  return (
    <div style={{ padding: 24 }}>
      <h1>داشبورد کاربر</h1>
      <p>خوش آمدید، {user.username}!</p>
      <p>ایمیل: {user.email}</p>

      {/* Notification section */}
      <NotificationSection />

      {/* Change password form */}
      <ChangePasswordForm showToast={showToast} />
    </div>
  );
};

export default UserDashboard;
