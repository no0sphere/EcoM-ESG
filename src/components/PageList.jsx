import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import SingleMode from './SingleMode';
import Header from './Header';
import Footer from './Footer';
import HelpPage from './HelpingPage';
import DownloadPage from './DownloadPage';
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import Setting from "./Setting.jsx";
const PageList = () => {

    //If there is no token jump to login page
    //otherwise jump to the dashboard

    return (
       
     

        <div>   
            <Header />

            {/* pages added here */}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/SingleMode" element={<SingleMode />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/download-report" element={<DownloadPage />} />
            </Routes>
            
            <Footer />
 

        </div>
    );
}

export default PageList;