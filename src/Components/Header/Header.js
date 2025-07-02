import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token) {
        setIsLoggedIn(true);
        if (userData) {
          try {
            setUser(JSON.parse(userData));
          } catch (error) {
            console.error('Error parsing user data:', error);
          }
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuthStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkAuthStatus);
    return () => window.removeEventListener('storage', checkAuthStatus);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    // Remove token and user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Update state
    setIsLoggedIn(false);
    setUser(null);
    setMenuOpen(false);
    
    // Redirect to home page
    window.location.href = '/';
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <div className="logo-dot"></div>
          <span className="logo-text">Code</span>
          <span className="logo-accent">Puzzle</span>
        </div>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-center">
            <li><a href="/" onClick={handleLinkClick}>خانه</a></li>
            <li><a href="#python" onClick={handleLinkClick}>پایتون</a></li>
            <li><a href="#tutorials" onClick={handleLinkClick}>آموزش</a></li>
            <li><a href="#contact" onClick={handleLinkClick}>تماس با ما</a></li>
          </ul>
          <ul className="nav-right">
  {isLoggedIn ? (
    <li className="user-dropdown">
      <div className="user-info">
        <span className="user-name">
          {user?.name || user?.username || 'کاربر'}
        </span>
        <span className="dropdown-arrow">▼</span>
      </div>
      
      <div className="dropdown-menu">
        <div className="welcome-message">
          <div className="welcome-text">خوش آمدید</div>
          <div className="user-email">{user?.email || 'کاربر عزیز'}</div>
        </div>
        
        <a href="/dashboard" className="dropdown-item" onClick={handleLinkClick}>
          <span className="dropdown-icon">📊</span>
          داشبورد
        </a>
        
        <a href="/profile" className="dropdown-item" onClick={handleLinkClick}>
          <span className="dropdown-icon">👤</span>
          پروفایل
        </a>
        
        <div className="dropdown-divider"></div>
        
        <button 
          className="dropdown-item danger" 
          onClick={handleLogout}
        >
          <span className="dropdown-icon">🚪</span>
          خروج
        </button>
      </div>
    </li>
  ) : (
    <>
      <li><a href="/login" className="btn-ghost" onClick={handleLinkClick}>ورود</a></li>
      <li><a href="/Signup" className="btn-primary" onClick={handleLinkClick}>ثبت نام</a></li>
    </>
  )}
</ul>
        </nav>

        <div
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;