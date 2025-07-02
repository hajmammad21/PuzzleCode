import React, { useEffect, useState } from 'react';

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const perPage = 10;

  useEffect(() => {
    let abort = false;
    const fetchMessages = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/contact/messages?page=${page}&per_page=${perPage}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok && !abort) {
        const data = await res.json();
        setMessages(data.messages);
        setPages(data.pages);
        setTotal(data.total);
      }
      setLoading(false);
    };
    fetchMessages();
    return () => { abort = true; };
  }, [page]);

  const deleteMessage = async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/contact/messages/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      setMessages(prev => prev.filter(m => m.id !== id));
    }
  };

  // Pagination controls
  const goToPage = (num) => {
    if (num >= 1 && num <= pages) setPage(num);
  };

  return (
    <div className="admin-contact-messages card" style={{ marginTop: 32 }}>
      <h2>پیام‌های تماس با ما</h2>
      {loading && <div>در حال بارگذاری...</div>}
      {!loading && messages.length === 0 && <div>پیامی ثبت نشده است.</div>}
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {messages.map(msg => (
          <li
            key={msg.id}
            style={{
              marginBottom: 18,
              padding: '16px 12px',
              background: msg.is_read ? '#21243a' : '#29295e',
              borderRadius: 10,
              opacity: msg.is_read ? 0.7 : 1,
              border: msg.is_read ? '1px solid #2afadf22' : '2px solid #64ffda'
            }}
          >
            <div><b>نام:</b> {msg.name}</div>
            <div><b>ایمیل:</b> {msg.email}</div>
            <div><b>پیام:</b> {msg.message}</div>
            <div style={{ fontSize: 12, color: '#aaa', marginTop: 4 }}>
              {new Date(msg.created_at).toLocaleString('fa-IR')}
            </div>
            <button
              onClick={() => deleteMessage(msg.id)}
              style={{
                marginTop: 10,
                padding: '6px 20px',
                background: 'linear-gradient(90deg,#64ffda 0%,#4fc3f7 100%)',
                border: 'none',
                borderRadius: 6,
                fontWeight: 700,
                color: '#111',
                cursor: 'pointer'
              }}
            >
              حذف
            </button>
          </li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div className="pagination-controls" style={{ textAlign: 'center', marginTop: 16 }}>
        <button onClick={() => goToPage(page - 1)} disabled={page <= 1}>قبلی</button>
        {[...Array(pages)].map((_, idx) => (
          <button
            key={idx + 1}
            className={page === idx + 1 ? 'active' : ''}
            style={{
              fontWeight: page === idx + 1 ? 900 : 500,
              background: page === idx + 1 ? '#64ffda' : undefined,
              color: page === idx + 1 ? '#16161e' : undefined,
              borderRadius: 5,
              margin: '0 2px'
            }}
            onClick={() => goToPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
        <button onClick={() => goToPage(page + 1)} disabled={page >= pages}>بعدی</button>
        <div style={{ fontSize: 13, color: '#aaa', marginTop: 4 }}>
          صفحه {page} از {pages} &ndash; مجموع: {total}
        </div>
      </div>
    </div>
  );
};

export default AdminContactMessages;
