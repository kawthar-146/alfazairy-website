import React, { Fragment, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Footer from './components/footer/footer';
// import Hero from "./components/hero/hero";
import Navbar from './components/navbar/navbar';
import Dresses from './pages/dresses';
import Collections from './pages/collections';
import './App.css';
// import Features from "./components/features/features";
import Home from './pages/home';
import Aboutus from './pages/aboutus';
import Contact from './pages/contact';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import { Switch } from '@mui/material';

const App = () => {
  const [showNavFoot, setShowNavFoot] = useState(true);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  return (
    <Fragment>
      <BrowserRouter>
        {showNavFoot && <Navbar />}
        <Routes>
          <Route
            path='/admin/login'
            element={
              <Login
                setShowNavFoot={setShowNavFoot}
                setAdminLoggedIn={setAdminLoggedIn}
              />
            }
          />
          <Route
            path='/admin/dashboard/*'
            element={
              adminLoggedIn ? <Dashboard /> : <Navigate to='/admin/login' />
            }
          ></Route>
          <Route path='/' element={<Home />} />
          <Route path='/aboutus' element={<Aboutus />} />
          <Route path='/collections' element={<Collections />} />
          <Route path='/collections/dresses' element={<Dresses />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        {showNavFoot && <Footer />}
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
