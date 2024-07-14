import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import '../styles/Scroll.css';

import Button from '@mui/material/Button';




const ComparisonModeData = () => {

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

    const mock = new MockAdapter(axios);

    mock.onGet('/.*/').reply(404, {
        "success": false,
        "data": null,
        "error": {
            "code": 404,
            "message": "Can¡¯t find data of this company"
        }
    }
    );
    mock.onGet('GET/api/esg-data?industry="Information%20Technology"&company="Apple"&year=2023').reply(200, {
        "success": true,
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
                { "metric": "Employee Turnover", "value": 5, "unit": "%" },
            ]
        },
        "error": null
    });


    const [error, setError] = useState('');

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
            console.log("get", `GET/api/esg-data?industry="${encodeURIComponent(selectedIndustry.value)}"&company="${encodeURIComponent(selectedCompany.value)}"&year=${selectedYear.value}`);
            const response = await axios.get(`GET/api/esg-data?industry="${encodeURIComponent(selectedIndustry.value)}"&company="${encodeURIComponent(selectedCompany.value)}"&year=${selectedYear.value}`);
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
                NewCompanySelected[CurrentSlotIndex] = selectedCompany.label;
                setChosenCompanyNames(NewCompanySelected);
                let NewCompanyYear = [...ChosenCompanyYears];
                NewCompanyYear[CurrentSlotIndex] = selectedYear.label;
                setChosenCompanyYears(NewCompanyYear);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("error", error.response);
                setError('Can\'t find data of this company');
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
                <div id={element} key={index} style={{ textAlign: 'center', height: '50vh', width: '20vw', backgroundColor: backgroundColors[index % 2] , padding: '10px', border : 'darkgrey 1px solid', borderRadius: '10px'}}>
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
                            display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px', height: '15%', flexDirection: 'row', 
                        }}>
                            <h5 id={element + "Company" + "Name"} style={{ marginRight: '5px' }}>{ChosenCompanyNames[index] ? ChosenCompanyNames[index] : 'No company selected'}</h5>
                            <h6 id={element + "Company" + "Year"} style={{ marginLeft: '5px' }}>{ChosenCompanyYears[index] ? "(" + ChosenCompanyYears[index] + ")" : '(No year selected)'}</h6>
                        </div>
                        <div className="scrollable-div" id={element + "Company" + "IndicatorTable"} style={{
                            display: 'flex', flexDirection: 'column', padding: '10px', margin: '10px', width: '95%', alignItems: 'center', overflow: 'auto', height: '75%', borderTop: '1px solid #000000', 
                        }}>
                            <table className="table table-striped">
                                <thead>
                                    <tr style={{ border: '1px solid #000000' }}>
                                        <th scope="col">Indicator</th>
                                        <th scope="col">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ChosenCompanyData[index] && ChosenCompanyData[index].map((indicator, index) => (
                                        <tr key={index} style={{ border : '1px solid #000000' }}>
                                            <td>{indicator.metric}</td>
                                            <td>{indicator.value} {indicator.unit}</td>
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
                            <Select options={options_industry} placeholder='industry ' onChange={handleIndustryChange} value={selectedIndustry} />
                            <Select options={options_company} placeholder='company' onChange={handleCompanyChange} value={selectedCompany} />
                            <Select options={options_year} placeholder='year' onChange={handleYearChange} value={selectedYear} />
                            <Button variant="contained" size="medium" id="CompanySelectingConfirm" style={{ marginTop: '10px' }} onClick={handleCompanySelectingConfirm}>Confirm</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComparisonModeData;