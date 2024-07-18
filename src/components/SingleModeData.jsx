import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Papa from 'papaparse';


const SingleModeData = () => {

    const mock = new MockAdapter(axios);

    mock.onGet('/.*/').reply(404, {
        "code": 404,
        "status": "failed",
        "message": "Didn¡¯t find any data for this company in this industry for this year.",
        "timestamp": 1718203200000,
        "data": null
    });

    //year out of range
    mock.onGet('GET/api/esg-data?industry="Information%20Technology"&company="Apple"&year=1000').reply(400, {
        "code": 400,
        "status": "failed",
        "message": "'year' must be a valid number representing the year.",
        "timestamp": 1718203200000,
        "data": null,
    });

    mock.onGet('GET/api/esg-data?industry="Information%20Technology"&company="Apple"&year=2023').reply(200, {
        "code": 200,
        "status": "succeed",
        "message": "Found data for this company.",
        "timestamp": 1718203200000,
        "data": {
            "industry": "Information Technology",
            "company": "Apple",
            "year": 2023,
            "indicators": [
                { "metric": "CO2 Emissions", "value": 14000, "unit": "tonnes" },
                { "metric": "Water Usage", "value": 5000, "unit": "cubic meters" },
                { "metric": "Employee Turnover", "value": 5, "unit": "%" },
                { "metric": "CO2 Emissions", "value": 14000, "unit": "tonnes" },
                { "metric": "Water Usage", "value": 5000, "unit": "cubic meters" },
                { "metric": "Employee Turnover", "value": 5, "unit": "%" },
                { "metric": "CO2 Emissions", "value": 14000, "unit": "tonnes" },
                { "metric": "Water Usage", "value": 5000, "unit": "cubic meters" },
                { "metric": "AIRPOLLUTANTS_DIRECT", "value": 114514, "unit": "USD" },
            ]
        },
        "error": null
    });

    //Read the Description from the csv file in public folder
    const [Description, setDescription] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/MetricDescription.csv');
            const reader = response.body.getReader();
            const result = await reader.read(); // raw read of the stream
            const decoder = new TextDecoder('utf-8');
            const csv = decoder.decode(result.value); // convert stream to text
            Papa.parse(csv, {
                complete: function (results) {
                    console.log('Parsed results:', results);
                    setDescription(results.data);
                },
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true
            });
            console.log("Description", Description[0]);
        }

        fetchData();
    }, []);


    const [error, setError] = useState('');

    const handleCompanySelecting = async (e) => {
        setIndicators([]);
        e.preventDefault(); // prevent refresh
        try {
            console.log("selectedIndustry", selectedIndustry);
            console.log("selectedCompany", selectedCompany);
            console.log("selectedYear", selectedYear);
            console.log("get", `GET/api/esg-data?industry="${encodeURIComponent(selectedIndustry.value)}"&company="${encodeURIComponent(selectedCompany)}"&year=${selectedYear.value}`);
            const response = await axios.get(`GET/api/esg-data?industry="${encodeURIComponent(selectedIndustry.value)}"&company="${encodeURIComponent(selectedCompany)}"&year=${selectedYear.value}`);
            if (response.status === 200) {
                console.log("response", response);
                setIndicators(response.data.data.indicators);
                console.log("Indicators", Indicators);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("error", error.response);
                setError('Can\'t find data of this company');

            } else if (error.response && error.response.status === 400) {
                console.log("error", error.response);
                setError('Year must be a valid number representing the year.');
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


    const options_year = [
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' },
        { value: '2024', label: '2024' }
    ];

    const [Indicators, setIndicators] = useState([]);

    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedYear, setSelectedYear] = useState(null);

    const handleCompanyChange = (e) => {
        error && setError('');
        setSelectedCompany(e.target.value);
    };

    const handleYearChange = (e) => {
        error && setError('');
        setSelectedYear(e);
    }

    const handleIndustryChange = (e) => {
        error && setError('');
        setSelectedIndustry(e);
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
                        <input className="form-control me-2" type="search"  aria-label="Search" placeholder='company'
                            onChange={handleCompanyChange}
                            value={selectedCompany}>
                            </input>
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
                <div id="IndicatorTable" style={{ overflow: 'auto' }}>
                    <div id="CompanyName&year" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
                        <h2 style={{ marginRight: '5px' }}>{selectedCompany ? selectedCompany : 'No company selected'}</h2>
                        <h5 style={{ marginLeft: '5px' }}>{selectedYear ? "(" + selectedYear.label + ")" : '(No year selected)'}</h5>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Indicator</th>
                                <th scope="col">Pillar</th>
                                <th scope="col">Description</th>
                                <th scope="col">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Indicators.map((indicator, index) => (
                            <tr key={index}>
                                    <td style= {{ width: '20%' }}>{indicator.metric}</td>
                                    <td style= {{ width: '15%' }}>{Description.find((item) => item.metric_name === indicator.metric)?.pillar}</td>
                                    <td style= {{ width: '40%' }}>{Description.find((item) => item.metric_name === indicator.metric)?.metric_description}</td>
                                    <td style= {{ width: '25%' }}>{indicator.value} {indicator.unit}</td>
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