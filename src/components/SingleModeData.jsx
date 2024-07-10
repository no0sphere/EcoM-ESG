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
    const [selectedYear, setSelectedYear] = useState(null);

    const handleCompanyChange = (selectedCompany) => {
        setSelectedCompany(selectedCompany);
    };

    const handleYearChange = (selectedYear) => {
        setSelectedYear(selectedYear);
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
                    <Select options={options_year}
                        placeholder='year'
                    onChange={handleYearChange}
                        value={selectedYear}
                    />
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', margin: '10px', width: '100%', height: '40vw' }}>
                <div id="IndicatorTable" >
                    <div id="CompanyName&year" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
                        <h2 style={{ marginRight: '5px' }}>{selectedCompany ? selectedCompany.label : 'No company selected'}</h2>
                        <h2 style={{ marginLeft: '5px' }}>{selectedYear ? selectedYear.label : 'No year selected'}</h2>
                    </div>
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
            </div>
        </div>
    );
}

export default SingleModeData;