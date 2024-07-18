import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入Bootstrap CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="footer bg-light text-center text-lg-start">
            <div className="container mt-4">
                <div className="container p-4">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Social Media</h5>
                            <a href="https://facebook.com" className="btn btn-outline-dark btn-floating m-1" role="button">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                            <a href="https://linkedin.com" className="btn btn-outline-dark btn-floating m-1" role="button">
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </a>
                            <a href="https://youtube.com" className="btn btn-outline-dark btn-floating m-1" role="button">
                                <FontAwesomeIcon icon={faYoutube} />
                            </a>
                            <a href="https://instagram.com" className="btn btn-outline-dark btn-floating m-1" role="button">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </div>
                        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Links</h5>
                            <ul className="list-unstyled mb-0">                            

                                
                                <li><Link to="/contact" className="link-dark">Contact</Link></li>

                                <li><Link to="/about" className="link-dark">About Us</Link></li>

                                <li><Link to="/help" className="link-dark">Helping Document</Link></li>
                                
                                
                        
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
