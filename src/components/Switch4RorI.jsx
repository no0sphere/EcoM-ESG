import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';


    // control the display of the IndicatorTable and rating
    const handleRorIChange = (RorI) => {
        if (RorI === 'Rating') {
            document.getElementById('Rating').style.display = 'flex';
            document.getElementById('IndicatorTable').style.display = 'none';
        } else if (RorI === 'Indicators') {
            document.getElementById('Rating').style.display = 'none';
            document.getElementById('IndicatorTable').style.display = 'block';
        }
        else {
            document.getElementById('Rating').style.display = 'none';
            document.getElementById('IndicatorTable').style.display = 'none';
            }

}
return (
    <div style={{ display: 'flex', padding: '10px', margin: '10px', width: '95%' }}>
        <input type="radio"
            className="btn-check"
            name="RorI"
            id="btnRating"
            onClick={() => handleRorIChange('Rating')}
        />
        <label className="btn btn-outline-primary" htmlFor="btnRating">Rating</label>

        <input type="radio"
            className="btn-check"
            name="RorI"
            id="btnIndicators"
            onClick={() => handleRorIChange('Indicators')}
            defaultChecked />
        <label className="btn btn-outline-primary" htmlFor="btnIndicators">Indicators</label>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderLeft: '10px', width: '60%' }}>
            {selectedCompany
                ? <p style={{ margin: '0px', fontFamily: 'Arial, sans-serif', fontSize: '1.5em', fontWeight: 'bold' }} >{selectedCompany.label}</p>
                : <p style={{ margin: '0px', fontFamily: 'Arial, sans-serif', fontSize: '1.5em', fontWeight: 'bold' }}>No company selected</p>}
        </div>
    </div>
    );