import React, { useState } from 'react';
import axios from 'axios';
import {  Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import MockAdapter from 'axios-mock-adapter';
const SignUp = () => {
  const mock = new MockAdapter(axios);
  mock.onPost('/api/auth/register').reply(200, {
    "status": "success",
    "message": "User registered successfully!"  
  });
  mock.onPost('/api/auth/login').reply(409, {
    "status": "error",
    "message": "Username or email already exists."  
  });
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("post userData",userData);
      const response = await axios.post('/api/auth/register', userData);
      console.log("response",response);
      if (response.status === 200) {
        localStorage.setItem('username', userData.username);
        console.log("register success");
        navigate('/SingleMode');//window.location.href = '/SingleMode'; 
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.log("error",error.response);
        setError('Username or email already exists.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" name="username" value={userData.username} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={userData.password} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={userData.email} onChange={handleChange} required />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Sign up</button>
          <Link to="/login" className="btn">Already have account?</Link>
        </div>
      </form>
      
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default SignUp;
