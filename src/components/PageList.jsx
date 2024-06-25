import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import SingleMode from './SingleMode';
import Header from './Header';
import Footer from './Footer';
import HelpPage from './HelpingPage';
import DownloadPage from './DownloadPage';
const PageList = () => {

    //If there is no token jump to login page
    //otherwise jump to the dashboard

    return (
       
     

        <div>   
            <Header />
            {/* paegs added here */}
            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/SingleMode" element={<SingleMode />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/download-report" element={<DownloadPage />} />
            </Routes>
            <Footer />
 

        </div>
    );
}

export default PageList;