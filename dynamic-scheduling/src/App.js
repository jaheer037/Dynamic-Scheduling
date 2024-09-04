import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Home from './pages/Home';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Login from './components/Login';
import UserAvailability from './components/UserAvailability';
import "./App.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user-availability" element={<UserAvailability />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
