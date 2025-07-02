import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 2000);
  };

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              تماس با <span className="hero-accent">پازل‌کد</span>
            </h1>
            <p className="hero-subtitle">
              ما اینجا هستیم تا به شما کمک کنیم. سوالاتتان را بپرسید و راهنمایی دریافت کنید.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info-section">
              <div className="info-card">
                <h2 className="section-title">اطلاعات تماس</h2>
                <p className="section-description">
                  از طریق راه‌های مختلف می‌توانید با ما در ارتباط باشید
                </p>

                <div className="contact-methods">
                  <div className="contact-method">
                    <div className="method-icon email">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <div className="method-details">
                      <h3>ایمیل</h3>
                      <p>support@puzzlecode.ir</p>
                      <span className="method-time">پاسخ در کمتر از ۲۴ ساعت</span>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon phone">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </div>
                    <div className="method-details">
                      <h3>تلفن پشتیبانی</h3>
                      <p>۰۲۱-۸۸۷۷۶۶۵۵</p>
                      <span className="method-time">شنبه تا چهارشنبه، ۹ تا ۱۷</span>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon location">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <div className="method-details">
                      <h3>آدرس دفتر</h3>
                      <p>تهران، خیابان ولیعصر، پلاک ۱۲۳</p>
                      <span className="method-time">بازدید با هماهنگی قبلی</span>
                    </div>
                  </div>
                </div>

                <div className="business-hours">
                  <h3>ساعات کاری</h3>
                  <div className="hours-grid">
                    <div className="hour-item">
                      <span className="day">شنبه - چهارشنبه</span>
                      <span className="time">۹:۰۰ - ۱۷:۰۰</span>
                    </div>
                    <div className="hour-item">
                      <span className="day">پنج‌شنبه</span>
                      <span className="time">۹:۰۰ - ۱۳:۰۰</span>
                    </div>
                    <div className="hour-item">
                      <span className="day">جمعه</span>
                      <span className="time">تعطیل</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="form-card">
                <h2 className="section-title">ارسال پیام</h2>
                <p className="section-description">
                  لطفاً فرم زیر را با دقت تکمیل کنید تا بتوانیم بهترین پاسخ را ارائه دهیم
                </p>

                {submitStatus === 'success' && (
                  <div className="alert alert-success">
                    <div className="alert-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </div>
                    <div className="alert-content">
                      <h4>پیام شما ارسال شد</h4>
                      <p>پیام شما با موفقیت دریافت شد. تیم پشتیبانی ما در اسرع وقت با شما تماس خواهد گرفت.</p>
                    </div>
                  </div>
                )}

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        نام و نام خانوادگی <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="نام کامل خود را وارد کنید"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        آدرس ایمیل <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="example@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      موضوع پیام <span className="required">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">موضوع مورد نظر را انتخاب کنید</option>
                      <option value="general">سوال عمومی</option>
                      <option value="technical">مشکل فنی</option>
                      <option value="course">استعلام درباره دوره‌ها</option>
                      <option value="partnership">درخواست همکاری</option>
                      <option value="complaint">شکایت یا انتقاد</option>
                      <option value="suggestion">پیشنهاد</option>
                      <option value="other">سایر موارد</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      متن پیام <span className="required">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-textarea"
                      rows="6"
                      placeholder="لطفاً پیام خود را با جزئیات کامل ارسال کنید..."
                      required
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className={`submit-button ${isSubmitting ? 'loading' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading-spinner"></span>
                        در حال ارسال...
                      </>
                    ) : (
                      <>
                        <span className="button-icon">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                          </svg>
                        </span>
                        ارسال پیام
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">سوالات متداول</h2>
            <p className="section-description">
              پاسخ سوالات رایج کاربران را در اینجا مشاهده کنید
            </p>
          </div>
          
          <div className="faq-grid">
            <div className="faq-card">
              <div className="faq-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                </svg>
              </div>
              <h3>چه مدت زمان برای پاسخ‌گویی نیاز است؟</h3>
              <p>معمولاً در کمتر از ۲۴ ساعت به پیام‌های شما پاسخ می‌دهیم. برای موارد فوری، از شماره تلفن استفاده کنید.</p>
            </div>

            <div className="faq-card">
              <div className="faq-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3>آیا خدمات شما رایگان است؟</h3>
              <p>مشاوره اولیه و راهنمایی‌های کلی رایگان است. برای خدمات تخصصی، هزینه‌ها متناسب با نوع سرویس تعیین می‌شود.</p>
            </div>

            <div className="faq-card">
              <div className="faq-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
              </div>
              <h3>چگونه می‌توانم درخواست همکاری کنم؟</h3>
              <p>برای همکاری، لطفاً موضوع "درخواست همکاری" را انتخاب کرده و جزئیات پیشنهاد خود را ارسال کنید.</p>
            </div>

            <div className="faq-card">
              <div className="faq-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3>آیا امکان بازدید حضوری وجود دارد؟</h3>
              <p>بله، با هماهنگی قبلی می‌توانید از دفتر ما بازدید کنید. لطفاً قبل از مراجعه با ما تماس بگیرید.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;