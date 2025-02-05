import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import SingleMode from "./SingleMode";
import Header from "./Header";
import Subheader from "./Subheader";
import Footer from "./Footer";
import HelpPage from "./HelpingPage";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import DownloadReport from "./DownloadReport.jsx";
import FrameSelect from "./FrameSelect.jsx";
import CompanySearch from "./CompanySearch.jsx";
import ComparisonMode from "./ComparisonMode.jsx";
import ChatBot from "./ChatBox.jsx";
import Dashboard from "./Dashboard.jsx";
const PageList = () => {
  //If there is no token jump to login page
  //otherwise jump to the dashboard

  const location = useLocation();
  const showHeaderAndFooter =
    location.pathname !== "/login" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/";
  return (
    <div>
      {showHeaderAndFooter && <Header />}
      {showHeaderAndFooter && <Subheader />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/frameSelect" element={<FrameSelect />} />
        <Route
          path="/companySearch/:frameworkName"
          element={<CompanySearch />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/SingleMode" element={<SingleMode />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/downloadreport" element={<DownloadReport />} />
        <Route path="/comparisonMode" element={<ComparisonMode />} />
      </Routes>
      {showHeaderAndFooter && <ChatBot />}

      {showHeaderAndFooter && <Footer />}
    </div>
  );
};

export default PageList;
