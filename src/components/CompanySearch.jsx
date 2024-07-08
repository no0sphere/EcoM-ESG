import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CompanySearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    const handleSearch = () => {
        if (searchTerm === 'A') {
            const result = {
                rating: 23.12,
                suggestion: 'This is suggestion, ............'
            };
            setSearchResult(result);
        } else {
            setSearchResult(null);
            alert('Search button clicked! No results for this company.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control d-inline-block"
                    placeholder="please enter the company name:"
                    style={{ width: '300px' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className="btn btn-primary ms-2"
                    onClick={handleSearch}
                >
                    search
                </button>
            </div>
            {searchResult ? (
                <div className="row">
                    <div className="col-md-6">
                        <h5><strong>Company A:</strong></h5>
                        <p>It's ESG rating is: {searchResult.rating}</p>
                        <p>Suggestion:</p>
                        <p>{searchResult.suggestion}</p>
                        <button className="btn btn-primary">Download report</button>
                    </div>
                    <div className="col-md-6">
                        <img src="/public/CompanyResult.png" alt="Company Result" className="img-fluid" />
                    </div>
                </div>
            ) : (
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">we are trying to update our experience</h4>
                    <p>We don't have the metrics of this company to compute this frame, please select another frame or company</p>
                    <hr />
                    <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
                </div>
            )}
        </div>
    );
};

export default CompanySearch;
