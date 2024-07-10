import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="d-flex justify-content-between align-items-center p-1 border-bottom">
            <Link to="/SingleMode" className="text-dark" style={{ textDecoration: 'none' }}> 
                <div className="h3 mb-0">EcoM ESG Platform</div>
            </Link>
            <button className="btn btn-link">
                <Link to="/help">Help</Link> 
            </button>
            <div>
                <button className="btn btn-primary mr-3">
                    <Link className="text-white" to="/download-report" style={{ textDecoration: 'none' }}>Download Report</Link>
                </button>
            </div>


            <div>
                <button className="btn btn-primary mr-3">
                    <Link className="text-white" to="/setting" style={{ textDecoration: 'none' }}>Setting</Link>
                </button>
            </div>
            <div>
                <button className="btn btn-secondary">
                    <Link className="text-white" to="/login" style={{ textDecoration: 'none' }}>Log out</Link>
                </button>
            </div>
        </header>
    );
}

export default Header;
