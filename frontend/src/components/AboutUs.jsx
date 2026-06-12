import React from 'react';

const AboutUs = ({ setActivePage }) => {
  return (
    <div className="about-page">

      <div className="about-hero">
        <div className="about-hero-logos">
          <img src="/Img/Logo Olivia 2026.png" alt="Logo Olivia 2026" className="about-hero-logo-right" />
        </div>
        <div className="about-hero-text">
          <h1>404 NOT FOUND</h1>
          <p className="about-hero-sub">Universitas Hasanuddin</p>
          <a href="https://olivia.unesa.ac.id/" target="_blank" rel="noreferrer" className="about-hero-badge">
            <i className="bi bi-trophy-fill me-2"></i>
            Web Technology Competition — Olivia 2026
          </a>
        </div>
        <div className="about-hero-logos">
          <img src="/Img/UNHAS-Photoroom.png" alt="Logo UNHAS" className="about-hero-logo-left" />
        </div>
      </div>

      <div className="about-body">
        <button className="btn-back mb-4" onClick={() => setActivePage('peta-kampus')}>
          <i className="bi bi-arrow-left me-2"></i>Kembali ke Peta
        </button>

        <div className="about-grid">

          <div className="about-left">

            <div className="about-card">
              <h3><i className="bi bi-trophy-fill me-2 text-gold"></i>Tentang Lomba</h3>
              <p>
                Web Technology Competition adalah ajang tahunan yang menantang kreativitas dan kemampuan teknis mahasiswa
                dalam membangun solusi berbasis web. Tahun ini, tema yang diangkat adalah <strong>"Inovasi GIS untuk Kemajuan Kampus"</strong>,
                di mana peserta mengembangkan aplikasi peta interaktif untuk navigasi fasilitas di lingkungan kampus.
              </p>
            </div>

            <div className="about-card">
              <h3><i className="bi bi-bullseye me-2 text-gold"></i>Visi &amp; Misi</h3>
              <div className="visi-misi">
                <div className="vm-item">
                  <span className="vm-label">Visi</span>
                  <p>Menciptakan aplikasi WebGIS inovatif yang meningkatkan pengalaman pengguna dalam menjelajah kampus.</p>
                </div>
                <div className="vm-item">
                  <span className="vm-label">Misi</span>
                  <ul>
                    <li>Mengintegrasikan data spasial kampus ke dalam antarmuka web yang responsif.</li>
                    <li>Menampilkan informasi fasilitas kampus secara real-time dan interaktif.</li>
                    <li>Memastikan kemudahan akses dan usability bagi semua pengguna.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="about-card">
              <h3><i className="bi bi-laptop me-2 text-gold"></i>Teknologi yang Digunakan</h3>
              <div className="tech-grid">
                <span className="tech-badge"><i className="bi bi-code-slash me-1"></i>React.js</span>
                <span className="tech-badge"><i className="bi bi-bootstrap me-1"></i>Bootstrap 5</span>
                <span className="tech-badge"><i className="bi bi-map me-1"></i>Leaflet.js</span>
                <span className="tech-badge"><i className="bi bi-server me-1"></i>Python Flask</span>
                <span className="tech-badge"><i className="bi bi-filetype-json me-1"></i>GeoJSON</span>
                <span className="tech-badge"><i className="bi bi-git me-1"></i>Git & GitHub</span>
              </div>
            </div>

            <div className="about-card">
              <h3><i className="bi bi-stars me-2 text-gold"></i>Harapan</h3>
              <p>
                Dengan mengikuti lomba ini, kami berharap dapat mengembangkan kemampuan teknis,
                berkontribusi pada inovasi kampus, dan menciptakan aplikasi yang bermanfaat
                bagi sivitas akademika Universitas Hasanuddin.
              </p>
            </div>

          </div>

          <div className="about-right">
            <div className="about-card">
              <h3><i className="bi bi-people-fill me-2 text-gold"></i>Tim Kami</h3>
              <p className="text-muted-light mb-4">Mahasiswa Universitas Hasanuddin</p>

              <div className="team-list-vertical">

                <div className="team-member-card">
                  <img src="/Img/ashabul.png" alt="Ashabul Kahfi" className="team-photo" />
                  <div className="team-info">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <h5 style={{margin:0}}>Ashabul Kahfi</h5>
                      <span className="team-leader-badge">Ketua</span>
                    </div>
                    <span className="team-role"><i className="bi bi-terminal-fill me-1"></i>Backend Developer &amp; API Integration</span>
                    <div className="team-socials mt-2">
                      <a href="https://github.com/loper34" target="_blank" rel="noreferrer" className="social-link">
                        <i className="bi bi-github"></i>
                      </a>
                      <a href="https://www.instagram.com/aboel06/" target="_blank" rel="noreferrer" className="social-link">
                        <i className="bi bi-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="team-member-card">
                  <img src="/Img/arief.png" alt="M. Arief Abdillah" className="team-photo" />
                  <div className="team-info">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <h5 style={{margin:0}}>M. Arief Abdillah</h5>
                      <span className="team-member-badge">Anggota</span>
                    </div>
                    <span className="team-role"><i className="bi bi-palette-fill me-1"></i>Frontend Developer &amp; UI/UX Designer</span>
                    <div className="team-socials mt-2">
                      <a href="https://github.com/zeolit404" target="_blank" rel="noreferrer" className="social-link">
                        <i className="bi bi-github"></i>
                      </a>
                      <a href="https://www.instagram.com/arief_abdillah1174/" target="_blank" rel="noreferrer" className="social-link">
                        <i className="bi bi-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="team-member-card">
                  <img src="/Img/indira.png" alt="Indira Qissi Amanda" className="team-photo" />
                  <div className="team-info">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <h5 style={{margin:0}}>Indira Qissi Amanda</h5>
                      <span className="team-member-badge">Anggota</span>
                    </div>
                    <span className="team-role"><i className="bi bi-box-fill me-1"></i>3D Modeler &amp; Proposal Specialist</span>
                    <div className="team-socials mt-2">
                      <a href="https://www.instagram.com/indiraqissi_amanda031/" target="_blank" rel="noreferrer" className="social-link">
                        <i className="bi bi-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-quote-card mt-3">
              <i className="bi bi-quote quote-icon"></i>
              <p className="quote-text">
                "Inovasi bukan hanya tentang teknologi, tetapi tentang bagaimana teknologi membuat hidup orang-orang menjadi lebih mudah."
              </p>
              <span className="quote-author">— Tim 404 NOT FOUND</span>
            </div>

          </div>

        </div>

        <div className="about-credit">
          <span>&copy; 2026 Peta Kampus Universitas Hasanuddin &nbsp;|&nbsp; 404 NOT FOUND &nbsp;|&nbsp; Olivia 2026</span>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
