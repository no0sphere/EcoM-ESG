import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Papa from 'papaparse';
import '../styles/Scroll.css';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';




const ComparisonModeData = () => {


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
        }

        fetchData();
    }, []);

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


    const [error, setError] = useState('');

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



    const CompanySlots = ["Slot0", "Slot1", "Slot2", "Slot3"];

    const backgroundColors = ['#FFFFFF', '#F0F0F0'];

    /*
const users = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Carol', age: 22 }
    ];


const UserItem = ({ user }) => (
    <li>
        {user.name} - Age: {user.age}
    </li>
);
*/


    const [ChosenCompanyNames, setChosenCompanyNames] = useState(["", "", "", ""]);
    const [ChosenCompanyYears, setChosenCompanyYears] = useState(["", "", "", ""]);
    const [ChosenCompanyData, setChosenCompanyData] = useState([[], [], [], []]);

    const [popWindowVisible, setPopWindowVisible] = useState(false);
    const [SlotContentVisible, setSlotContentVisible] = useState([false, false, false, false]);

    // Rating data of 4 companies
    //const [companyData, setCompanyData] = useState([0, 0, 0, 0]);
    // Current slot that user is selecting
    const [CurrentSlot, setCurrentSlot] = useState(null);
    const [CurrentSlotIndex, setCurrentSlotIndex] = useState(null);

    //Add company button onClick function
   const handleSlotClick = (SlotId,index) => {
       console.log("Add company button clicked");
       setCurrentSlot(SlotId);
       console.log("CurrentSlot: ", CurrentSlot);
       setCurrentSlotIndex(index);
       //turn CompanySelecting div to display
       setPopWindowVisible(true);
    };


    const handleCompanySelectingConfirm = async (e) => {
        e.preventDefault(); // prevent refresh
        console.log("Company selected");
        //turn CompanySelecting div to display
        console.log("CurrentSlot: ", CurrentSlot);
        try {
            console.log("selectedIndustry", selectedIndustry);
            console.log("selectedCompany", selectedCompany);
            console.log("selectedYear", selectedYear);
            console.log("get", `GET/api/esg-data?industry="${encodeURIComponent(selectedIndustry.value)}"&company="${encodeURIComponent(selectedCompany)}"&year=${selectedYear.value}`);
            const response = await axios.get(`GET/api/esg-data?industry="${encodeURIComponent(selectedIndustry.value)}"&company="${encodeURIComponent(selectedCompany)}"&year=${selectedYear.value}`);
            if (response.status === 200) {
                console.log("response", response);
                console.log("response.data.data.indicators", response.data.data.indicators);
                let NewCompanyData = [...ChosenCompanyData];
                NewCompanyData[CurrentSlotIndex] = response.data.data.indicators;
                setChosenCompanyData(NewCompanyData);
                console.log("ChosenCompanyData: ", ChosenCompanyData);
                setPopWindowVisible(false);
                let NewSlotContentVisible = [...SlotContentVisible];
                NewSlotContentVisible[CurrentSlotIndex] = true;
                setSlotContentVisible(NewSlotContentVisible);
                let NewCompanySelected = [...ChosenCompanyNames];
                NewCompanySelected[CurrentSlotIndex] = selectedCompany;
                setChosenCompanyNames(NewCompanySelected);
                let NewCompanyYear = [...ChosenCompanyYears];
                NewCompanyYear[CurrentSlotIndex] = selectedYear.label;
                setChosenCompanyYears(NewCompanyYear);
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
            return;
        }

    }



    const RemoveCompany = (index) => {
        console.log("Remove company button clicked");
        let newSlotContentVisible = [...SlotContentVisible];
        newSlotContentVisible[index] = false;
        setSlotContentVisible(newSlotContentVisible);
        let NewCompanySelected = [...ChosenCompanyNames];
        NewCompanySelected[index] = "";
        setChosenCompanyNames(NewCompanySelected);
        let NewCompanyYear = [...ChosenCompanyYears];
        NewCompanyYear[index] = "";
        setChosenCompanyYears(NewCompanyYear);
        let NewCompanyData = [...ChosenCompanyData];
        NewCompanyData[index] = [];
        setChosenCompanyData(NewCompanyData);
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px', margin: '5px', width: '100%', height: '100%'}}>
            {CompanySlots.map((element, index) => (
                <div id={element} key={index} style={{ textAlign: 'center', height: '100%', width: '24%', backgroundColor: backgroundColors[index % 2] , padding: '5px', border : 'darkgrey 1px solid', borderRadius: '10px'}}>
                    <div id={element + "Content"} style={{ display: SlotContentVisible[index] ? 'none' : 'block', height: '100%'}}>
                        <div style={{ marginBottom: '10px', color: '#555' }}>{element}</div>
                        <Button variant="contained" size="medium" id={element + "AddCompany"} style={{ cursor: 'pointer' }} onClick={() => handleSlotClick(element, index)}>
                            <span style={{ marginRight: '5px' }}>+</span>
                            Add Company
                        </Button>
                    </div>
                    <div id={element + "Company"} style={{ display: SlotContentVisible[index] ? 'block' : 'none', height: '100%' }}>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => RemoveCompany(index)} style={{ float: 'right' }}></button>
                        <div id={element + "Company" + "Name&year"} style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px', height: '10%', flexDirection: 'row', 
                        }}>
                            <h5 id={element + "Company" + "Name"} style={{ marginRight: '5px' }}>{ChosenCompanyNames[index] ? ChosenCompanyNames[index] : 'No company selected'}</h5>
                            <h6 id={element + "Company" + "Year"} style={{ marginLeft: '5px' }}>{ChosenCompanyYears[index] ? "(" + ChosenCompanyYears[index] + ")" : '(No year selected)'}</h6>
                        </div>
                        <div className="scrollable-div" id={element + "Company" + "IndicatorTable"} style={{
                            display: 'flex', flexDirection: 'column', paddingRight: '5px', width: '100%', height: '85%', borderTop: '1px solid #000000', overflowY : 'auto', overflowX: 'hidden'
                        }}>
                            <table className="table table-striped">
                                <thead>
                                    <tr style={{ border: '1px solid #000000' }}>
                                        <th style={{ fontSize: '1vw'}} scope="col">Indicator</th>
                                        <th style={{ fontSize: '1vw' }} scope="col">Pillar</th>
                                        <th style={{ fontSize: '1vw' }} scope="col">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ChosenCompanyData[index] && ChosenCompanyData[index].map((indicator, index) => (
                                        <tr key={index} style={{ border: '1px solid #000000'}}>
                                            <Tooltip title={Description.find((item) => item.metric_name === indicator.metric)?.metric_description} arrow>
                                                <td style={{ fontSize: '1vw' }}>{indicator.metric}</td>
                                            </Tooltip>
                                            <td style={{ fontSize: '1vw' }}>{Description.find((item) => item.metric_name === indicator.metric)?.pillar}</td>
                                            <td style={{ fontSize: '1vw' }}>{indicator.value} {indicator.unit}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            ))}
            <div id="CompanySelecting" style={{
                display: popWindowVisible ? 'flex' : 'none' , position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 , justifyContent: 'center', alignItems: 'center'
            }}>
                <div style={{ width: '50%', height: '50%', backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '5px' }}>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setPopWindowVisible(false)}></button>
                    <div>
                        <form>
                            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Select Company</h2>
                            {error && <div className="alert alert-danger mt-2">{error}</div>}
                            <Select options={options_industry} placeholder='industry ' onChange={handleIndustryChange} value={selectedIndustry} className = "mb-3" />
                            <input className="form-control mb-3" type="search" aria-label="Search" placeholder='company'
                                onChange={handleCompanyChange}
                                value={selectedCompany}>
                            </input>
                            <Select options={options_year} placeholder='year' onChange={handleYearChange} value={selectedYear} className = "mb-3" />
                            <Button variant="contained" size="medium" id="CompanySelectingConfirm" style={{ marginTop: '10px' }} onClick={handleCompanySelectingConfirm}>Confirm</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComparisonModeData;