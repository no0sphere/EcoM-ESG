import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AccordionMenu from './AccordionMenu';
import ComparisonModeData from './ComparisonModeData';


const ComparisonMode = () => {

    const styleComparisonMode = {
        display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '10px', margin: '20px'
    };

    return (
        <div>
            <div style={styleComparisonMode}>
                <ComparisonModeData />
            </div>
        </div>
    );
}

export default ComparisonMode;