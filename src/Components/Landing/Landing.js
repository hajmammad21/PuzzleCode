import React from 'react';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      {/* بخش معرفی اصلی */}
      <section className="hero-section" id="home">
        <div className="hero-content">
          <div className="hero-text">
            <h1><span className="highlight">پازل‌ کد</span> را کشف کن</h1>
            <p className="hero-description">
              با چالش‌های تعاملی و پروژه‌های واقعی برنامه‌نویسی را یاد بگیر.
              مهارت کسب کن، معما حل کن و به برنامه‌نویسی که همیشه می‌خواستی تبدیل شو.
            </p>
            <div className="hero-buttons">
              <a href="#learn" className="cta-primary">شروع یادگیری</a>
              <a href="#features" className="cta-secondary">ویژگی‌ها را ببین</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="code-animation">
              <div className="code-line">
                <span className="code-keyword">function </span> 
                <span className="code-function">unlockPotential</span>
                <span className="code-bracket">()</span> 
                <span className="code-bracket">&#123;</span>
              </div>
              <div className="code-line">
                &nbsp;&nbsp;<span className="code-keyword">return</span> 
                <span className="code-string">"چیزهای شگفت‌انگیز!"</span><span className="code-semicolon">;</span>
              </div>
              <div className="code-line">
                <span className="code-bracket">&#125;</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* بخش یادگیری عملی */}
      <section className="learn-section" id="learn">
        <div className="container">
          <h2 className="section-title">یادگیری با <span className="highlight">انجام دادن</span></h2>
          <p className="section-subtitle">
            مسیرت را انتخاب کن و با پروژه‌های عملی و آموزش‌های تعاملی کدنویسی را شروع کن
          </p>
          
          <div className="language-boxes">
            {/* باکس پایتون */}
            <div className="language-box python-box">
              <div className="language-icon">
                <div className="python-logo">
                  <div className="python-circle python-blue"></div>
                  <div className="python-circle python-yellow"></div>
                </div>
              </div>
              <h3>پایتون</h3>
              <p>
مسیر برنامه نویسی ات را با پازل های ساده پایتون شروع کن. عالی برای مبتدی ها و قدرتمند برای حرفه ای ها. اپلیکیشن وب بساز , داده ها را تحلیل کن و راه حل های هوش مصنوعی رو توسعه بده.
              </p>
              <div className="language-features">
                <span className="feature-tag">مناسب مبتدی‌ها</span>
                <span className="feature-tag">علم داده</span>
                <span className="feature-tag">هوش مصنوعی / یادگیری ماشین</span>
              </div>
              <button className="language-cta">شروع پایتون</button>
            </div>

            {/* باکس جاوااسکریپت */}
            <div className="language-box javascript-box">
              <div className="language-icon">
                <div className="js-logo">JS</div>
              </div>
              <h3>جاوا اسکریپت</h3>
              <p>
                با جاوا اسکریپت به وب جان ببخش. وب‌سایت‌های تعاملی بساز، اپلیکیشن موبایل توسعه بده 
                و با یک زبان سمت سرور هم برنامه بنویس.
              </p>
              <div className="language-features">
                <span className="feature-tag">توسعه وب</span>
                <span className="feature-tag">فول‌استک</span>
                <span className="feature-tag">اپلیکیشن موبایل</span>
              </div>
              <button className="language-cta">به زودی</button>
            </div>
          </div>
        </div>
      </section>

      {/* فوتر */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>پازل‌کد</h3>
              <p>با یادگیری تعاملی، توانایی برنامه‌نویسی‌ات را آزاد کن</p>
            </div>
            
            <div className="footer-links">
              <div className="footer-column">
                <h4>یادگیری</h4>
                <ul>
                  <li><a href="#python">دوره پایتون</a></li>
                  <li><a href="#javascript">دوره جاوااسکریپت</a></li>
                  <li><a href="#projects">پروژه‌ها</a></li>
                  <li><a href="#challenges">چالش‌ها</a></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h4>جامعه</h4>
                <ul>
                  <li><a href="#forum">فروم</a></li>
                  <li><a href="#discord">دیسکورد</a></li>
                  <li><a href="#events">رویدادها</a></li>
                  <li><a href="#blog">بلاگ</a></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h4>پشتیبانی</h4>
                <ul>
                  <li><a href="#help">مرکز راهنما</a></li>
                  <li><a href="#contact">تماس با ما</a></li>
                  <li><a href="#faq">سوالات متداول</a></li>
                  <li><a href="#feedback">بازخورد</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; ۲۰۲۵ پازل‌کد. تمامی حقوق محفوظ است.</p>
            <div className="footer-social">
              <a href="www.github.com" className="social-link">گیت‌هاب</a>
              <a href="www.tweeter.com" className="social-link">توییتر</a>
              <a href="www.linkdin.com" className="social-link">لینکدین</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
