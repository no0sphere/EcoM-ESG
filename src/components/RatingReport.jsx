import React, { useEffect, useRef } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';

const RatingReport = ({ data, pieData, pieOptions, barData, barOptions, descriptions, Industry, Company, Year }) => {
    if (!data || data.length < 2) {
        return <div>No data available</div>;
    }

    const barChartRef = useRef(null);

    return (
        <div className="container mt-4" style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontWeight: 600, color: '#333' }}>{Industry.label} - {Company} ({Year})</h3>
            <div className="row">
                <div className="col-md-8">
                    <p>This report provides a comprehensive analysis of the selected company's metrics and compares them with the industry average.</p>
                </div>
                <div className="col-md-4">
                    <div className="chart-container" style={{ width: '100%', height: '300px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <Doughnut data={pieData} options={pieOptions} />
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="chart-container" style={{ width: '100%', height: '400px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <Bar ref={barChartRef} data={barData} options={barOptions} />
                    </div>
                </div>
            </div>
            <div className="mt-4">
                {Object.keys(data[0]).map((key, index) => (
                    key !== 'Rating of Company' && key !== 'Average Rating of Industry' &&
                    <p key={index}>
                        <strong>{key}:</strong> The company's value is {data[0][key]}, compared to the industry average of {data[1][key]}. {descriptions[index]}
                    </p>
                ))}
                <p><strong>Rating of Company:</strong> The company's overall rating is {data[0]['Rating of Company']}, while the industry average rating is {data[1]['Average Rating of Industry']}. {descriptions[descriptions.length - 1]}</p>
            </div>
        </div>
    );
};

export default RatingReport;
