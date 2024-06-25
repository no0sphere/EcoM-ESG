import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 


function HelpPage() {
  return (
    <div className="container my-5">

      <div className="content">
        <h1 className="mb-4">Helping document</h1>
        <h2 className="mb-3">EcoM ESG Platform - User Guide</h2>
        
        <section className="mb-4">
          <h3>Introduction</h3>
          <p>Welcome to the EcoM ESG Platform, your comprehensive solution for managing and analyzing Environmental, Social, and Governance (ESG) data. This guide will help you navigate through the various features and functionalities of the platform.</p>
        </section>

        <section className="mb-4">
          <h3>Getting Started</h3>
          <ol>
            <li>Login: Enter your username and password to access the platform.</li>
            <li>Forgot Password: Click the 'Forgot Password' link if you need to reset your password.</li>
            <li>Sign Up: New users can sign up by clicking the 'Sign Up' link and filling in the required information.</li>
          </ol>
        </section>

        <section className="mb-5">
          <h3>Main Features</h3>
          <ul>
            <li><strong>Dashboard:</strong> The dashboard provides an overview of the key metrics and data points relevant to your selected companies and industries.</li>
            <li><strong>Summary Cards:</strong> Display key ESG metrics and scores.</li>
            <li><strong>Charts and Graphs:</strong> Visualize trends and comparisons.</li>
            <li><strong>Notifications:</strong> Stay updated with the latest ESG news and data updates.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default HelpPage;
