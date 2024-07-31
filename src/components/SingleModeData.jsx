import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Papa from 'papaparse';
import { useNavigate } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';


const SingleModeData = () => {
    /*
    const mock = new MockAdapter(axios);

    //year out of range
    mock.onGet('http://localhost:9090/basic/single?industry=Information%20Technology&company=Apple&year=1000').reply(1002, {
        "code": "1002",
        "status": 1002,
        "message": "The year entered is out of range or out of format.",
        "timestamp": 1721670835582,
        "data": null,
        "error": null
    });

    mock.onGet('http://localhost:9090/basic/single?industry=Financial%20Technology%20(Fintech)%20%26%20Infrastructure&company=Aspen%20Pharmacare%20Holdings%20Ltd&year=2018').reply(config => {
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

    mock.onGet(/.+/).reply(1004, {
        "code": "1004",
        "status": 1004,
        "message": "Can't find any data for this company in this industry for this year.",
        "timestamp": 1721670835582,
        "data": null,
        "error": null
    });
    */

    const navigate = useNavigate();

    useEffect(() => { // Check if the user is logged in
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


    const [error, setError] = useState('');

    const handleCompanySelecting = async (e) => {
        setIndicators([]);
        e.preventDefault(); // prevent refresh
        try {
            console.log("selectedIndustry", selectedIndustry);
            console.log("selectedCompany", selectedCompany);
            console.log("selectedYear", selectedYear);
            console.log("get", `http://localhost:9090/basic/single?industry=${encodeURIComponent(selectedIndustry.value)}&company=${encodeURIComponent(selectedCompany)}&year=${selectedYear.value}`,
            { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
            );
            const response = await axios.get(`http://localhost:9090/basic/single?industry=${encodeURIComponent(selectedIndustry.value)}&company=${encodeURIComponent(selectedCompany)}&year=${selectedYear.value}`,
            { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
            );
            if (response.status === 200) {
                console.log("response", response);
                setIndicators(response.data.data.metrics);
                console.log("Indicators", Indicators);
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
    };


    const options_year = [...Array(2022 - 2000).keys()].map((i) => {
        return { value: 2000 + i, label: 2000 + i };
        });



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

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
            fontSize: 18
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 16
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
        <div className="container">
            <form>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', padding: '10px', margin: '20px', width: '95%' }}>
                    <div style={{ width:'25%'}}>
                        <Select options={options_industry.map((item) => { return { value: item.industry_name, label: item.industry_name } }) }
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
                <div id="IndicatorTable" style={{ height: '90%'}}> 
                    <div id="CompanyName&year" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
                        <h2 style={{ marginRight: '5px' }}>{selectedCompany ? selectedCompany : 'No company selected'}</h2>
                        <h5 style={{ marginLeft: '5px' }}>{selectedYear ? "(" + selectedYear.label + ")" : '(No year selected)'}</h5>
                    </div>
                    <TableContainer component={Paper} sx={{
                        display: 'flex', justifyContent: 'center', width: '100%', height: '100%', overflow: 'auto'
                    }}>
                        <Table>
                            <TableHead style={{ height: '8vh' }}>
                                <TableRow>
                                    <StyledTableCell scope="col">Indicator</StyledTableCell>
                                    <StyledTableCell scope="col">Pillar</StyledTableCell>
                                    <StyledTableCell scope="col">Description</StyledTableCell>
                                    <StyledTableCell scope="col">Value</StyledTableCell>
                            </TableRow>
                        </TableHead>
                            <TableBody>
                            {Indicators.map((indicator, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{indicator.metric}</StyledTableCell>
                                    <StyledTableCell>{Description.find((item) => item.metric_name === indicator.metric)?.pillar}</StyledTableCell>
                                    <StyledTableCell>{Description.find((item) => item.metric_name === indicator.metric)?.metric_description}</StyledTableCell>
                                    <StyledTableCell>{indicator.value} {indicator.unit}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}

export default SingleModeData;