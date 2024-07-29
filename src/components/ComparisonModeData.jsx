import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Papa from 'papaparse';
import { useNavigate } from "react-router-dom";
import '../styles/Scroll.css';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';




const ComparisonModeData = () => {

    const navigate = useNavigate();

    useEffect(() => { // get token from local storage
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

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

    //Read the Industry from the csv file in public folder
    const [options_industry, setOptions_Industry] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/industry.csv');
            const reader = response.body.getReader();
            const result = await reader.read(); // raw read of the stream
            const decoder = new TextDecoder('utf-8');
            const csv = decoder.decode(result.value); // convert stream to text
            Papa.parse(csv, {
                complete: function (results) {
                    console.log('Parsed results:', results);
                    setOptions_Industry(results.data);
                },
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true
            });
        }
        fetchData();
    }, []);


    const options_year = [...Array(2022 - 2000).keys()].map((i) => {
        return { value: 2000 + i, label: 2000 + i };
    });


    const mock = new MockAdapter(axios);

    //year out of range
    mock.onGet('/single?industry=Information%20Technology&company=Apple&year=1000').reply(1002, {
        "code": "1002",
        "status": 1002,
        "message": "The year entered is out of range or out of format.",
        "timestamp": 1721670835582,
        "data": null,
        "error": null
    });

    mock.onGet('/single?industry=Financial%20Technology%20(Fintech)%20%26%20Infrastructure&company=Aspen%20Pharmacare%20Holdings%20Ltd&year=2018').reply(config => {
        if (config.headers && config.headers.Authorization === 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsidXNlcmlkIjpudWxsLCJ1c2VybmFtZSI6InRlc3R1c2VyMTgifSwiZXhwIjoxNzIxNzE4NjcyfQ.iil9h5Htzd9QrC4ciq3sXX-UiuWZaOszyUxCogRwi-Q') {
            return [200, {
                "code": "200",
                "status": 200,
                "message": "Success",
                "timestamp": 1721671831632,
                "data": {
                    "industry": "Financial Technology (Fintech) & Infrastructure",
                    "company": "Aspen Pharmacare Holdings Ltd",
                    "year": 2018,
                    "metrics": [
                        {
                            "metric": "TURNOVEREMPLOYEES",
                            "value": 12.3,
                            "unit": "%"
                        },
                        {
                            "metric": "AIRPOLLUTANTS_INDIRECT",
                            "value": 1.74725E7,
                            "unit": "USD (000)"
                        },
                        {
                            "metric": "TURNOVEREMPLOYEES",
                            "value": 12.3,
                            "unit": "%"
                        },
                        {
                            "metric": "AIRPOLLUTANTS_INDIRECT",
                            "value": 1.74725E7,
                            "unit": "USD (000)"
                        },
                        {
                            "metric": "TURNOVEREMPLOYEES",
                            "value": 12.3,
                            "unit": "%"
                        },
                        {
                            "metric": "AIRPOLLUTANTS_INDIRECT",
                            "value": 1.74725E7,
                            "unit": "USD (000)"
                        },
                        {
                            "metric": "TURNOVEREMPLOYEES",
                            "value": 12.3,
                            "unit": "%"
                        },
                        {
                            "metric": "AIRPOLLUTANTS_INDIRECT",
                            "value": 1.74725E7,
                            "unit": "USD (000)"
                        },
                        {
                            "metric": "TURNOVEREMPLOYEES",
                            "value": 12.3,
                            "unit": "%"
                        },
                        {
                            "metric": "AIRPOLLUTANTS_INDIRECT",
                            "value": 1.74725E7,
                            "unit": "USD (000)"
                        },
                        {
                            "metric": "TURNOVEREMPLOYEES",
                            "value": 12.3,
                            "unit": "%"
                        },
                        {
                            "metric": "AIRPOLLUTANTS_INDIRECT",
                            "value": 1.74725E7,
                            "unit": "USD (000)"
                        },
                    ]
                },
                "error": null
            }];
        } else {

            return [500, {
                "code": "500",
                "status": 500,
                "message": "Authentication failed. Please log in first.",
                "timestamp": 1721670835582,
                "data": null,
                "error": null
            }];
        }
    });

    mock.onGet(/.*/).reply(1004, {
        "code": "1004",
        "status": 1004,
        "message": "Can't find any data for this company in this industry for this year.",
        "timestamp": 1721670835582,
        "data": null,
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
            console.log("get", `/single?industry=${encodeURIComponent(selectedIndustry.value)}&company=${encodeURIComponent(selectedCompany)}&year=${selectedYear.value}`,
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
            );
            const response = await axios.get(`/single?industry=${encodeURIComponent(selectedIndustry.value)}&company=${encodeURIComponent(selectedCompany)}&year=${selectedYear.value}`,
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
            );
            if (response.status === 200) {
                console.log("response", response);
                console.log("response.data.data.indicators", response.data.data.metrics);
                let NewCompanyData = [...ChosenCompanyData];
                NewCompanyData[CurrentSlotIndex] = response.data.data.metrics;
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
            console.log("error", error);
            if (error.response && error.response.status === 1000) { //input company is out of format
                setError('The company name entered does not conform to the format.');
            } else if (error.response && error.response.status === 1001) {
                setError('The industry entered does not conform to the format.');
            } else if (error.response && error.response.status === 1002) {
                setError('The year entered is out of range or out of format.');
            }
            else if (error.response && error.response.status === 1003) {
                setError('There is no such company under this industry.');
            }
            else if (error.response && error.response.status === 1004) {
                setError('Can\'t find any data for this company in this industry for this year.');
            }
            else {
                setError('Something went wrong. Please try again later.');
            }
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


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 13
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));


    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px', margin: '5px', width: '100%', height: '100%'}}>
            {CompanySlots.map((element, index) => (
                <div id={element} key={index} style={{ textAlign: 'center', height: '100%', width: '24%', backgroundColor: backgroundColors[index % 2] , border : 'darkgrey 1px solid', borderRadius: '10px'}}>
                    <div id={element + "Content"} style={{ display: SlotContentVisible[index] ? 'none' : 'block', height: '100%'}}>
                        <div style={{ marginBottom: '10px', color: '#555' }}>{element}</div>
                        <Button variant="contained" size="medium" id={element + "AddCompany"} style={{ cursor: 'pointer' }} onClick={() => handleSlotClick(element, index)}>
                            <span style={{ marginRight: '5px' }}>+</span>
                            Add Company
                        </Button>
                    </div>
                    <div id={element + "Company"} style={{ display: SlotContentVisible[index] ? 'block' : 'none', height: '100%', position: 'relative',paddingTop: '25px' }}>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => RemoveCompany(index)} style={{ position: 'absolute', top: '8px', right: '8px' }}></button>
                        <div id={element + "Company" + "Name&year"} style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10%', flexDirection: 'row',
                        }}>
                            <h5 id={element + "Company" + "Name"} style={{ marginRight: '5px' }}>{ChosenCompanyNames[index] ? ChosenCompanyNames[index] : 'No company selected'}</h5>
                            <h6 id={element + "Company" + "Year"} style={{ marginLeft: '5px' }}>{ChosenCompanyYears[index] ? "(" + ChosenCompanyYears[index] + ")" : '(No year selected)'}</h6>
                        </div>

                        <TableContainer component={Paper} sx={{
                            display: 'flex', justifyContent: 'center', width: '100%', height: '90%', overflow: 'auto'
                        }} className="scrollable-div">
                            <Table sx={{ width: '100%' }}>
                                <TableHead>
                                   <TableRow>
                                            <StyledTableCell sx={{ fontSize: '1vw' }}
                                                scope="col">Indicator</StyledTableCell>
                                            <StyledTableCell sx={{ fontSize: '1vw' }}
                                                scope="col">Pillar</StyledTableCell>
                                            <StyledTableCell sx={{ fontSize: '1vw' }}
                                                scope="col">Value</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                    <TableBody>
                                    {ChosenCompanyData[index] && ChosenCompanyData[index].map((indicator, index) => (
                                        <StyledTableRow key={index}>
                                            <Tooltip title={Description.find((item) => item.metric_name === indicator.metric)?.metric_description} arrow>
                                                <StyledTableCell>{indicator.metric}</StyledTableCell>
                                            </Tooltip>
                                            <StyledTableCell>{Description.find((item) => item.metric_name === indicator.metric)?.pillar}</StyledTableCell>
                                            <StyledTableCell>{indicator.value} {indicator.unit}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                                </Table>
                            </TableContainer>

                    </div>
                </div>
            ))}
            <div id="CompanySelecting" style={{
                display: popWindowVisible ? 'flex' : 'none' , position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 , justifyContent: 'center', alignItems: 'center'
            }}>
                <div style={{ width: '50%', height: '50%', backgroundColor: '#FFFFFF', padding: '15px', borderRadius: '5px', position: 'relative' }}>
                    <button type="button" className="btn-close" aria-label="Close" style={{ position: 'absolute', top: '15px', right: '15px' }}
                        onClick={() => setPopWindowVisible(false)}></button>
                    <div style={{
                        height: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'
                    }}>
                        {error && <Alert severity="error" sx={{ width: "85%", margin: "auto" }}>{error}</Alert>}
                    </div>
                    <div>
                        <form>
                            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Select Company</h2>
                            <Select options={options_industry.map((item) => { return { value: item.industry_name, label: item.industry_name } })}
                                placeholder='industry ' onChange={handleIndustryChange} value={selectedIndustry} className="mb-3" />
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