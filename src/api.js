// src/api.js

export async function fetchWithAuth(url, options = {}) {
  let token = localStorage.getItem('token');
  options.headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
  };

  let response = await fetch(url, options);

  if (response.status === 401) {
    // Try to refresh token
    const refreshToken = localStorage.getItem('refresh_token');
    const refreshRes = await fetch('http://localhost:5000/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    });
    const refreshData = await refreshRes.json();
    if (refreshRes.ok && refreshData.access_token) {
      // Save new token and retry original request
      localStorage.setItem('token', refreshData.access_token);
      options.headers['Authorization'] = `Bearer ${refreshData.access_token}`;
      response = await fetch(url, options);
    } else {
      // Refresh failed, force logout
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
      return;
    }
  }

  return response;
}
