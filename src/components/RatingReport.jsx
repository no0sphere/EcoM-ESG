import React from 'react';
import { Pie } from 'react-chartjs-2';

const RatingReport = ({ rating, simplifiedFrame, pieData, pieOptions, Industry, Company,Year}) => {
    return (
        <div className="container mt-3">
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{width: '45%'}}>
                    <h3>{Year} {Company} ESG Rating: {rating}</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Details of Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(simplifiedFrame || {}).map(([key, value], index) => (
                                <tr key={index}>
                                    <td>{key}</td>
                                    <td>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{width: '45%'}}>
                    <Pie data={pieData} options={pieOptions} />
                </div>
            </div>
        </div>
    );
};

export default RatingReport;
