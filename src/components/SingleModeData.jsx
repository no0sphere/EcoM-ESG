import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


const SingleModeData = () => {

    const mock = new MockAdapter(axios);

    mock.onGet('/.*/').reply(401, {
        "success": false,
        "data": null,
        "error": {
            "code": 404,
            "message": "Can¡¯t find data of this company"
        }
    }
);
    mock.onGet('GET/api/esg-data?industry=Information%20Technology&company=Apple&year=2023').reply(200, {
        "success": true,
        "data": {
            "industry": "Information Technology",
            "company": "Apple",
            "year": 2023,
            "indicators": [
                { "metric": "CO2 Emissions", "value": 14000, "unit": "tonnes" },
                { "metric": "Water Usage", "value": 5000, "unit": "cubic meters" },
                { "metric": "Employee Turnover", "value": 5, "unit": "%" }
            ]
        },
        "error": null
    });

    const [error, setError] = useState('');

    const handleCompanySelecting = async (e) => {
        setIndicators([]);
        e.preventDefault();
        try {
            console.log("selectedIndustry", selectedIndustry);
            console.log("selectedCompany", selectedCompany);
            console.log("selectedYear", selectedYear);
            console.log("get", `GET/api/esg-data?industry=${encodeURIComponent(selectedIndustry.value)}&company=${encodeURIComponent(selectedCompany.value)}&year=${selectedYear.value}`);
            const response = await axios.get(`GET/api/esg-data?industry=${encodeURIComponent(selectedIndustry.value)}&company=${encodeURIComponent(selectedCompany.value)}&year=${selectedYear.value}`);
            if (response.status === 200) {
                console.log("response", response);
                setIndicators(response.data.data.indicators);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("error", error.response);
                setError('Can\'t find data of this company');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };



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
        { value: 'Information Technology', label: 'Information Technology' }
    ];

    const options_company = [
        { value: 'Apple', label: 'Apple' },
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];

    const options_year = [
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' },
        { value: '2024', label: '2024' }
    ];

    const [Indicators, setIndicators] = useState([]);

    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);

    const handleCompanyChange = (selectedCompany) => {
        error && setError('');
        setSelectedCompany(selectedCompany);
    };

    const handleYearChange = (selectedYear) => {
        error && setError('');
        setSelectedYear(selectedYear);
    }

    const handleIndustryChange = (selectedIndustry) => {
        error && setError('');
        setSelectedIndustry(selectedIndustry);
        }

    return (
        <div className="container">
            <form>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', padding: '10px', margin: '20px', width: '95%' }}>
                    <div style={{ width:'25%'}}>
                        <Select options={options_industry}
                            placeholder='industry'
                            onChange={handleIndustryChange}
                            value={selectedIndustry} />
                    </div>
                    <div style={{ width: '25%' }}>
                        <Select
                            options={options_company}
                            placeholder='company'
                            onChange={handleCompanyChange}
                            value={selectedCompany} />
                    </div>
                    <div style={{ width: '25%' }}>
                        <Select options={options_year}
                            placeholder='year'
                        onChange={handleYearChange}
                            value={selectedYear}
                        />
                    </div>
                    <div style={{ width: '10%' }}>
                        <button type="submit" className="btn btn-primary" onClick={handleCompanySelecting}>Submit</button>
                    </div>
                 </div>
            </form>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
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
                            {Indicators.map((indicator, index) => (
                            <tr key={index}>
                                <td>{indicator.metric}</td>
                                <td>{indicator.value} {indicator.unit}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SingleModeData;