import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AccordionMenu from './AccordionMenu';
import SingleModeData from './SingleModeData';


const SingleMode = () => {

    const styleSingleMode = {
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px', margin: '20px', width: '95%'
    };

    return (
        <div>
            <div style={styleSingleMode}>
                <SingleModeData />
            </div>
        </div>
    );
}

export default SingleMode;