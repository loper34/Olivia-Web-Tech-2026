import React from 'react';

const Sidebar = ({ isOpen, activePage, setActivePage }) => {
  return (
    <aside className={`app-sidebar shadow ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`} data-bs-theme="dark">
      <div className="sidebar-brand-box">
        <a href="#" className="brand-link d-flex align-items-center gap-2 text-decoration-none">
          <img src="/Img/UNHAS-Photoroom.png" alt="Logo UNHAS" className="sidebar-brand-logo" />
          <span className="sidebar-brand-title">Peta UNHAS</span>
        </a>
      </div>

      <div className="sidebar-wrapper">
        <nav className="mt-2">
          <ul className="sidebar-menu">
            <li className="sidebar-section-label">Navigasi</li>

            <li className="nav-item">
              <a
                href="#"
                className={`sidebar-nav-link ${activePage === 'peta-kampus' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('peta-kampus'); }}
              >
                <i className="bi bi-map-fill sidebar-nav-icon"></i>
                <span>Peta Kampus</span>
              </a>
            </li>

            <li className="nav-item">
              <a
                href="#"
                className={`sidebar-nav-link ${activePage === 'peta-3d' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('peta-3d'); }}
              >
                <i className="bi bi-box-fill sidebar-nav-icon"></i>
                <span>Peta 3D</span>
              </a>
            </li>

            <li className="sidebar-divider"></li>

            <li className="sidebar-section-label">Informasi</li>

            <li className="nav-item">
              <a href="https://prodi.unhas.ac.id/sarjana-terapan-penginderaan-jauh-dan-sistem-informasi-geografis/post/show/en/welcome-to-pj-sig" target="_blank" rel="noreferrer" className="sidebar-nav-link">
                <i className="bi bi-telephone-fill sidebar-nav-icon"></i>
                <span>Contact Us</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="sidebar-footer">
        <img src="/Img/UNHAS-Photoroom.png" alt="Logo UNHAS" className="sidebar-footer-logo" />
        <p className="sidebar-footer-text">
          404 NOT FOUND<br />Olivia 2026
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
