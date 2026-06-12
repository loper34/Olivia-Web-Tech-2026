import React, { useState, useRef, useEffect } from 'react';

const Header = ({ toggleSidebar, setActivePage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="app-header navbar" data-bs-theme="dark">
      <button className="header-toggle-btn" onClick={toggleSidebar}>
        <i className="bi bi-list"></i>
      </button>

      <div className="header-brand">
        <img src="/Img/UNHAS-Photoroom.png" alt="Logo UNHAS" className="header-logo" />
        <span className="header-title">Peta UNHAS</span>
      </div>

      <div className="about-dropdown-wrapper" ref={dropdownRef}>
        <button
          className="header-about-btn"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <i className="bi bi-info-circle"></i>
          <span>About</span>
          <i className={`bi bi-chevron-${dropdownOpen ? 'up' : 'down'} ms-1`} style={{fontSize:'0.65rem'}}></i>
        </button>

        {dropdownOpen && (
          <div className="about-dropdown">

            <div className="about-dropdown-header">
              <img src="/Img/Logo Web Head.png" alt="Logo" className="about-dropdown-logo" />
              <div>
                <h6 className="about-dropdown-title">Peta Kampus UNHAS</h6>
                <span className="about-dropdown-version">Olivia 2026 — Web Technology</span>
              </div>
            </div>

            <p className="about-dropdown-desc">
              Aplikasi WebGIS interaktif yang memudahkan navigasi dan pencarian lokasi gedung, 
              fasilitas, serta informasi bangunan di lingkungan Kampus Universitas Hasanuddin Tamalanrea.
            </p>

            <div className="about-dropdown-divider"></div>

            <p className="about-dropdown-label">Tim Pengembang</p>
            <div className="about-dropdown-team">
              <div className="about-dropdown-member">
                <img src="/Img/ashabul.png" alt="Ashabul" />
                <div>
                  <span className="member-name">Ashabul Kahfi</span>
                  <span className="member-role">Ketua · Backend</span>
                </div>
              </div>
              <div className="about-dropdown-member">
                <img src="/Img/arief.png" alt="Arief" />
                <div>
                  <span className="member-name">M. Arief Abdillah</span>
                  <span className="member-role">Anggota · Frontend</span>
                </div>
              </div>
              <div className="about-dropdown-member">
                <img src="/Img/indira.png" alt="Indira" />
                <div>
                  <span className="member-name">Indira Qissi Amanda</span>
                  <span className="member-role">Anggota · Dokumentasi</span>
                </div>
              </div>
            </div>

            <div className="about-dropdown-divider"></div>

            <button
              className="about-dropdown-full-btn"
              onClick={() => { setActivePage('about-us'); setDropdownOpen(false); }}
            >
              <i className="bi bi-arrow-right-circle me-2"></i>Lihat Profil Lengkap Tim
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;