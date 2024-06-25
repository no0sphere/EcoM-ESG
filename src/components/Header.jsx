import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '2px solid black' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Mekboy ESG Platform</div>
            <button style={{ margin: '0 20px' }}>
                <Link to="/help">Help</Link> 
            </button>
            <div>
                <button style={{ marginRight: '10px' }}>
                    <Link to="/download-report">Download Report</Link>
                </button>
                <button>
                    <Link to="/logout">Log out</Link>
                </button>
            </div>
        </header>
    );
}

export default Header;
