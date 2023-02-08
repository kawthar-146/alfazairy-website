import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './Dashboard.css';
import DashNav from '../components/dashboard/DashNav';
import CollectionsTable from '../components/dashboard/CollectionsTable';
import DressesTable from '../components/dashboard/DressesTable';
import CategoriesTable from '../components/dashboard/CategoriesTable';

const Dashboard = () => {
  return (
    <div className='dashboard-container'>
      <h1>Dashboard</h1>
      <div className='dashboard-content'>
        <DashNav />
        <div className='main-content'>
          <Routes>
            <Route
              path='collections'
              element={<CollectionsTable className='table-container' />}
            />
            <Route path='dresses' element={<DressesTable collection='' />} />
            <Route path='categories' element={<CategoriesTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
