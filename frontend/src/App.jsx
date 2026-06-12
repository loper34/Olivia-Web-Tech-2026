import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('peta-kampus');
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="app-wrapper">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}

      <Sidebar isOpen={sidebarOpen} activePage={activePage} setActivePage={setActivePage} />

      <div className="app-main">
        <Header toggleSidebar={toggleSidebar} setActivePage={setActivePage} />
        <main className="app-main-inner">
          <Dashboard activePage={activePage} setActivePage={setActivePage} />
        </main>
        <Footer setActivePage={setActivePage} />
      </div>
    </div>
  );
};

export default App;