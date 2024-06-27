import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login attempt with:', { username, password });
        // 这里添加登录逻辑
    };

    return (
        <div className="container-fluid login-container">
            <div className="row">
                <div className="col-md-6 login-image">
                    {/* 这里放置左侧图片 */}
                </div>
                <div className="col-md-6 login-form-container">
                    <form onSubmit={handleLogin} className="login-form">
                        <h2 className="mb-4">Login</h2>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="button-group"> 
                            {/* login button directly link to SingleMode temporarily */}
                            {/* Should be replace in the later development */}
                            <Link to="/SingleMode" button type="submit" className="btn btn-primary">Login</Link>
                            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
