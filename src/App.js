import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom"

// import pages
import Home from './pages/Home/Home.js';
import Datasets from './pages/Datasets/Datasets.js';
import Organization from './pages/Organization/Organization.js';
import Group from './pages/Group/Group.js';
import Login from './pages/Login/Login.js';
import Register from './pages/Register/Register.js';
import ViewDatasets from './pages/Datasets/ViewDatasets.js';
import Profile from './pages/Profile/Profile.js';

// import components
import TheNavbar from './components/Navbar.js';

function App() {
  const excludeRoutes = ['/login', '/register']

  return(
    <>
      {!excludeRoutes.includes(window.location.pathname) && <TheNavbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/datasets' element={<Datasets />} />
        <Route path='/datasets/:datasets_name' element={<ViewDatasets />} />
        <Route path='/organization' element={<Organization />} />
        <Route path='/group' element={<Group />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;