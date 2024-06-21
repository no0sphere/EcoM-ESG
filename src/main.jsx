import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter as Router } from 'react-router-dom';

//import PageList from './PageList';


const Main = () => {
    return (
        <>
            <Router>
                <App />
            </Router>
        </>
    );
}

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
);

export default Main;