import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Route, Routes } from "react-router-dom"

// import pages
import Home from './pages/Home/Home.js';
import Datasets from './pages/Datasets/Datasets.js';
import Login from './pages/Login/Login.js';
import Register from './pages/Register/Register.js';
import ViewDatasets from './pages/Datasets/ViewDatasets.js';
import Profile from './pages/Profile/Profile.js';

// import components
import TheNavbar from './components/Navbar.js';
import Footer from './components/Footer.js';

function App() {
  const excludeRoutes = ['/login', '/register', '/login/', '/regsiter/']
  return (
    <>
      {!excludeRoutes.includes(window.location.pathname) && <TheNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/datasets" element={<Datasets />} />
        <Route path="/datasets/:datasets_name" element={<ViewDatasets />} />
        <Route path="/datasets/:datasets_name/discussion" element={<ViewDatasets />} />
        <Route path="/datasets/:datasets_name/discussion/topics/:topic_id" element={<ViewDatasets />}
        />
        <Route path="/profile/:user_name" element={<Profile />} />
      </Routes>
      {!excludeRoutes.includes(window.location.pathname) && <Footer />}
    </>
  );
}

export default App;