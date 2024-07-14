import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
const FrameSelect = () => {
    const mock = new MockAdapter(axios);

    
    mock.onGet(/\/api\/current_framework\?user_name=.+/).reply(config => {
        const urlParams = new URLSearchParams(config.url.split('?')[1]);
        const user_name = urlParams.get('user_name');
        if (user_name === "qq" || user_name === "ww" || user_name === "ee") {
          return [200, {
            code: 200,
            status: "succeed",
            message: "Found frameworks for this user.",
            timestamp: 1718203200000,
            data: [
            {
                "framework_name": "framework1",
                "creation_date": "2021-10-05",
                "environmental_risk_metrics": {
                    "indicator_er_weight": 0.3,
                    "metric1": 0.5,
                    "metric2": 0.3,
                    "metric3": 0.2
                },
                "environmental_opportunity_metrics": {
                    "indicator_eo_weight": 0.2,
                    "metric1": 0.5,
                    "metric2": 0.3,
                    "metric3": 0.2
                },
                "social_risk_metrics": {
                    "indicator_sr_weight": 0.25,
                    "metric1": 0.5,
                    "metric2": 0.3,
                    "metric3": 0.2
                },
                "social_opportunity_metrics": {
                    "indicator_so_weight": 0.15,
                    "metric1": 0.5,
                    "metric2": 0.3,
                    "metric3": 0.2
                },
                "governance_risk_metrics": {
                    "indicator_gr_weight": 0.05,
                    "metric1": 0.5,
                    "metric2": 0.3,
                    "metric3": 0.2
                },
                "governance_opportunity_metrics": {
                    "indicator_go_weight": 0.05,
                    "metric1": 0.5,
                    "metric2": 0.3,
                    "metric3": 0.2
                }
            },
            {
                "framework_name": "framework2",
                "creation_date": "2023-10-07",
                "environmental_risk_metrics": {
                    "indicator_er_weight": 0.3,
                    "metric1": 0.5,
                    "metric2": 0.3,
                    "metric3": 0.2
                },
                "environmental_opportunity_metrics": {
                    "indicator_eo_weight": 0.2,
                    "metric1": 0.5,
                    "metric2": 0.3,
                    "metric3": 0.2
                },
                "social_risk_metrics": {
                    "indicator_sr_weight": 0.25,
                    "metric1": 0.5,
                    "metric2": 0.3,
                    "metric3": 0.2
                },
                "social_opportunity_metrics": {
                    "indicator_so_weight": 0.15,
                    "metric1": 0.5,
                    "metric2": 0.3,
                    "metric3": 0.2
                },
                "governance_risk_metrics": {
                    "indicator_gr_weight": 0.05,
                    "metric1": 0.5,
                    "metric2": 0.3,
                    "metric3": 0.2
                },
                "governance_opportunity_metrics": {
                    "indicator_go_weight": 0.05,
                    "metric1": 0.5,
                    "metric2": 0.3,
                    "metric3": 0.2
                }
            }
        ]
          }];
        } else {
            return [200, {
                code: 200,
                status: "succeed",
                message: "no frameworks for this user.",
                timestamp: 1718203200000,
                data: []
            }];
        }
      });





    const [frameworks, setFrameworks] = useState([]);
    
      


    useEffect(() => {
        const fetchFrameworks = async () => {
          try {
            const user_name = localStorage.getItem('username');
            const response = await axios.get(`/api/current_framework?user_name=${user_name}`);
            console.log("frameworks page GET response",response)
            if (response.status === 200) {
                const sortedFrameworks = response.data.data.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));
              setFrameworks(sortedFrameworks);
              const fixedFrameworks = [
                { framework_name: "Fixed framework1",
                    creation_date: "2020-10-05",
                    environmental_risk_metrics: {
                        "indicator_er_weight": 0.3,
                        "metric1": 0.5,
                        "metric2": 0.3,
                        "metric3": 0.2
                    },},
                {framework_name: "Fixed framework2",
                        creation_date: "2019-10-05",
                        environmental_risk_metrics: {
                            "indicator_er_weight": 0.3,
                            "metric1": 0.5,
                            "metric2": 0.3,
                            "metric3": 0.2
                        },}
                
              ];
              
              setFrameworks(previousFrameworks => [...previousFrameworks, ...fixedFrameworks]);
            } else {
              console.error('Failed to fetch frameworks:', response.data.message);
              alert('Failed to fetch frameworks:', response.data.message);
            }
          } catch (error) {
            console.error('Error fetching frameworks:', error);
          }
        };
    
        fetchFrameworks();
      }, []);




    const handleCreateFrame = () => {
        alert('Create your frame clicked!');
    };

    const handleSelect = (frameId) => {
        alert(`Frame ${frameId} selected!`);

    };



    
    return (
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col-3 mb-4">
                    <div
                        className="card h-100 d-flex align-items-center justify-content-center"
                        style={{
                            border: '2px dashed #6c757d',
                            cursor: 'pointer'
                        }}
                        onClick={handleCreateFrame}
                    >
                        <div className="text-center">
                            <p className="mb-0">+</p>
                            <p>Create your frame</p>
                        </div>
                    </div>
                </div>
                {frameworks.map((framework, index) => (
                    <div key={index} className="col-3 mb-4">
                        <div className="card h-100 d-flex flex-column justify-content-between">
                            <div className="card-body">
                                <h5 className="card-title">Frame name: {framework.framework_name}</h5>
                                <p className="card-text">Creation Date: {framework.creation_date
                                }</p>
                            </div>
                            <div className="card-footer bg-transparent border-0 d-flex justify-content-center">
                                <button className="btn btn-outline-primary" onClick={() => handleSelect(index)}>
                                    <Link to="/CompanySearch" style={{ textDecoration: 'none' }}>Select</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
    // return (
    //     <div className="container  mt-5">
    //       <div className="row mb-4">
    //         <div className="col-md-3 mb-3">
    //           <div className="card border-primary">
    //             <div className="card-body text-center">
    //               <div className="card-title">Create your frame</div>
    //               <button className="btn btn-outline-primary" onClick={() => window.location.href = '/frameCustom'}>
    //                 +
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //         {frameworks.map((framework, index) => (
    //           <div key={index} className="col-md-3 mb-3">
    //             <div className="card">
    //               <div className="card-body">
    //                 <h5 className="card-title">Frame {index + 1}</h5>
    //                 <p className="card-text">intro: {framework.framework_name}</p>
    //                 <button className="btn btn-outline-primary">Select</button>
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   );


};

export default FrameSelect;
