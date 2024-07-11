import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Subheader() {
    const [activeButton, setActiveButton] = useState('');
    const navigate = useNavigate();

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        if (buttonName === 'Frame select') {
            navigate('/frameSelect');
        }
        else if (buttonName === 'Single mode') {
            navigate('/SingleMode');
        }
        else if (buttonName === 'Compare mode') {
            navigate('/ComparisonMode');
        }
    };

    const buttonStyle = {
        textDecoration: 'none',
    };

    return (
        <div className="d-flex justify-content-start p-3 border-bottom bg-light">
            <button
                className={`btn ${activeButton === 'Single mode' ? 'btn-primary' : 'btn-link'}`}
                onClick={() => handleButtonClick('Single mode')}
                style={buttonStyle}
            >
                Single mode
            </button>
            <button
                className={`btn ${activeButton === 'Compare mode' ? 'btn-primary' : 'btn-link'}`}
                onClick={() => handleButtonClick('Compare mode')}
                style={buttonStyle}
            >
                Compare mode
            </button>
            <button
                className={`btn ${activeButton === 'Frame select' ? 'btn-primary' : 'btn-link'}`}
                onClick={() => handleButtonClick('Frame select')}
                style={buttonStyle}
            >
                Frame select
            </button>
        </div>
    );
}

export default Subheader;
