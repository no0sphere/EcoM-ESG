import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignUp.css';

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log('Sign up attempt with:', { username, email, password, confirmPassword });
        // 这里添加注册逻辑
    };

    return (
        <div className="container-fluid sign-up-container">
            <div className="row">
                <div className="col-md-6 sign-up-image">
                    {/* 这里放置左侧图片 */}
                </div>
                <div className="col-md-6 sign-up-form-container">
                    <form onSubmit={handleSignUp} className="sign-up-form">
                        <h2 className="mb-4">Sign Up</h2>
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
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="button-group">
                            {/*signup button directly link to SingleMode temporarily */}
                            {/* Should be replace in the later development */}
                            <Link to="/SingleMode" button type="submit" className="btn btn-primary">Sign Up</Link>
                            <Link to="/login" className="btn btn-primary">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
