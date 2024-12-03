import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  // Check if the user is logged in (if there's an access token or 'user_logged_in' flag in localStorage)
  const isLoggedIn = localStorage.getItem('user_logged_in') === 'true';

  const handleLogout = () => {
    // Remove the tokens and user_logged_in flag from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_logged_in');
    
    // Optionally, redirect to the login page after logout
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Home Link stays left */}
        <Link className="navbar-brand" to="/">Parking Finder</Link>
        <ul className='navar-nav'>
        
        </ul>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
            
        
          <ul className="navbar-nav ms-auto"> {/* Use ms-auto to align items to the right */}
          <li className='nav-item'>
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className='nav-item'>
                <Link className="nav-link" to="/parkings">Parkings</Link>
            </li>
            {isLoggedIn ? (
          // If the user is logged in, show the Logout option
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/my-parkings">My Parkings</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          // If the user is not logged in, show Login and Register options
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
          </>
        )}
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
