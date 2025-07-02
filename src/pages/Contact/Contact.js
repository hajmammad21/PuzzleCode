import React, { useState, useEffect } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [fieldStates, setFieldStates] = useState({
    name: { focused: false, filled: false },
    email: { focused: false, filled: false },
    message: { focused: false, filled: false }
  });

  // Toast state
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Math captcha states
  const [num1] = useState(() => Math.floor(Math.random() * 10 + 1));
  const [num2] = useState(() => Math.floor(Math.random() * 10 + 1));
  const [captcha, setCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [captchaFocused, setCaptchaFocused] = useState(false);

  // Toast functions
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    // Auto hide after 5 seconds
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 5000);
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: '' });
  };

  // Update field states when form values change
  useEffect(() => {
    setFieldStates({
      name: { 
        focused: fieldStates.name.focused, 
        filled: form.name.trim() !== '' 
      },
      email: { 
        focused: fieldStates.email.focused, 
        filled: form.email.trim() !== '' 
      },
      message: { 
        focused: fieldStates.message.focused, 
        filled: form.message.trim() !== '' 
      }
    });
  }, [form.name, form.email, form.message]);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFocus = (fieldName) => {
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: { ...prev[fieldName], focused: true }
    }));
  };

  const handleBlur = (fieldName) => {
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: { ...prev[fieldName], focused: false }
    }));
  };

  const handleCaptchaChange = (e) => {
    setCaptcha(e.target.value);
    setCaptchaError('');
  };

  const handleCaptchaFocus = () => {
    setCaptchaFocused(true);
  };

  const handleCaptchaBlur = () => {
    setCaptchaFocused(false);
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      showToast('لطفاً نام خود را وارد کنید.', 'error');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      showToast('لطفاً ایمیل معتبر وارد کنید.', 'error');
      return false;
    }
    
    if (!form.message.trim()) {
      showToast('لطفاً پیام خود را وارد کنید.', 'error');
      return false;
    }
    
    if (form.message.trim().length < 10) {
      showToast('پیام باید حداقل ۱۰ کاراکتر باشد.', 'error');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form first
    if (!validateForm()) return;

    // Math captcha validation
    if (parseInt(captcha, 10) !== num1 + num2) {
      setCaptchaError('جواب جمع صحیح نیست.');
      showToast('لطفاً سوال امنیتی را به درستی پاسخ دهید.', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showToast(
          data.message || 'پیام شما با موفقیت ارسال شد! به زودی با شما تماس خواهیم گرفت.',
          'success'
        );
        setForm({ name: '', email: '', message: '' });
        setCaptcha('');
        setCaptchaError('');
        setFieldStates({
          name: { focused: false, filled: false },
          email: { focused: false, filled: false },
          message: { focused: false, filled: false }
        });
      } else {
        showToast(
          data.message || 'متأسفانه ارسال پیام با خطا مواجه شد. لطفاً دوباره تلاش کنید.',
          'error'
        );
      }
    } catch (err) {
      showToast(
        'ارتباط با سرور برقرار نشد. لطفاً اتصال اینترنت خود را بررسی کنید.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const getInputWrapperClass = (fieldName) => {
    const state = fieldStates[fieldName];
    return `input-wrapper ${state.focused ? 'focused' : ''} ${state.filled ? 'filled' : ''}`;
  };

  const Toast = ({ message, type, show, onClose }) => {
    if (!show) return null;
    
    return (
      <div className={`toast ${type} ${show ? 'show' : ''}`}>
        <div className="toast-content">
          <div className="toast-icon">
            {type === 'success' ? '✅' : '❌'}
          </div>
          <div className="toast-message">{message}</div>
          <button className="toast-close" onClick={onClose}>×</button>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Toast Container */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        show={toast.show} 
        onClose={hideToast} 
      />

      <div className="contact-layout">
        {/* Left: Contact Form */}
        <div className="contact-left">
          <h2>تماس با ما</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className={getInputWrapperClass('name')}>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  required
                  disabled={loading}
                  autoComplete="name"
                />
                <label>نام و نام خانوادگی</label>
              </div>
            </div>
            
            <div className="form-group">
              <div className={getInputWrapperClass('email')}>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  required
                  disabled={loading}
                  autoComplete="email"
                />
                <label>آدرس ایمیل</label>
              </div>
            </div>
            
            <div className="form-group">
              <div className={getInputWrapperClass('message')}>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                  required
                  rows={5}
                  disabled={loading}
                />
                <label>متن پیام شما</label>
              </div>
            </div>
            
            <div className="form-group">
              <div className="captcha-wrapper">
                <div className="captcha-question">
                  سوال امنیتی: {num1} + {num2} = ؟
                </div>
                <div className={`input-wrapper ${captchaFocused ? 'focused' : ''} ${captcha ? 'filled' : ''}`}>
                  <input
                    type="number"
                    value={captcha}
                    onChange={handleCaptchaChange}
                    onFocus={handleCaptchaFocus}
                    onBlur={handleCaptchaBlur}
                    required
                    disabled={loading}
                    className="captcha-input"
                    placeholder="جواب را وارد کنید"
                    min="0"
                    max="20"
                  />
                </div>
                {captchaError && (
                  <div className="captcha-error">
                    {captchaError}
                  </div>
                )}
              </div>
            </div>
            
            <button type="submit" disabled={loading}>
              {loading ? (
                <>
                  در حال ارسال<span className="loading-dots"></span>
                </>
              ) : (
                'ارسال پیام'
              )}
            </button>
          </form>
        </div>

        {/* Right: Info Boxes */}
        <div className="contact-right">
          {/* Company Info */}
          <div className="info-box">
            <h3>راه‌های ارتباطی</h3>
            <ul>
              <li>
                <span role="img" aria-label="email">📧</span>
                <a href="mailto:support@example.com">support@example.com</a>
              </li>
              <li>
                <span role="img" aria-label="phone">📞</span>
                <a href="tel:+989121234567">0912-123-4567</a>
              </li>
              <li>
                <span role="img" aria-label="instagram">📸</span>
                <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer">
                  صفحه اینستاگرام
                </a>
              </li>
              <li>
                <span role="img" aria-label="telegram">📣</span>
                <a href="https://t.me/yourchannel" target="_blank" rel="noopener noreferrer">
                  کانال تلگرام
                </a>
              </li>
            </ul>
          </div>
          
          {/* Working Hours */}
          <div className="info-box">
            <h3>ساعات پاسخگویی</h3>
            <p>
              <strong>شنبه تا چهارشنبه:</strong> ۹:۰۰ تا ۱۸:۰۰<br />
              <strong>پنج‌شنبه:</strong> ۹:۰۰ تا ۱۴:۰۰<br />
              <strong>جمعه:</strong> تعطیل
            </p>
          </div>
          
          {/* Privacy Note */}
          <div className="info-box">
            <h3>حفظ حریم خصوصی</h3>
            <p>
              تمامی اطلاعات ارسالی شما کاملاً محرمانه بوده و تنها برای پاسخگویی بهتر به درخواست شما استفاده خواهد شد.
            </p>
          </div>
          
          {/* Response Time */}
          <div className="info-box">
            <h3>زمان پاسخگویی</h3>
            <p>
              پاسخ به پیام‌های شما معمولاً <strong>کمتر از ۲۴ ساعت</strong> داده می‌شود. در روزهای تعطیل ممکن است این زمان تا ۴۸ ساعت افزایش یابد.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;