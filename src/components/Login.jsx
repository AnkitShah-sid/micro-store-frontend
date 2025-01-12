import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Ensure proper installation
import '../assets/css/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Decode JWT Token
  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (decodeError) {
      console.error('Error decoding token:', decodeError);
      alert('Failed to decode the token.');
      return null;
    }
  };

  // Handle Login Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://192.168.124.69:8080/auth/generateToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        localStorage.setItem('authToken', data.token);

        const decodedToken = decodeToken(data.token);
        if (decodedToken && decodedToken.role) {
          console.log('Decoded Token:', decodedToken);

          switch (decodedToken.role) {
            case 'ADMIN':
              navigate('/admin');
              break;
            case 'STORE':
              navigate('/store');
              break;
            case 'KITCHEN':
              navigate('/kitchen');
              break;
            default:
              alert('Invalid role detected');
              break;
          }
        } else {
          alert('Token does not contain a valid role.');
        }
      } else {
        alert(`Login failed: ${data.message || 'Invalid credentials'}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred, please try again.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn-login">Login</button>
      </form>
    </div>
  );
};

export default Login;
