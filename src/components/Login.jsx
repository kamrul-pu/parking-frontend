import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError(''); // Reset any previous error message

    // API endpoint for login
    const url = `${API_BASE_URL}/token`;

    try {
      // Make the POST request to get tokens
      const response = await axios.post(url, {
        email: email,
        password: password,
      });

      const { access, refresh } = response.data;

      // Save the access token, refresh token and logged-in status in localStorage
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user_logged_in', 'true');  // Mark the user as logged in

      console.log('Login Successful:', response.data);

      // Redirect user to the home page or the desired page
      navigate('/');

    } catch (error) {
      console.error('Login Failed:', error);
      setError('Invalid credentials or an error occurred. Please try again.');
    } finally {
      setLoading(false);  // Stop loading state
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="john-doe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary w-100" 
          disabled={loading} // Disable the button while loading
        >
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
