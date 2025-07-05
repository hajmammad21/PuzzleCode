import React from 'react';
import AdminContactMessages from './AdminContactMessages';
import AdminNotificationPanel from './AdminNotificationPanel';
import './AdminDashboard.css';
import AdminAddMission from './AdminAddMission';

const AdminDashboard = ({ user }) => (
  <div className="dashboard-main">
    <div className="admin-dashboard-grid">
      <AdminContactMessages />
      <AdminNotificationPanel />
      <AdminAddMission />
    </div>
  </div>
);

export default AdminDashboard;