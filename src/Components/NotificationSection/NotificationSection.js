import React, { useEffect, useState } from 'react';

const NotificationSection = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/user/notifications', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setNotifications(data);
        setLoading(false);
      });
  }, []);

  const deleteNotification = async (id) => {
  const token = localStorage.getItem('token');
  await fetch(`http://localhost:5000/api/user/notifications/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  setNotifications(prev => prev.filter(n => n.id !== id));
};

  if (loading) return <div>در حال بارگذاری اعلان‌ها...</div>;

  return (
    <div style={{ marginTop: 32 }}>
      <h3>اعلان‌ها</h3>
      {notifications.length === 0 && <p>اعلانی وجود ندارد.</p>}
      <ul>
        {notifications.map(n => (
          <li key={n.id} style={{ margin: '10px 0', opacity: n.is_read ? 0.6 : 1 }}>
            <span>{n.message}</span>
            <span style={{ marginLeft: 10, fontSize: 12, color: '#888' }}>
              {new Date(n.created_at).toLocaleString()}
            </span>
            {!n.is_read && (
  <button style={{ marginLeft: 15 }} onClick={() => deleteNotification(n.id)}>
    خواندم و حذف کن
  </button>
)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationSection;
