import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
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
            <li><a href="/login" className="btn-ghost" onClick={handleLinkClick}>ورود</a></li>
            <li><a href="/Signup" className="btn-primary" onClick={handleLinkClick}>ثبت نام</a></li>
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