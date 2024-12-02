import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Parking from './components/Parking';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 mb-5">
        <Navbar />
        <div className="container flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/parkings" element={<Parking />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
