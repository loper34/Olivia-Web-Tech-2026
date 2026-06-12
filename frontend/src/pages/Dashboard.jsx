import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import PetaKampus from '../components/PetaKampus';
import Peta3D from '../components/Peta3D';
import AboutUs from '../components/AboutUs';

const Dashboard = ({ activePage, setActivePage }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="dashboard-container">
      {activePage === 'peta-kampus' ? (
        <>
          <PetaKampus searchTerm={searchTerm} />
          <SearchBar onSearch={setSearchTerm} />
        </>
      ) : activePage === 'peta-3d' ? (
        <Peta3D />
      ) : (
        <AboutUs setActivePage={setActivePage} />
      )}
    </div>
  );
};

export default Dashboard;