import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';




const options_industry = [
    { value: 'financials', label: 'Financials' },
    { value: 'health care', label: 'Health Care' },
    { value: 'energy', label: 'Energy' },
    { value: 'industrials', label: 'Industrials' },
    { value: 'materials', label: 'Materials' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'telecommunication services', label: 'Telecommunication Services' },
    { value: 'real estate', label: 'Real Estate' },
    { value: 'consumer staples', label: 'Consumer Staples' },
    { value: 'consumer discretionary', label: 'Consumer Discretionary' },
    { value: 'information technology', label: 'Information Technology' }
];

const options_company = [
    { value: 'apple', label: 'apple' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

const options_year = [
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' }
];


const SingleModeData = () => {

    const [selectedCompany, setSelectedCompany] = useState(null);

    const handleCompanyChange = (selectedCompany) => {
        setSelectedCompany(selectedCompany);
    };


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
        <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', padding: '10px', margin: '20px', width: '95%' }}>
                <div style={{ width:'30%'}}>
                    <Select options={options_industry} placeholder='industry' />
                </div>
                <div style={{ width: '30%' }}>
                    <Select
                        options={options_company}
                        placeholder='company'
                        onChange={handleCompanyChange}
                        value={selectedCompany} />
                </div>
                <div style={{ width: '30%' }}>
                    <Select options={options_year} placeholder='year' />
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', margin: '10px', width: '100%', height: '40vw' }}>
                <div style={{ display: 'flex', padding: '10px', margin: '10px', width: '95%' }}>
                    <input type="radio"
                        className="btn-check"
                        name="RorI"
                        id="btnRating"
                        onClick={() => handleRorIChange('Rating')}
                        defaultChecked  />
                    <label className="btn btn-outline-primary" htmlFor="btnRating">Rating</label>

                    <input type="radio"
                        className="btn-check"
                        name="RorI"
                        id="btnIndicators"
                        onClick={() => handleRorIChange('Indicators')} />
                    <label className="btn btn-outline-primary" htmlFor="btnIndicators">Indicators</label>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderLeft: '10px', width: '60%' }}>
                        {selectedCompany
                            ? <p style={{ margin: '0px', fontFamily: 'Arial, sans-serif', fontSize: '1.5em', fontWeight: 'bold' }} >{selectedCompany.label}</p>
                            : <p style={{ margin: '0px', fontFamily: 'Arial, sans-serif', fontSize: '1.5em', fontWeight: 'bold' }}>No company selected</p>}
                    </div>
                </div>
                <div id="IndicatorTable" style={{ display: 'none' }}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Indicator</th>
                                <th scope="col">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Indicator 1</td>
                                <td>Value 1</td>
                            </tr>
                            <tr>
                                <td>Indicator 2</td>
                                <td>Value 2</td>
                            </tr>
                            <tr>
                                <td>Indicator 3</td>
                                <td>Value 3</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="Rating" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row', padding: '10px', margin: '10px', width: '95%', height: '90%', border: '1px solid black' }}>
                    <div>
                        <h1 style={{ margin: '0px', fontFamily: 'Arial, sans-serif', fontSize: '3em', fontWeight: 'bold' }}>Rating:</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleModeData;