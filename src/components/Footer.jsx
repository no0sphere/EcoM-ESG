import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '20px', background: '#333', color: '#fff' }}>
                <Link to="/SingleMode"><button>Dashboard</button></Link>
                <Link to="/about"><button>About Us</button></Link>
                <Link to="/contact"><button>Contact</button></Link>

            </div>
        </footer>
    );
}

export default Footer;
