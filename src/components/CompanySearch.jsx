import RatingReport from './RatingReport';
import DownloadReport from './DownloadReport';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import Select from "react-select";
import { useParams, useLocation } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';


ChartJS.register(ArcElement, Tooltip, Legend);

const CompanySearch = () => {
    const { frameworkName } = useParams();
    const userName = localStorage.getItem('username');
    const location = useLocation();
    const { simplifiedFrame } = location.state || {};
    const navigate = useNavigate();
    const mock = new MockAdapter(axios);

    // 400 Bad Request
    mock.onGet(`/api/rating?framework_name=${frameworkName}&user_name=${userName}&industry=Information%20Technology&company=Apple&year=1000`).reply(400, {
        "code": 400,
        "status": "failed",
        "message": "'year' must be a valid number representing the year.",
        "timestamp": 1718203200000,
        "data": null,
    });

    // Successful response
    mock.onGet(`/api/rating?framework_name=${frameworkName}&user_name=${userName}&industry=Finance&company=JPMorgan&year=2021`).reply(200, {
        "code": 200,
        "status": "succeed",
        "message": "ESG Rating calculated successfully.",
        "timestamp": 1718203200000,
        "data": 17.96
    });

    // 404 Not Found
    mock.onGet(`/api/rating?framework_name=${frameworkName}&user_name=${userName}&industry=Information%20Technology&company=Apple&year=2022`).reply(404, {
        "code": 404,
        "status": "failed",
        "message": "Didn’t find any data for this company in this industry for this year.",
        "timestamp": 1718203200000,
        "data": null
    });

    const [error, setError] = useState('');
    const [rating, setRating] = useState(null);
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleCompanySelecting = async (e) => {
        setRating(null);
        setError('');
        e.preventDefault(); // prevent refresh
        setIsSubmitted(true);
        try {
            const response = await axios.get(`/api/rating?framework_name=${frameworkName}&user_name=${userName}&industry=${encodeURIComponent(selectedIndustry.value)}&company=${encodeURIComponent(selectedCompany)}&year=${selectedYear}`);
            if (response.status === 200) {
                setRating(response.data.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError('Can\'t find rating of this company in this year');
            } else if (error.response && error.response.status === 400) {
                setError('Year must be a valid number representing the year.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    const options_industry = [
        { value: 'Finance', label: 'Finance' },
        { value: 'Health Care', label: 'Health Care' },
        { value: 'Energy', label: 'Energy' },
        { value: 'Industrials', label: 'Industrials' },
        { value: 'Materials', label: 'Materials' },
        { value: 'Utilities', label: 'Utilities' },
        { value: 'Telecommunication Services', label: 'Telecommunication Services' },
        { value: 'Real Estate', label: 'Real Estate' },
        { value: 'Consumer Staples', label: 'Consumer Staples' },
        { value: 'Consumer Discretionary', label: 'Consumer Discretionary' },
        { value: 'Information Technology', label: 'Information Technology' }
    ];

    const handleCompanyChange = (e) => {
        error && setError('');
        setSelectedCompany(e.target.value);
    };

    const handleYear = (e) => {
        error && setError('');
        setSelectedYear(e.target.value);
    };

    const handleIndustry = (e) => {
        error && setError('');
        setSelectedIndustry(e);
    };


    const pieData = {
        labels: Object.keys(simplifiedFrame || {}).filter(key => key.includes('metrics')),
        datasets: [{
            data: Object.keys(simplifiedFrame || {}).filter(key => key.includes('metrics')).map(key => simplifiedFrame[key]),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
            ]
        }]
    };

    const pieOptions = {
        plugins: {
            legend: {
                display: false
            }
        }
    };

    const handleDownload = () => {
        navigate('/downloadreport', { state: { rating, simplifiedFrame, pieData, pieOptions, selectedIndustry, selectedCompany,selectedYear } });
    };
    return (
        <div className="container" style={{ minHeight: '100vh' }}>
            <form>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', padding: '10px', margin: '20px', width: '95%' }}>
                    <div style={{ width:'25%' }}>
                        <Select options={options_industry}
                                placeholder='industry'
                                onChange={handleIndustry}
                                value={selectedIndustry} />
                    </div>
                    <div style={{ width: '25%' }}>
                        <input className="form-control me-2" type="search" aria-label="Search" placeholder='company'
                               onChange={handleCompanyChange}
                               value={selectedCompany}>
                        </input>
                    </div>
                    <div style={{ width: '25%' }}>
                        <input className="form-control me-2" type="number" aria-label="Year" placeholder='year'
                               onChange={handleYear}
                               value={selectedYear}>
                        </input>
                    </div>
                    <div style={{ width: '10%' }}>
                        <button type="submit" className="btn btn-primary" onClick={handleCompanySelecting}>Search</button>
                    </div>
                </div>
            </form>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            {isSubmitted ? (
                rating !== null && (
                    <div>
                        <RatingReport 
                            rating={rating} 
                            simplifiedFrame={simplifiedFrame} 
                            pieData={pieData} 
                            pieOptions={pieOptions} 
                            Industry={selectedIndustry}
                            Company={selectedCompany}
                            Year={selectedYear}
                        />
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <button className="btn btn-primary" onClick={handleDownload}>Download report</button>
                        </div>
                    </div>
                )
            ) : (
                <div className="container my-5">

                    <div className="content">
                        <h3 className="mb-3">Frame Select - User Guide</h3>

                        <section className="mb-4">
                            <h4>Industry</h4>
                            <p>You need to select a Industry where the company belongs. E.G: Apple belongs to IT</p>
                        </section>
                        <section className="mb-4">
                            <h4>Company and Year</h4>
                            <p>Typing company name in second input. Finally, give us a year which you want to search, please do not typing years like 1000.</p>
                        </section>

                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanySearch;
