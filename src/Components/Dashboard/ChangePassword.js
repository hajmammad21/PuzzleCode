import React, { useState } from 'react';

const ChangePasswordForm = ({ onSuccess, onError }) => {
  const [form, setForm] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.old_password || !form.new_password) {
      onError && onError('رمزهای عبور را وارد کنید', 'error');
      return;
    }
    if (form.new_password !== form.confirm_password) {
      onError && onError('رمز جدید و تکرار آن یکسان نیستند', 'error');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          old_password: form.old_password,
          new_password: form.new_password
        })
      });

      const data = await response.json();
      if (response.ok) {
        onSuccess && onSuccess(data.message || 'رمز عبور با موفقیت تغییر کرد', 'success');
        setForm({ old_password: '', new_password: '', confirm_password: '' });
      } else {
        onError && onError(data.message || 'خطا در تغییر رمز عبور', 'error');
      }
    } catch (err) {
      onError && onError('خطای شبکه', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, marginTop: 32 }}>
      <h3>تغییر رمز عبور</h3>
      <div>
        <label>رمز عبور فعلی</label>
        <input
          type="password"
          name="old_password"
          value={form.old_password}
          onChange={handleChange}
          disabled={loading}
          style={{ width: '100%', marginBottom: 8 }}
        />
      </div>
      <div>
        <label>رمز عبور جدید</label>
        <input
          type="password"
          name="new_password"
          value={form.new_password}
          onChange={handleChange}
          disabled={loading}
          style={{ width: '100%', marginBottom: 8 }}
        />
      </div>
      <div>
        <label>تکرار رمز جدید</label>
        <input
          type="password"
          name="confirm_password"
          value={form.confirm_password}
          onChange={handleChange}
          disabled={loading}
          style={{ width: '100%', marginBottom: 8 }}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'در حال تغییر...' : 'تغییر رمز عبور'}
      </button>
    </form>
  );
};

export default ChangePasswordForm;
