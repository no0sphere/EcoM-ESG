import React, { useState } from 'react';
import Avatar from '../components/Avatar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Setting.css';

function SettingPage() {
    const [user, setUser] = useState({
        username: '@Van',
        position: 'Sama',
        department: 'ART perform',
        email: '123@google.com',
        phone: '0412345678'
    });

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [notifications, setNotifications] = useState({
        email: false,
        sms: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setNotifications(prevNotifications => ({ ...prevNotifications, [name]: checked }));
    };

    const handleSaveChanges = () => {
        console.log('Saving changes:', { user, password, notifications });
        // 这里添加保存更改的逻辑，例如发送到后端API
    };

    return (
        <div className="container-fluid setting-page">
            <div className="container">
                <h1 className="setting-title">Setting</h1>
                <h3 className="edit-profile">Edit Profile</h3>
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="avatar-container">
                            <div className="avatar-and-button">
                                <Avatar src="/Avatar/Dingzhen.jpg" alt="User Avatar"/>
                                <button className="btn btn-link change-photo-btn">Change profile photo</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="setting-section">
                            <h3>Personal Information</h3>
                            <div className="mb-3 form-group">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" className="form-control" id="username" name="username"
                                       value={user.username} onChange={handleInputChange}/>
                            </div>
                            <div className="mb-3 form-group">
                                <label htmlFor="position" className="form-label">Position</label>
                                <input type="text" className="form-control" id="position" name="position"
                                       value={user.position} onChange={handleInputChange}/>
                            </div>
                            <div className="mb-3 form-group">
                                <label htmlFor="department" className="form-label">Department</label>
                                <input type="text" className="form-control" id="department" name="department"
                                       value={user.department} onChange={handleInputChange}/>
                            </div>
                        </div>
                        <div className="setting-section">
                            <h3>Security Settings</h3>
                            <div className="mb-3 form-group">
                                <label htmlFor="password" className="form-label">Change Password</label>
                                <input type="password" className="form-control" id="password" value={password}
                                       onChange={handlePasswordChange}/>
                            </div>
                            <div className="mb-3 form-group">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="confirmPassword" value={confirmPassword}
                                       onChange={handleConfirmPasswordChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="setting-section">
                            <h3>Notification Settings</h3>
                            <div className="notification-options">
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="emailNotifications" name="email"
                                           checked={notifications.email} onChange={handleNotificationChange}/>
                                    <label className="form-check-label fw-bold" htmlFor="emailNotifications">Email
                                        Notifications</label>
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="smsNotifications" name="sms"
                                           checked={notifications.sms} onChange={handleNotificationChange}/>
                                    <label className="form-check-label fw-bold" htmlFor="smsNotifications">SMS
                                        Notifications</label>
                                </div>
                            </div>
                        </div>
                        <div className="setting-section">
                            <h3>Contact Information</h3>
                            <div className="mb-3 form-group">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input type="email" className="form-control" id="email" name="email" value={user.email}
                                       onChange={handleInputChange}/>
                            </div>
                            <div className="mb-3 form-group">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <input type="tel" className="form-control" id="phone" name="phone" value={user.phone}
                                       onChange={handleInputChange}/>
                            </div>
                        </div>
                        <div className="save-button-container">
                            <button className="btn btn-dark btn-lg save-changes-btn" onClick={handleSaveChanges}>Save
                                changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingPage;
