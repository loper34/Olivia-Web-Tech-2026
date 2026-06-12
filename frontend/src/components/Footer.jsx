import React from 'react';

const Footer = ({ setActivePage }) => {
  return (
    <footer className="app-footer">
      <div className="footer-links">
        <button className="footer-link-btn" onClick={() => setActivePage('about-us')}>
          <i className="bi bi-people me-1"></i>About Us
        </button>
        <a href="https://prodi.unhas.ac.id/sarjana-terapan-penginderaan-jauh-dan-sistem-informasi-geografis/post/show/en/welcome-to-pj-sig" target="_blank" rel="noreferrer" className="footer-link-btn">
          <i className="bi bi-telephone me-1"></i>Contact Us
        </a>
      </div>
      <div className="footer-copyright">
        &copy; 2026 <strong>Peta Kampus Universitas Hasanuddin</strong>
        &nbsp;— 404 NOT FOUND &nbsp;|&nbsp; Olivia 2026
      </div>
    </footer>
  );
};

export default Footer;
