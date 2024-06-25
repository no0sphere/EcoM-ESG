import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import SingleMode from './SingleMode';
import Header from './Header';
import Footer from './Footer';

const PageList = () => {

    //If there is no token jump to login page
    //otherwise jump to the dashboard

    return (
        <div>
            {/* paegs added here */}
            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/SingleMode" element={<SingleMode />} />
                {/* <Route path="/help" component={HelpPage} />
                <Route path="/download-report" component={ReportPage} />
                <Route path="/logout" component={LogoutPage} /> */}
            </Routes>


            {/* should be takeplaced by the footer in the future */}
            <nav>
                <ul>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/SingleMode">SingleMode</Link>
                    </li>
                </ul>
            </nav>

        </div>
    );
}

export default PageList;