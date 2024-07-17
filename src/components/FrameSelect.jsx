import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
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

    mock.onPost('/api/custom').reply(config => {
        const data = JSON.parse(config.data);
        if (!validateCustomFrameworkData(data)) {
            return [400, {
                "code": 400,
                "status": "failed",
                "message": "Invalid custom weights. All weights must sum up to 1 and be non-negative.",
                "timestamp": 1718203200000,
                "data": null,
            }];
        }
        else if (data.framework_name === "framework1" || data.framework_name === "framework2") {
            return [409, {
                "code": 409,
                "status": "failed",
                "message": "Framework creation failed. The framework name already exists.",
                "timestamp": 1718203200000,
                "data": null
            }];
        }
        return [200, {
            "code": 200,
            "status": "succeed",
            "message": "Framework created successfully.",
            "timestamp": 1718203200000,
            "data": null
        }];

    });

    const validateCustomFrameworkData = data => {
        if (!data.framework_name) {
            alert('Please input the frame name!');
            return false;
        }

        // Check if any of the weights is not a number or not in the range of 0 to 1
        for (let category of top_categories) {
            if (isNaN(parseFloat(data[category].indicator_weight)) || parseFloat(data[category].indicator_weight) < 0 || parseFloat(data[category].indicator_weight) > 1) {
                alert('Please input the correct weight!');
                return false;
            }}


        // Check if the sum of the weights of each category is not 1
        let sum = 0;
        for (let category of top_categories) {
            sum += parseFloat(data[category].indicator_weight);
        }
        if (sum !== 1) {
            alert('The sum of the weights of each category must be 1!');
            return false;
        }

        // Check if any of the metrics is not a number or not in the range of 0 to 1
        for (let category of top_categories) {
            for (let metric in data[category].metrics) {
                if (isNaN(parseFloat(data[category].metrics[metric])) || parseFloat(data[category].metrics[metric]) < 0 || parseFloat(data[category].metrics[metric]) > 1) {
                    alert('Please input the correct metric!');
                    return false;
                }
            }
        }

        // Check if the sum of the metrics in each category is not 1
        for (let category of top_categories) {
            sum = 0;
            for (let metric in data[category].metrics) {
                sum += parseFloat(data[category].metrics[metric]);
            }
            if (sum !== 1) {
                alert('The sum of the metrics in each category must be 1!');
                return false;
            }
        }

        return true;
    };

    const top_categories = ['environmental_risk_metrics',
        'environmental_opportunity_metrics',
        'social_risk_metrics',
        'social_opportunity_metrics',
        'governance_risk_metrics',
        'governance_opportunity_metrics'];


    const [CustomFramework, setCustomFramework] = useState(
        {
        "framework_name": "framework1",
        "user_name": "framework1",
        "environmental_risk_metrics": {
        "indicator_weight": 0.3,
        "metrics": {
            "metric1": 0.5,
            "metric2": 0.3,
            "metric3": 0.2
        }
    },
        "environmental_opportunity_metrics": {
        "indicator_weight": 0.2,
        "metrics": {
            "metric1": 0.5,
            "metric2": 0.3,
            "metric3": 0.2
        }
    },
        "social_risk_metrics": {
        "indicator_weight": 0.25,
        "metrics": {
            "metric1": 0.5,
            "metric2": 0.3,
            "metric3": 0.2
        }
    },
        "social_opportunity_metrics": {
        "indicator_weight": 0.15,
        "metrics": {
            "metric1": 0.5,
            "metric2": 0.3,
            "metric3": 0.2
        }
    },
        "governance_risk_metrics": {
        "indicator_weight": 0.05,
        "metrics": {
            "metric1": 0.5,
            "metric2": 0.3,
            "metric3": 0.2
        }
    },
            "governance_opportunity_metrics": {
                "indicator_weight": 0.05,
                "metrics": {
                    "metric1": 0.5,
                    "metric2": 0.3,
                    "metric3": 0.2
                }
            }
    });


    const [frameworks, setFrameworks] = useState([]);

    const [popWindowVisible, setPopWindowVisible] = useState(false);
    const [nestedIndicators, setNestedIndicators] = useState([false, false, false, false, false, false]);
    const [refreshKey, setRefreshKey] = useState(0); // Used to force a re-render of the component

    const [viewWindowVisible, setViewWindowVisible] = useState(false);

    const handleNestedIndicator = (index) => {
        let newNestedIndicators = [...nestedIndicators];
        newNestedIndicators[index] = !newNestedIndicators[index];
        setNestedIndicators(newNestedIndicators);
    };

  

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
                {
                  "framework_name": "IFRS S1",
                  "creation_date": "2021-10-05",
                  "environmental_risk_metrics": {
                      "indicator er weight": 0.175,
                      "co2directscope1": 0.1,
                      "co2indirectscope2": 0.1,
                      "co2indirectscope3": 0.1,
                      "noxemissions": 0.05,
                      "soxemissions": 0.05,
                      "vocemissions": 0.05,
                      "particulate matter emissions": 0.05,
                      "wastetotal": 0.1,
                      "hazardouswaste": 0.1,
                      "airpollutants direct": 0.1,
                      "airpollutants indirect": 0.1,
                      "waterwithdrawaltotal": 0.1
                  },
                  "environmental_opportunity_metrics": {
                      "indicator eo weight": 0.175,
                      "climate change risks opp": 0.2,
                      "organic products initiatives": 0.15,
                      "analyticwasterecyclingratio": 0.2,
                      "waste recycled": 0.15,
                      "water technologies": 0.15,
                      "tranalyicrenewenergyuse": 0.15
                  },
                  "social_risk_metrics": {
                      "indicator sr weight": 0.125,
                      "employee fatalities": 0.25,
                      "turnover employees": 0.2,
                      "human rights violation pai": 0.3,
                      "tir total": 0.25
                  },
                  "social_opportunity_metrics": {
                      "indicator so weight": 0.125,
                      
                      "employee health safety policy": 0.25,
                      "trade union rep": 0.35,
                      "women employees": 0.2,
                      "women managers": 0.2
                  },
                  "governance_risk_metrics": {
                      "indicator gr weight": 0.2,
                      "bribery and corruption pai insufficient actions": 1  //yes or no
                  },
                  "governance_opportunity_metrics": {
                      "indicator go weight": 0.2,
                      "analytic audit commind": 0.15,
                      "analytic board female": 0.1,
                      "analytic comp commind": 0.1,
                      "analytic nomination commind": 0.1,
                      "audit comm nonexec members": 0.1,
                      "board meeting attendance avg": 0.15,
                      "comp comm nonexec members": 0.1,
                      "analytic indep board": 0.15,
                      "analytic nonexec board": 0.15
                  }
              },
              
              {
                "framework_name": "IFRS S2",
                "creation_date": "2022-10-05",
                "environmental_risk_metrics": {
                    "indicator er weight": 0.25,
                    "co2directscope1": 0.1,
                    "co2indirectscope2": 0.1,
                    "co2indirectscope3": 0.1,
                    "noxemissions": 0.05,
                    "soxemissions": 0.05,
                    "vocemissions": 0.05,
                    "particulate matter emissions": 0.05,
                    "wastetotal": 0.1,
                    "hazardouswaste": 0.1,
                    "airpollutants direct": 0.1,
                    "airpollutants indirect": 0.1,
                    "waterwithdrawaltotal": 0.1
                },
                "environmental_opportunity_metrics": {
                    "indicator eo weight": 0.25,
                    "climate change risks opp": 0.2,
                    "organic products initiatives": 0.15,
                    "analyticwasterecyclingratio": 0.2,
                    "waste recycled": 0.15,
                    "water technologies": 0.15,
                    "tranalyicrenewenergyuse": 0.15
                },
                "social_risk_metrics": {
                    "indicator sr weight": 0.1,
                    "employee fatalities": 0.25,
                    "turnover employees": 0.2,
                    "human rights violation pai": 0.3,
                    "tir total": 0.25
                },
                "social_opportunity_metrics": {
                    "indicator so weight": 0.1,
                    
                    "employee health safety policy": 0.25,
                    "trade union rep": 0.35,
                    "women employees": 0.2,
                    "women managers": 0.2
                },
                "governance_risk_metrics": {
                    "indicator gr weight": 0.15,
                    "bribery and corruption pai insufficient actions": 1  //yes or no
                },
                "governance_opportunity_metrics": {
                    "indicator go weight": 0.15,
                    "analytic audit commind": 0.15,
                    "analytic board female": 0.1,
                    "analytic comp commind": 0.1,
                    "analytic nomination commind": 0.1,
                    "audit comm nonexec members": 0.1,
                    "board meeting attendance avg": 0.15,
                    "comp comm nonexec members": 0.1,
                    "analytic indep board": 0.15,
                    "analytic nonexec board": 0.15
                }
            },
            {
              "framework_name": "TCFD",
              "creation_date": "2023-10-05",
              "environmental_risk_metrics": {
                  "indicator er weight": 0.35,
                  "co2directscope1": 0.1,
                  "co2indirectscope2": 0.1,
                  "co2indirectscope3": 0.1,
                  "noxemissions": 0.05,
                  "soxemissions": 0.05,
                  "vocemissions": 0.05,
                  "particulate matter emissions": 0.05,
                  "wastetotal": 0.1,
                  "hazardouswaste": 0.1,
                  "airpollutants direct": 0.1,
                  "airpollutants indirect": 0.1,
                  "waterwithdrawaltotal": 0.1
              },
              "environmental_opportunity_metrics": {
                  "indicator eo weight": 0.35,
                  "climate change risks opp": 0.2,
                  "organic products initiatives": 0.15,
                  "analyticwasterecyclingratio": 0.2,
                  "waste recycled": 0.15,
                  "water technologies": 0.15,
                  "tranalyicrenewenergyuse": 0.15
              },
              "social_risk_metrics": {
                  "indicator sr weight": 0.05,
                  "employee fatalities": 0.25,
                  "turnover employees": 0.2,
                  "human rights violation pai": 0.3,
                  "tir total": 0.25
              },
              "social_opportunity_metrics": {
                  "indicator so weight": 0.05,
                  
                  "employee health safety policy": 0.25,
                  "trade union rep": 0.35,
                  "women employees": 0.2,
                  "women managers": 0.2
              },
              "governance_risk_metrics": {
                  "indicator gr weight": 0.1,
                  "bribery and corruption pai insufficient actions": 1  //yes or no
              },
              "governance_opportunity_metrics": {
                  "indicator go weight": 0.1,
                  "analytic audit commind": 0.15,
                  "analytic board female": 0.1,
                  "analytic comp commind": 0.1,
                  "analytic nomination commind": 0.1,
                  "audit comm nonexec members": 0.1,
                  "board meeting attendance avg": 0.15,
                  "comp comm nonexec members": 0.1,
                  "analytic indep board": 0.15,
                  "analytic nonexec board": 0.15
              }
          },
          {
            "framework_name": "TNFD",
            "creation_date": "2020-10-05",
            "environmental_risk_metrics": {
                "indicator er weight": 0.4,
                "co2directscope1": 0.1,
                "co2indirectscope2": 0.1,
                "co2indirectscope3": 0.1,
                "noxemissions": 0.05,
                "soxemissions": 0.05,
                "vocemissions": 0.05,
                "particulate matter emissions": 0.05,
                "wastetotal": 0.1,
                "hazardouswaste": 0.1,
                "airpollutants direct": 0.1,
                "airpollutants indirect": 0.1,
                "waterwithdrawaltotal": 0.1
            },
            "environmental_opportunity_metrics": {
                "indicator eo weight": 0.35,
                "climate change risks opp": 0.2,
                "organic products initiatives": 0.15,
                "analyticwasterecyclingratio": 0.2,
                "waste recycled": 0.15,
                "water technologies": 0.15,
                "tranalyicrenewenergyuse": 0.15
            },
            "social_risk_metrics": {
                "indicator sr weight": 0.05,
                "employee fatalities": 0.25,
                "turnover employees": 0.2,
                "human rights violation pai": 0.3,
                "tir total": 0.25
            },
            "social_opportunity_metrics": {
                "indicator so weight": 0.05,
                
                "employee health safety policy": 0.25,
                "trade union rep": 0.35,
                "women employees": 0.2,
                "women managers": 0.2
            },
            "governance_risk_metrics": {
                "indicator gr weight": 0.1,
                "bribery and corruption pai insufficient actions": 1  //yes or no
            },
            "governance_opportunity_metrics": {
                "indicator go weight": 0.05,
                "analytic audit commind": 0.15,
                "analytic board female": 0.1,
                "analytic comp commind": 0.1,
                "analytic nomination commind": 0.1,
                "audit comm nonexec members": 0.1,
                "board meeting attendance avg": 0.15,
                "comp comm nonexec members": 0.1,
                "analytic indep board": 0.15,
                "analytic nonexec board": 0.15
            }
          },
          {
          "framework_name": "APRA-CPG",
          "creation_date": "2019-10-05",
          "environmental_risk_metrics": {
              "indicator er weight": 0.3,
              "co2directscope1": 0.1,
              "co2indirectscope2": 0.1,
              "co2indirectscope3": 0.1,
              "noxemissions": 0.05,
              "soxemissions": 0.05,
              "vocemissions": 0.05,
              "particulate matter emissions": 0.05,
              "wastetotal": 0.1,
              "hazardouswaste": 0.1,
              "airpollutants direct": 0.1,
              "airpollutants indirect": 0.1,
              "waterwithdrawaltotal": 0.1
          },
          "environmental_opportunity_metrics": {
              "indicator eo weight": 0.2,
              "climate change risks opp": 0.2,
              "organic products initiatives": 0.15,
              "analyticwasterecyclingratio": 0.2,
              "waste recycled": 0.15,
              "water technologies": 0.15,
              "tranalyicrenewenergyuse": 0.15
          },
          "social_risk_metrics": {
              "indicator sr weight": 0.1,
              "employee fatalities": 0.25,
              "turnover employees": 0.2,
              "human rights violation pai": 0.3,
              "tir total": 0.25
          },
          "social_opportunity_metrics": {
              "indicator so weight": 0.1,
              
              "employee health safety policy": 0.25,
              "trade union rep": 0.35,
              "women employees": 0.2,
              "women managers": 0.2
          },
          "governance_risk_metrics": {
              "indicator gr weight": 0.15,
              "bribery and corruption pai insufficient actions": 1  //yes or no
          },
          "governance_opportunity_metrics": {
              "indicator go weight": 0.15,
              "analytic audit commind": 0.15,
              "analytic board female": 0.1,
              "analytic comp commind": 0.1,
              "analytic nomination commind": 0.1,
              "audit comm nonexec members": 0.1,
              "board meeting attendance avg": 0.15,
              "comp comm nonexec members": 0.1,
              "analytic indep board": 0.15,
              "analytic nonexec board": 0.15
          }
          }
          
          
          
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
      }, [ refreshKey ]); // Re-fetch frameworks when the refreshKey changes(when a new framework is created)

    const navigate = useNavigate();

    const [currentFramework, setCurrentFramework] = useState([]);

    const handleCreateFrame = () => {
        setPopWindowVisible(true);
    };

    const simplifyFrame = (frame) => {
        let simplified = {};
        const weightRegex = /^indicator [a-z]{2} weight$/; //change based on the format of the weight key

        Object.keys(frame).forEach(key => {
            if (typeof frame[key] === 'object') {
                const weightKey = Object.keys(frame[key]).find(k => weightRegex.test(k));
                if (weightKey) {
                    simplified[key] = frame[key][weightKey];
                }
            } else {
                simplified[key] = frame[key];
            }
        });

        return simplified;
    };

    const handleSelect = (frame) => {
        const frameName = frame.framework_name;
        const simplifiedFrame = simplifyFrame(frame);
        navigate(`/companySearch/${frameName}`, { state: { simplifiedFrame } });
    };

    const handleView = (framework) => {
        console.log(framework);
        setCurrentFramework(framework);
        setViewWindowVisible(true);
    };

    const handleCustomFrameConfirm = async (e) => {
        e.preventDefault(); // prevent refresh
        if (!validateCustomFrameworkData(CustomFramework)) {
            return;
        }
        try {
            const response = await axios.post('/api/custom', CustomFramework);
            if (response.status === 200) {
                console.log('Custom framework created successfully:', response.data.message);
                alert('Custom framework created successfully!');
                setRefreshKey(refreshKey + 1);
                setPopWindowVisible(false);
            }
        } catch (error) {
            console.error('Failed to create custom framework:', error.response.data.message);
            alert(error.response.data.message);

        }
    }


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
                                <p className="card-text">Creation Date: {framework.creation_date}</p>
                            </div>
                            <div className="card-footer bg-transparent border-0 d-flex justify-content-around">
                                <button className="btn btn-outline-primary" onClick={() => handleSelect(framework)}>
                                    Select
                                </button>
                                <button className="btn btn-outline-primary" onClick={() => handleView(framework)}>
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div id="CustomFrameworkSetting" style={{
                display: popWindowVisible ? 'flex' : 'none',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{
                    width: '70%', height: '80%', backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '5px'
                }}>
                    <button type="button" className="btn-close" aria-label="Close"
                            onClick={() => setPopWindowVisible(false)}></button>
                    <div style={{overflow: 'auto', height: '90%'}}>
                        <Box component="form" noValidate autoComplete="off" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <h2 style={{marginBottom: '40px', marginTop: '20px', display: 'flex' }}>Custom Framework Setting</h2>
                        <TextField id="framework_name" sx={{ width: '80%', maxWidth: '80%' }}
                            label="Framework Name" value={CustomFramework.framework_name} onChange={(e) => setCustomFramework({ ...CustomFramework, framework_name: e.target.value })} required />
                            <List
                                sx={{ width: '80%', maxWidth: '80%', bgcolor: 'background.paper' }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        Indicator Weights
                                    </ListSubheader>
                                }>
                                {top_categories.map((category, index) => (
                                    <List key={index}>
                                        <ListItemButton key={index} sx={{ border: '1px solid darkgrey', borderRadius: '5px', marginBottom: '5px'}}
                                            onClick={() => handleNestedIndicator(index)}>
                                            <ListItemText primary={category} />
                                            <input type="number" className="form-control" id={"indicator_weight" + index} name="indicator_weight" style={{ width: '20%' }}
                                                value={CustomFramework[category].indicator_weight} onChange={(e) => setCustomFramework({ ...CustomFramework, [category]: { ...CustomFramework[category], indicator_weight: e.target.value } })} required />
                                        {nestedIndicators[index] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                        <Collapse in={nestedIndicators[index]} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                    {Object.keys(CustomFramework[category].metrics).map((metric, index) => (
                                            <ListItemButton key={index} sx={{ pl: 4 }}>
                                                <ListItemText primary={metric} />
                                            <input type="number" className="form-control" id={"metric" + index} name="metric" style={{ width: '20%' }}
                                                value={CustomFramework[category].metrics[metric]} onChange={(e) => setCustomFramework({ ...CustomFramework, [category]: { ...CustomFramework[category], metrics: { ...CustomFramework[category].metrics, [metric]: e.target.value } } })} required />
                                            </ListItemButton>
                                        ))}
                                        </List>
                                    </Collapse>
                                    </List>

                                ))}
                            </List>
                            <Button variant="contained" size="medium" id="CompanySelectingConfirm" style={{ marginTop: '10px' }} onClick={handleCustomFrameConfirm}>Confirm</Button>
                        </Box>
                    </div>
                </div>
            </div>
            {viewWindowVisible && currentFramework && (
                <div id="ViewFrameworkSetting" style={{
                    display: 'flex', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000, justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{
                        width: '70%', height: '80%', backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '5px' }}>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => setViewWindowVisible(false)}></button>
                        <div style={{ overflow: 'auto', height: '90%' }}>
                            <Box component="div" noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <h2 style={{ marginBottom: '20px', marginTop: '20px', display: 'flex' }}>{currentFramework.framework_name}</h2>
                                <p style={{ marginBottom: '40px', display: 'flex' }}>Creation Date: {currentFramework.creation_date}</p>
                                <List
                                    sx={{ width: '80%', maxWidth: '80%', bgcolor: 'background.paper' }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader">
                                            Indicator Weights
                                        </ListSubheader>
                                    }>
                                    {top_categories.map((category, index) => {
                                        const weightKey = Object.keys(currentFramework[category] || {}).find(key => /^indicator_[a-z]{2}_weight$/.test(key));
                                        return (
                                            <List key={index}>
                                                <ListItemButton sx={{ border: '1px solid darkgrey', borderRadius: '5px', marginBottom: '5px', padding: '10px' }}
                                                                onClick={() => handleNestedIndicator(index)}>
                                                    <ListItemText
                                                        primary={category}
                                                        secondary={weightKey
                                                            ? `Weight: ${currentFramework[category][weightKey]}`
                                                            : 'Frame does not own this type of metrics'}
                                                    />
                                                    {nestedIndicators[index] ? <ExpandLess /> : <ExpandMore />}
                                                </ListItemButton>
                                                <Collapse in={nestedIndicators[index]} timeout="auto" unmountOnExit>
                                                    <List component="div" disablePadding>
                                                        {currentFramework[category] && Object.entries(currentFramework[category]).map(([key, value], idx) => (
                                                            !/^indicator_[a-z]{2}_weight$/.test(key) && (
                                                                <ListItemText key={idx} primary={`${key}: ${value}`} sx={{ pl: 4, border: '1px solid lightgrey', borderRadius: '5px', marginBottom: '5px', padding: '10px' }} />
                                                            )
                                                        ))}
                                                    </List>
                                                </Collapse>
                                            </List>
                                        );
                                    })}
                                </List>
                                <Button variant="contained" size="medium" id="CompanySelectingConfirm" style={{ marginTop: '10px' }} onClick={() => handleSelect(currentFramework)}>Select</Button>
                            </Box>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FrameSelect;
