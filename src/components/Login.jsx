import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import MockAdapter from 'axios-mock-adapter';

const Login = () => {
  const mock = new MockAdapter(axios);
  
  mock.onPost('/api/auth/login').reply(401, {
    "status": "error",
    "message": "Authentication failed. Username or password is incorrect."  
  });
  mock.onPost('/api/auth/login').reply(200, {
    "status": "success",
    "message": "Login successful"  
  });

  const [userData, setuserData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("userData",userData)
      const response = await axios.post('/api/auth/login', userData);
      if (response.status === 200) {
        localStorage.setItem('username', userData.username);
        console.log("login success");
        navigate('/SingleMode'); 
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("error",error.response);
        setError('Authentication failed. Username or password is incorrect.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" name="username" value={userData.username} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={userData.password} onChange={handleChange} required />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Login</button>
      
          <Link to="/signup" className="btn btn-primary">Sign up now!</Link>
        </div>
        
      </form>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default Login;
