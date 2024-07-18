import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Subheader() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeButton, setActiveButton] = useState('');

    useEffect(() => {

        switch (location.pathname) {
            case '/frameSelect':
                setActiveButton('Frame select');
                break;
            case '/SingleMode':
                setActiveButton('Single mode');
                break;
            case '/ComparisonMode':
                setActiveButton('Compare mode');
                break;
            default:
                setActiveButton('');
        }
    }, [location.pathname]);

    const handleButtonClick = (buttonName, path) => {
        setActiveButton(buttonName);
        navigate(path);
    };

    return (
        <div className="d-flex justify-content-start p-3 border-bottom bg-light">
            <button
                className={`btn ${activeButton === 'Single mode' ? 'btn-primary' : 'btn-link'}`}
                onClick={() => handleButtonClick('Single mode', '/SingleMode')}
            >
                Single mode
            </button>
            <button
                className={`btn ${activeButton === 'Compare mode' ? 'btn-primary' : 'btn-link'}`}
                onClick={() => handleButtonClick('Compare mode', '/ComparisonMode')}
            >
                Compare mode
            </button>
            <button
                className={`btn ${activeButton === 'Frame select' ? 'btn-primary' : 'btn-link'}`}
                onClick={() => handleButtonClick('Frame select', '/frameSelect')}
            >
                Framework Selection
            </button>
        </div>
    );
}

export default Subheader;
