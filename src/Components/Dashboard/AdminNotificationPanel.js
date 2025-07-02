import React, { useState } from 'react';

const AdminNotificationPanel = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    setStatus('');
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/admin/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        username: username.trim() ? username : undefined,
        message,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setStatus('اعلان ارسال شد!');
      setUsername('');
      setMessage('');
    } else {
      setStatus(data.message || 'خطا در ارسال اعلان');
    }
  };

  return (
    <div className="card" style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2>ارسال اعلان</h2>
      <form onSubmit={handleSend}>
        <div style={{ marginBottom: 16 }}>
          <label>نام کاربری (اختیاری - اگر خالی باشد به همه ارسال می‌شود)</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="نام کاربری"
            style={{ width: '100%', padding: 10, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>متن اعلان</label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
            placeholder="متن اعلان..."
            style={{ width: '100%', padding: 10, minHeight: 60, marginTop: 4 }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', fontWeight: 600 }}>
          ارسال
        </button>
      </form>
      {status && (
        <div style={{ marginTop: 16, color: status.includes('خطا') ? '#ed4343' : '#29d259' }}>
          {status}
        </div>
      )}
    </div>
  );
};

export default AdminNotificationPanel;
