import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import RadarChart from "./RadarChart.jsx";

const FrameSelect = () => {
  const mock = new MockAdapter(axios);

  // mock.onGet(/\/get_framework\?user_name=.+/).reply((config) => {
  //   const urlParams = new URLSearchParams(config.url.split("?")[1]);
  //   const user_name = urlParams.get("user_name");
  //   if (user_name === "Jim" || user_name === "jim" || user_name === "qq") {
  //     return [
  //       200,
  //       {
  //         code: 200,
  //         status: "succeed",
  //         message: "Found frameworks for this user.",
  //         timestamp: 1718203200000,
  //         data: [
  //           {
  //             framework_name: "Jim's Framework1",
  //             creation_date: "2024-06-05",
  //             environmental_risk_metrics: {
  //               "indicator er weight": 0.175,
  //               co2directscope1: 0.1,
  //               co2indirectscope2: 0.1,
  //               co2indirectscope3: 0.1,
  //               noxemissions: 0.05,
  //               soxemissions: 0.05,
  //               vocemissions: 0.05,
  //               "particulate matter emissions": 0.05,
  //               wastetotal: 0.1,
  //               hazardouswaste: 0.1,
  //               "airpollutants direct": 0.1,
  //               "airpollutants indirect": 0.1,
  //               waterwithdrawaltotal: 0.1,
  //             },
  //             environmental_opportunity_metrics: {
  //                 "indicator eo weight": 0.175,
  //               "AIRPOLLUTANTS_INDIRECT": 0.1,
  //               "climate change risks opp": 0.2,
  //               "organic products initiatives": 0.15,
  //               analyticwasterecyclingratio: 0.2,
  //               "waste recycled": 0.15,
  //               "water technologies": 0.15,
  //               tranalyicrenewenergyuse: 0.15,
  //             },
  //             social_risk_metrics: {
  //               "indicator sr weight": 0.125,
  //               "employee fatalities": 0.25,
  //               "turnover employees": 0.2,
  //               "human rights violation pai": 0.3,
  //               "tir total": 0.25,
  //             },
  //             social_opportunity_metrics: {
  //               "indicator so weight": 0.125,
  //
  //               "employee health safety policy": 0.25,
  //               "trade union rep": 0.35,
  //               "women employees": 0.2,
  //               "women managers": 0.2,
  //             },
  //             governance_risk_metrics: {
  //               "indicator gr weight": 0.2,
  //               "bribery and corruption pai insufficient actions": 1, //yes or no
  //             },
  //             governance_opportunity_metrics: {
  //               "indicator go weight": 0.2,
  //               "analytic audit commind": 0.15,
  //               "analytic board female": 0.1,
  //               "analytic comp commind": 0.1,
  //               "analytic nomination commind": 0.1,
  //               "audit comm nonexec members": 0.1,
  //               "board meeting attendance avg": 0.15,
  //               "comp comm nonexec members": 0.1,
  //               "analytic indep board": 0.15,
  //               "analytic nonexec board": 0.05,
  //             },
  //           },
  //           {
  //             framework_name: "Find Fish's Framework",
  //             creation_date: "2023-10-07",
  //             environmental_risk_metrics: {
  //               indicator_er_weight: 0.3,
  //               metric1: 0.5,
  //               metric2: 0.3,
  //               metric3: 0.2,
  //             },
  //             environmental_opportunity_metrics: {
  //               indicator_eo_weight: 0.2,
  //               metric1: 0.5,
  //               metric2: 0.3,
  //               metric3: 0.2,
  //             },
  //             social_risk_metrics: {
  //               indicator_sr_weight: 0.25,
  //               metric1: 0.5,
  //               metric2: 0.3,
  //               metric3: 0.2,
  //             },
  //             social_opportunity_metrics: {
  //               indicator_so_weight: 0.15,
  //               metric1: 0.5,
  //               metric2: 0.3,
  //               metric3: 0.2,
  //             },
  //             governance_risk_metrics: {
  //               indicator_gr_weight: 0.05,
  //               metric1: 0.5,
  //               metric2: 0.3,
  //               metric3: 0.2,
  //             },
  //             governance_opportunity_metrics: {
  //               indicator_go_weight: 0.05,
  //               metric1: 0.5,
  //               metric2: 0.3,
  //               metric3: 0.2,
  //             },
  //           },
  //         ],
  //       },
  //     ];
  //   } else {
  //     return [
  //       200,
  //       {
  //         code: 200,
  //         status: "succeed",
  //         message: "one frameworks for this user.",
  //         timestamp: 1718203200000,
  //         data: [
  //           {
  //             framework_name: "Ray's Framework",
  //             creation_date: "2023-10-07",
  //             environmental_risk_metrics: {
  //               "indicator er weight": 0.175,
  //               co2directscope1: 0.1,
  //               co2indirectscope2: 0.1,
  //               co2indirectscope3: 0.1,
  //               noxemissions: 0.05,
  //               soxemissions: 0.05,
  //               vocemissions: 0.05,
  //               "particulate matter emissions": 0.05,
  //               wastetotal: 0.1,
  //               hazardouswaste: 0.1,
  //               "airpollutants direct": 0.1,
  //               "airpollutants indirect": 0.1,
  //               waterwithdrawaltotal: 0.1,
  //             },
  //             environmental_opportunity_metrics: {
  //               "indicator eo weight": 0.175,
  //               "climate change risks opp": 0.2,
  //               "organic products initiatives": 0.15,
  //               analyticwasterecyclingratio: 0.2,
  //               "waste recycled": 0.15,
  //               "water technologies": 0.15,
  //               tranalyicrenewenergyuse: 0.15,
  //             },
  //             social_risk_metrics: {
  //               "indicator sr weight": 0.125,
  //               "employee fatalities": 0.25,
  //               "turnover employees": 0.2,
  //               "human rights violation pai": 0.3,
  //               "tir total": 0.25,
  //             },
  //             social_opportunity_metrics: {
  //               "indicator so weight": 0.125,
  //
  //               "employee health safety policy": 0.25,
  //               "trade union rep": 0.35,
  //               "women employees": 0.2,
  //               "women managers": 0.2,
  //             },
  //             governance_risk_metrics: {
  //               "indicator gr weight": 0.2,
  //               "bribery and corruption pai insufficient actions": 1, //yes or no
  //             },
  //             governance_opportunity_metrics: {
  //               "indicator go weight": 0.2,
  //               "analytic audit commind": 0.15,
  //               "analytic board female": 0.1,
  //               "analytic comp commind": 0.1,
  //               "analytic nomination commind": 0.1,
  //               "audit comm nonexec members": 0.1,
  //               "board meeting attendance avg": 0.15,
  //               "comp comm nonexec members": 0.1,
  //               "analytic indep board": 0.15,
  //               "analytic nonexec board": 0.05,
  //             },
  //           },
  //           {
  //             framework_name: "Hao's Framework",
  //             creation_date: "2023-10-07",
  //             environmental_risk_metrics: {
  //               indicator_er_weight: 0.3,
  //               metric1: 0.5,
  //               metric2: 0.3,
  //               metric3: 0.2,
  //             },
  //             environmental_opportunity_metrics: {
  //               indicator_eo_weight: 0.2,
  //               metric1: 0.5,
  //               metric2: 0.3,
  //               metric3: 0.2,
  //             },
  //             social_risk_metrics: {
  //               indicator_sr_weight: 0.25,
  //               metric1: 0.5,
  //               metric2: 0.3,
  //               metric3: 0.2,
  //             },
  //             social_opportunity_metrics: {
  //               indicator_so_weight: 0.15,
  //               metric1: 0.5,
  //               metric2: 0.3,
  //               metric3: 0.2,
  //             },
  //             governance_risk_metrics: {
  //               indicator_gr_weight: 0.05,
  //               metric1: 0.5,
  //               metric2: 0.3,
  //               metric3: 0.2,
  //             },
  //             governance_opportunity_metrics: {
  //               indicator_go_weight: 0.05,
  //               metric1: 0.5,
  //               metric2: 0.3,
  //               metric3: 0.2,
  //             },
  //           },
  //           {
  //             framework_name: "6Yan's Framework",
  //             creation_date: "2023-10-07",
  //             environmental_risk_metrics: {
  //               indicator_er_weight: 0.3,
  //               metric1: 0.5,
  //               metric2: 0.3,
  //               metric3: 0.2,
  //             },
  //             environmental_opportunity_metrics: {
  //               indicator_eo_weight: 0.2,
  //               metric1: 0.5,
  //               metric2: 0.3,
  //               metric3: 0.2,
  //             },
  //             social_risk_metrics: {
  //               indicator_sr_weight: 0.25,
  //               metric1: 0.5,
  //               metric2: 0.3,
  //               metric3: 0.2,
  //             },
  //             social_opportunity_metrics: {
  //               indicator_so_weight: 0.15,
  //               metric1: 0.5,
  //               metric2: 0.3,
  //               metric3: 0.2,
  //             },
  //             governance_risk_metrics: {
  //               indicator_gr_weight: 0.05,
  //               metric1: 0.5,
  //               metric2: 0.3,
  //               metric3: 0.2,
  //             },
  //             governance_opportunity_metrics: {
  //               indicator_go_weight: 0.05,
  //               metric1: 0.5,
  //               metric2: 0.3,
  //               metric3: 0.2,
  //             },
  //           },
  //         ],
  //       },
  //     ];
  //   }
  // });
  //
  //   mock.onPost("http://localhost:9090/basic/insertFramework").reply((config) => {
  //       const data = JSON.parse(config.data);
  //     if (config.headers && config.headers.Authorization != 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsidXNlcmlkIjpudWxsLCJ1c2VybmFtZSI6InRlc3R1c2VyMTgifSwiZXhwIjoxNzIxNzE4NjcyfQ.iil9h5Htzd9QrC4ciq3sXX-UiuWZaOszyUxCogRwi-Q') {
  //         return [500, {
  //             "code": "500",
  //             "status": 500,
  //             "message": "Authentication failed. Please log in first.",
  //             "timestamp": 1721670835582,
  //             "data": null,
  //             "error": null
  //         }];
  //     } else if (
  //         data.framework_name === "framework1" ||
  //         data.framework_name === "framework2"
  //     ) {
  //         return [
  //             4001,
  //             {
  //                 code: "4001",
  //                 status: 4001,
  //                 message: "Framework name already used",
  //                 timestamp: 1721668449393,
  //                 data: null,
  //                 error: null,
  //             },
  //         ];
  //     }else if (!validateCustomFrameworkData(data)) {
  //     return [
  //       4007,
  //       {
  //         code: "4007",
  //         status: 4001,
  //         message: "Existence of categories whose weights do not sum to 1",
  //         timestamp: 1721668449393,
  //         data: null,
  //         error: null,
  //       },
  //     ];
  //   }
  //   return [
  //     200,
  //     {
  //       code: "200",
  //       status: 200,
  //       message: "Success",
  //       timestamp: 1718203200000,
  //       data: null,
  //       error: null,
  //     },
  //   ];
  //   });
  //
  //   mock.onPut("http://localhost:9090/basic/updateFramework").reply((config) => {
  //       const data = JSON.parse(config.data);
  //       if (config.headers && config.headers.Authorization != 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsidXNlcmlkIjpudWxsLCJ1c2VybmFtZSI6InRlc3R1c2VyMTgifSwiZXhwIjoxNzIxNzE4NjcyfQ.iil9h5Htzd9QrC4ciq3sXX-UiuWZaOszyUxCogRwi-Q') {
  //           return [500, {
  //               "code": "500",
  //               "status": 500,
  //               "message": "Authentication failed. Please log in first.",
  //               "timestamp": 1721670835582,
  //               "data": null,
  //               "error": null
  //           }];
  //       } else if (!validateCustomFrameworkData(data,"Edit")) {
  //           return [
  //               4007,
  //               {
  //                   code: "4007",
  //                   status: 4001,
  //                   message: "Existence of categories whose weights do not sum to 1",
  //                   timestamp: 1721668449393,
  //                   data: null,
  //                   error: null,
  //               },
  //           ];
  //       }
  //       return [
  //           200,
  //           {
  //               code: "200",
  //               status: 200,
  //               message: "Success",
  //               timestamp: 1718203200000,
  //               data: null,
  //               error: null,
  //           },
  //       ];
  //   });

  const validateCustomFrameworkData = (data, type = "Create") => {
    console.log(data);
    if (!data.framework_name && type === "Create") {
      setCustomError("Please input the frame name!");
      console.log("Please input the frame name!" + data.framework_name);
      return false;
    }

    // Check if any of the weights is not a number or not in the range of 0 to 1
    for (let category of top_categories) {
      if (
        isNaN(parseFloat(data[category].indicator_weight)) ||
        parseInt(data[category].indicator_weight) * 100 < 0 ||
        parseFloat(data[category].indicator_weight) * 100 > 100
      ) {
        // multiply by 100 to avoid floating point errors
        setCustomError("Please input the correct weight!");
        console.log("Please input the correct weight!");
        return false;
      }
    }

    // Check if the sum of the weights of each category is not 1
    let sum = 0;
    for (let category of top_categories) {
      sum += parseFloat(data[category].indicator_weight) * 100;
    }
    if (sum !== 100) {
      setCustomError("The sum of the weights of each category must be 1!");
      console.log("The sum of the weights of each category must be 1!" + sum);
      return false;
    }

    // Check if any of the metrics is not a number or not in the range of 0 to 1
    for (let category of top_categories) {
      for (let metric in data[category].metrics) {
        if (
          isNaN(parseFloat(data[category].metrics[metric])) ||
          parseFloat(data[category].metrics[metric]) * 100 < 0 ||
          parseFloat(data[category].metrics[metric]) * 100 > 100
        ) {
          setCustomError("Please input the correct metric!");
          return false;
        }
      }
    }

    // Check if the sum of the metrics in each category is not 1
    for (let category of top_categories) {
      sum = 0;
      for (let metric in data[category].metrics) {
        console.log(data[category].metrics[metric]);
        sum += parseFloat(data[category].metrics[metric]) * 100;
      }
      if (sum !== 100) {
        setCustomError("The sum of the metrics in each category must be 1!");
        console.log("The sum of the metrics in each category must be 1!" + sum);
        return false;
      }
    }

    return true;
  };

  const top_categories = [
    "environmental_risk_metrics",
    "environmental_opportunity_metrics",
    "social_risk_metrics",
    "social_opportunity_metrics",
    "governance_risk_metrics",
    "governance_opportunity_metrics",
  ];

  const navigate = useNavigate();

  useEffect(() => {
    // // Check if the user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const [MetricsList, setMetricsList] = useState([]);
  useEffect(() => {
    //get data from csv file and set the initial state of the custom framework
    async function fetchData() {
      const response = await fetch("/MetricDescription.csv");
      const reader = response.body.getReader();
      const result = await reader.read(); // raw read of the stream
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // convert stream to text
      let MetricsList = [];
      Papa.parse(csv, {
        complete: function (results) {
          console.log("Parsed results:", results);
          setMetricsList(results.data);
          MetricsList = results.data; // local variable has higher priority than state variable
        },
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      });
      for (let i = 0; i < MetricsList.length; i++) {
        //console.log(MetricsList[i].pillar, MetricsList[i].metric_name);
        if (MetricsList[i].pillar === "E") {
          setCustomMetricOppOrRisk((prevState) => {
            return {
              ...prevState,
              environmental_risk_metrics: {
                ...prevState.environmental_risk_metrics,
                [MetricsList[i].metric_name]: false,
              },
              environmental_opportunity_metrics: {
                ...prevState.environmental_opportunity_metrics,
                [MetricsList[i].metric_name]: true,
              },
            };
          });
          setCustomFramework((prevState) => {
            return {
              ...prevState,
              environmental_risk_metrics: {
                ...prevState.environmental_risk_metrics,
                metrics: {
                  ...prevState.environmental_risk_metrics.metrics,
                  [MetricsList[i].metric_name]: 0,
                },
              },
              environmental_opportunity_metrics: {
                ...prevState.environmental_opportunity_metrics,
                metrics: {
                  ...prevState.environmental_opportunity_metrics.metrics,
                  [MetricsList[i].metric_name]: 0,
                },
              },
            };
          });
        } else if (MetricsList[i].pillar === "S") {
          setCustomMetricOppOrRisk((prevState) => {
            return {
              ...prevState,
              social_risk_metrics: {
                ...prevState.social_risk_metrics,
                [MetricsList[i].metric_name]: false,
              },
              social_opportunity_metrics: {
                ...prevState.social_opportunity_metrics,
                [MetricsList[i].metric_name]: true,
              },
            };
          });
          setCustomFramework((prevState) => {
            return {
              ...prevState,
              social_risk_metrics: {
                ...prevState.social_risk_metrics,
                metrics: {
                  ...prevState.social_risk_metrics.metrics,
                  [MetricsList[i].metric_name]: 0,
                },
              },
              social_opportunity_metrics: {
                ...prevState.social_opportunity_metrics,
                metrics: {
                  ...prevState.social_opportunity_metrics.metrics,
                  [MetricsList[i].metric_name]: 0,
                },
              },
            };
          });
        } else if (MetricsList[i].pillar === "G") {
          setCustomMetricOppOrRisk((prevState) => {
            return {
              ...prevState,
              governance_risk_metrics: {
                ...prevState.governance_risk_metrics,
                [MetricsList[i].metric_name]: false,
              },
              governance_opportunity_metrics: {
                ...prevState.governance_opportunity_metrics,
                [MetricsList[i].metric_name]: true,
              },
            };
          });
          setCustomFramework((prevState) => {
            return {
              ...prevState,
              governance_risk_metrics: {
                ...prevState.governance_risk_metrics,
                metrics: {
                  ...prevState.governance_risk_metrics.metrics,
                  [MetricsList[i].metric_name]: 0,
                },
              },
              governance_opportunity_metrics: {
                ...prevState.governance_opportunity_metrics,
                metrics: {
                  ...prevState.governance_opportunity_metrics.metrics,
                  [MetricsList[i].metric_name]: 0,
                },
              },
            };
          });
        } else {
          console.log("Error: Invalid category");
        }
      }
    }

    fetchData();
  }, []);

  const [CustomMetricOppOrRisk, setCustomMetricOppOrRisk] = useState({
    environmental_risk_metrics: {},
    environmental_opportunity_metrics: {},
    social_risk_metrics: {},
    social_opportunity_metrics: {},
    governance_risk_metrics: {},
    governance_opportunity_metrics: {},
  });

  const handleCustomMetricOppOrRisk = (category, metric) => {
    if (
      category === "environmental_risk_metrics" ||
      category === "environmental_opportunity_metrics"
    ) {
      setCustomMetricOppOrRisk((prevState) => {
        return {
          ...prevState,
          environmental_risk_metrics: {
            ...prevState.environmental_risk_metrics,
            [metric]: !prevState.environmental_risk_metrics[metric],
          },
          environmental_opportunity_metrics: {
            ...prevState.environmental_opportunity_metrics,
            [metric]: !prevState.environmental_opportunity_metrics[metric],
          },
        };
      });
    } else if (
      category === "social_risk_metrics" ||
      category === "social_opportunity_metrics"
    ) {
      setCustomMetricOppOrRisk((prevState) => {
        return {
          ...prevState,
          social_risk_metrics: {
            ...prevState.social_risk_metrics,
            [metric]: !prevState.social_risk_metrics[metric],
          },
          social_opportunity_metrics: {
            ...prevState.social_opportunity_metrics,
            [metric]: !prevState.social_opportunity_metrics[metric],
          },
        };
      });
    } else if (
      category === "governance_risk_metrics" ||
      category === "governance_opportunity_metrics"
    ) {
      setCustomMetricOppOrRisk((prevState) => {
        return {
          ...prevState,
          governance_risk_metrics: {
            ...prevState.governance_risk_metrics,
            [metric]: !prevState.governance_risk_metrics[metric],
          },
          governance_opportunity_metrics: {
            ...prevState.governance_opportunity_metrics,
            [metric]: !prevState.governance_opportunity_metrics[metric],
          },
        };
      });
    }
  };

  const [CustomFramework, setCustomFramework] = useState({
    framework_name: "New CustomFramework",
    user_name: localStorage.getItem("username"),
    environmental_risk_metrics: {
      indicator_weight: 0.175,
      metrics: {},
    },
    environmental_opportunity_metrics: {
      indicator_weight: 0.175,
      metrics: {},
    },
    social_risk_metrics: {
      indicator_weight: 0.125,
      metrics: {},
    },
    social_opportunity_metrics: {
      indicator_weight: 0.125,
      metrics: {},
    },
    governance_risk_metrics: {
      indicator_weight: 0.2,
      metrics: {},
    },
    governance_opportunity_metrics: {
      indicator_weight: 0.2,
      metrics: {},
    },
  });

  const [frameworks, setFrameworks] = useState([]);

  const [customWindowVisible, setCustomWindowVisible] = useState(false);
  const [nestedIndicators, setNestedIndicators] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [refreshKey, setRefreshKey] = useState(0); // Used to force a re-render of the component

  const [viewWindowVisible, setViewWindowVisible] = useState(false);

  const [CustomError, setCustomError] = useState("");

  const handleNestedIndicator = (index) => {
    let newNestedIndicators = [...nestedIndicators];
    newNestedIndicators[index] = !newNestedIndicators[index];
    setNestedIndicators(newNestedIndicators);
  };

  useEffect(() => {
    const fetchFrameworks = async () => {
      try {
        const user_name = localStorage.getItem("username");

        const response = await axios.get(
          `http://localhost:9090/getFramework?user_name=${user_name}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("frameworks page GET response", response);
        if (response.status === 200) {
          const sortedFrameworks = response.data.data.sort(
            (a, b) => new Date(b.creation_date) - new Date(a.creation_date)
          );
          setFrameworks(sortedFrameworks);
          const fixedFrameworks = [
            {
              framework_name: "IFRS S1",
              creation_date: "2021-10-05",
              environmental_risk_metrics: {
                "indicator er weight": 0.175,
                co2directscope1: 0.1,
                co2indirectscope2: 0.1,
                co2indirectscope3: 0.1,
                noxemissions: 0.05,
                soxemissions: 0.05,
                vocemissions: 0.05,
                "particulate matter emissions": 0.05,
                wastetotal: 0.1,
                hazardouswaste: 0.1,
                "airpollutants direct": 0.1,
                "airpollutants indirect": 0.1,
                waterwithdrawaltotal: 0.1,
              },
              environmental_opportunity_metrics: {
                "indicator eo weight": 0.175,
                "climate change risks opp": 0.2,
                "organic products initiatives": 0.15,
                analyticwasterecyclingratio: 0.2,
                "waste recycled": 0.15,
                "water technologies": 0.15,
                tranalyicrenewenergyuse: 0.15,
              },
              social_risk_metrics: {
                "indicator sr weight": 0.125,
                "employee fatalities": 0.25,
                "turnover employees": 0.2,
                "human rights violation pai": 0.3,
                "tir total": 0.25,
              },
              social_opportunity_metrics: {
                "indicator so weight": 0.125,

                "employee health safety policy": 0.25,
                "trade union rep": 0.35,
                "women employees": 0.2,
                "women managers": 0.2,
              },
              governance_risk_metrics: {
                "indicator gr weight": 0.2,
                "bribery and corruption pai insufficient actions": 1, //yes or no
              },
              governance_opportunity_metrics: {
                "indicator go weight": 0.2,
                "analytic audit commind": 0.15,
                "analytic board female": 0.1,
                "analytic comp commind": 0.1,
                "analytic nomination commind": 0.1,
                "audit comm nonexec members": 0.1,
                "board meeting attendance avg": 0.15,
                "comp comm nonexec members": 0.1,
                "analytic indep board": 0.15,
                "analytic nonexec board": 0.05,
              },
            },

            {
              framework_name: "IFRS S2",
              creation_date: "2022-10-05",
              environmental_risk_metrics: {
                "indicator er weight": 0.25,
                co2directscope1: 0.1,
                co2indirectscope2: 0.1,
                co2indirectscope3: 0.1,
                noxemissions: 0.05,
                soxemissions: 0.05,
                vocemissions: 0.05,
                "particulate matter emissions": 0.05,
                wastetotal: 0.1,
                hazardouswaste: 0.1,
                "airpollutants direct": 0.1,
                "airpollutants indirect": 0.1,
                waterwithdrawaltotal: 0.1,
              },
              environmental_opportunity_metrics: {
                "indicator eo weight": 0.25,
                "climate change risks opp": 0.2,
                "organic products initiatives": 0.15,
                analyticwasterecyclingratio: 0.2,
                "waste recycled": 0.15,
                "water technologies": 0.15,
                tranalyicrenewenergyuse: 0.15,
              },
              social_risk_metrics: {
                "indicator sr weight": 0.1,
                "employee fatalities": 0.25,
                "turnover employees": 0.2,
                "human rights violation pai": 0.3,
                "tir total": 0.25,
              },
              social_opportunity_metrics: {
                "indicator so weight": 0.1,

                "employee health safety policy": 0.25,
                "trade union rep": 0.35,
                "women employees": 0.2,
                "women managers": 0.2,
              },
              governance_risk_metrics: {
                "indicator gr weight": 0.15,
                "bribery and corruption pai insufficient actions": 1, //yes or no
              },
              governance_opportunity_metrics: {
                "indicator go weight": 0.15,
                "analytic audit commind": 0.15,
                "analytic board female": 0.1,
                "analytic comp commind": 0.1,
                "analytic nomination commind": 0.1,
                "audit comm nonexec members": 0.1,
                "board meeting attendance avg": 0.15,
                "comp comm nonexec members": 0.1,
                "analytic indep board": 0.15,
                "analytic nonexec board": 0.05,
              },
            },
            {
              framework_name: "TCFD",
              creation_date: "2023-10-05",
              environmental_risk_metrics: {
                "indicator er weight": 0.35,
                co2directscope1: 0.1,
                co2indirectscope2: 0.1,
                co2indirectscope3: 0.1,
                noxemissions: 0.05,
                soxemissions: 0.05,
                vocemissions: 0.05,
                "particulate matter emissions": 0.05,
                wastetotal: 0.1,
                hazardouswaste: 0.1,
                "airpollutants direct": 0.1,
                "airpollutants indirect": 0.1,
                waterwithdrawaltotal: 0.1,
              },
              environmental_opportunity_metrics: {
                "indicator eo weight": 0.35,
                "climate change risks opp": 0.2,
                "organic products initiatives": 0.15,
                analyticwasterecyclingratio: 0.2,
                "waste recycled": 0.15,
                "water technologies": 0.15,
                tranalyicrenewenergyuse: 0.15,
              },
              social_risk_metrics: {
                "indicator sr weight": 0.05,
                "employee fatalities": 0.25,
                "turnover employees": 0.2,
                "human rights violation pai": 0.3,
                "tir total": 0.25,
              },
              social_opportunity_metrics: {
                "indicator so weight": 0.05,

                "employee health safety policy": 0.25,
                "trade union rep": 0.35,
                "women employees": 0.2,
                "women managers": 0.2,
              },
              governance_risk_metrics: {
                "indicator gr weight": 0.1,
                "bribery and corruption pai insufficient actions": 1, //yes or no
              },
              governance_opportunity_metrics: {
                "indicator go weight": 0.1,
                "analytic audit commind": 0.15,
                "analytic board female": 0.1,
                "analytic comp commind": 0.1,
                "analytic nomination commind": 0.1,
                "audit comm nonexec members": 0.1,
                "board meeting attendance avg": 0.15,
                "comp comm nonexec members": 0.1,
                "analytic indep board": 0.15,
                "analytic nonexec board": 0.05,
              },
            },
            {
              framework_name: "TNFD",
              creation_date: "2020-10-05",
              environmental_risk_metrics: {
                "indicator er weight": 0.4,
                co2directscope1: 0.1,
                co2indirectscope2: 0.1,
                co2indirectscope3: 0.1,
                noxemissions: 0.05,
                soxemissions: 0.05,
                vocemissions: 0.05,
                "particulate matter emissions": 0.05,
                wastetotal: 0.1,
                hazardouswaste: 0.1,
                "airpollutants direct": 0.1,
                "airpollutants indirect": 0.1,
                waterwithdrawaltotal: 0.1,
              },
              environmental_opportunity_metrics: {
                "indicator eo weight": 0.35,
                "climate change risks opp": 0.2,
                "organic products initiatives": 0.15,
                analyticwasterecyclingratio: 0.2,
                "waste recycled": 0.15,
                "water technologies": 0.15,
                tranalyicrenewenergyuse: 0.15,
              },
              social_risk_metrics: {
                "indicator sr weight": 0.05,
                "employee fatalities": 0.25,
                "turnover employees": 0.2,
                "human rights violation pai": 0.3,
                "tir total": 0.25,
              },
              social_opportunity_metrics: {
                "indicator so weight": 0.05,

                "employee health safety policy": 0.25,
                "trade union rep": 0.35,
                "women employees": 0.2,
                "women managers": 0.2,
              },
              governance_risk_metrics: {
                "indicator gr weight": 0.1,
                "bribery and corruption pai insufficient actions": 1, //yes or no
              },
              governance_opportunity_metrics: {
                "indicator go weight": 0.05,
                "analytic audit commind": 0.15,
                "analytic board female": 0.1,
                "analytic comp commind": 0.1,
                "analytic nomination commind": 0.1,
                "audit comm nonexec members": 0.1,
                "board meeting attendance avg": 0.15,
                "comp comm nonexec members": 0.1,
                "analytic indep board": 0.15,
                "analytic nonexec board": 0.05,
              },
            },
            {
              framework_name: "APRA-CPG",
              creation_date: "2019-10-05",
              environmental_risk_metrics: {
                "indicator er weight": 0.3,
                co2directscope1: 0.1,
                co2indirectscope2: 0.1,
                co2indirectscope3: 0.1,
                noxemissions: 0.05,
                soxemissions: 0.05,
                vocemissions: 0.05,
                "particulate matter emissions": 0.05,
                wastetotal: 0.1,
                hazardouswaste: 0.1,
                "airpollutants direct": 0.1,
                "airpollutants indirect": 0.1,
                waterwithdrawaltotal: 0.1,
              },
              environmental_opportunity_metrics: {
                "indicator eo weight": 0.2,
                "climate change risks opp": 0.2,
                "organic products initiatives": 0.15,
                analyticwasterecyclingratio: 0.2,
                "waste recycled": 0.15,
                "water technologies": 0.15,
                tranalyicrenewenergyuse: 0.15,
              },
              social_risk_metrics: {
                "indicator sr weight": 0.1,
                "employee fatalities": 0.25,
                "turnover employees": 0.2,
                "human rights violation pai": 0.3,
                "tir total": 0.25,
              },
              social_opportunity_metrics: {
                "indicator so weight": 0.1,

                "employee health safety policy": 0.25,
                "trade union rep": 0.35,
                "women employees": 0.2,
                "women managers": 0.2,
              },
              governance_risk_metrics: {
                "indicator gr weight": 0.15,
                "bribery and corruption pai insufficient actions": 1, //yes or no
              },
              governance_opportunity_metrics: {
                "indicator go weight": 0.15,
                "analytic audit commind": 0.15,
                "analytic board female": 0.1,
                "analytic comp commind": 0.1,
                "analytic nomination commind": 0.1,
                "audit comm nonexec members": 0.1,
                "board meeting attendance avg": 0.15,
                "comp comm nonexec members": 0.1,
                "analytic indep board": 0.15,
                "analytic nonexec board": 0.05,
              },
            },
          ];

          setFrameworks((previousFrameworks) => [
            ...previousFrameworks,
            ...fixedFrameworks,
          ]);
        } else {
          console.error("Failed to fetch frameworks:", response.data.message);
          alert("Failed to fetch frameworks:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching frameworks:", error);
      }
    };

    fetchFrameworks();
  }, [refreshKey]); // Re-fetch frameworks when the refreshKey changes(when a new framework is created)

  const [currentFramework, setCurrentFramework] = useState([]);

  const handleCreateFrame = () => {
    resetCustomFramework();
    setCustomWindowVisible(true);
  };

  const simplifyFrame = (frame) => {
    let simplified = {};
    const weightRegex = /^indicator [a-z]{2} weight$/; //change based on the format of the weight key

    Object.keys(frame).forEach((key) => {
      if (typeof frame[key] === "object") {
        const weightKey = Object.keys(frame[key]).find((k) =>
          weightRegex.test(k)
        );
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
      // skip 0 weights
      let filteredCustomFramework = JSON.parse(JSON.stringify(CustomFramework)); // deep copy
      for (let category of top_categories) {
        for (let metric in filteredCustomFramework[category].metrics) {
          if (
            parseFloat(filteredCustomFramework[category].metrics[metric]) ===
              0 ||
            CustomMetricOppOrRisk[category][metric] === false
          ) {
            delete filteredCustomFramework[category].metrics[metric];
          }
        }
      }
      const response = await axios.post(
        "http://localhost:9090/basic/insertFramework", // url
        filteredCustomFramework, // data to be sent
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        } // token
      );
      if (response.status === 200) {
        console.log(
          "Custom framework created successfully:",
          response.data.message
        );
        console.log("Custom framework:", filteredCustomFramework);
        alert("Custom framework created successfully!");
        setRefreshKey(refreshKey + 1);
        setCustomWindowVisible(false);
      }
    } catch (error) {
      console.error(
        "Failed to create custom framework:",
        error.response.data.message
      );
      alert(error.response.data.message);
      alert(error.response.data.message);
      setCustomError(error.response.data.message);
    }
  };

  const handleEditFrameConfirm = async (e) => {
    e.preventDefault(); // prevent refresh
    if (!validateCustomFrameworkData(CustomFramework, "Edit")) {
      return;
    }
    try {
      // skip 0 weights
      let filteredCustomFramework = JSON.parse(JSON.stringify(CustomFramework)); // deep copy
      for (let category of top_categories) {
        for (let metric in filteredCustomFramework[category].metrics) {
          if (
            parseFloat(filteredCustomFramework[category].metrics[metric]) ===
              0 ||
            CustomMetricOppOrRisk[category][metric] === false
          ) {
            delete filteredCustomFramework[category].metrics[metric];
          }
        }
      }
      const response = await axios.put(
        "http://localhost:9090/basic/updateFramework", // url
        filteredCustomFramework, // data to be sent
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        } // token
      );
      if (response.status === 200) {
        console.log(
          "Custom framework edited successfully:",
          response.data.message
        );
        console.log("Custom framework:", filteredCustomFramework);
        alert("Custom framework created successfully!");
        setRefreshKey(refreshKey + 1);
        setEditWindowVisible(false);
      }
    } catch (error) {
      console.error(
        "Failed to edit custom framework:",
        error.response.data.message
      );
      alert(error.response.data.message);
      alert(error.response.data.message);
      setCustomError(error.response.data.message);
    }
  };

  const resetCustomFramework = () => {
    // reset the custom framework to the initial state and zero out the metrics in each category
    setCustomFramework((prevState) => {
      for (let category of top_categories) {
        if (
          category === "environmental_risk_metrics" ||
          category === "environmental_opportunity_metrics"
        ) {
          prevState[category].indicator_weight = 0.175;
        } else if (
          category === "social_risk_metrics" ||
          category === "social_opportunity_metrics"
        ) {
          prevState[category].indicator_weight = 0.125;
        } else if (
          category === "governance_risk_metrics" ||
          category === "governance_opportunity_metrics"
        ) {
          prevState[category].indicator_weight = 0.2;
        }
        for (let metric in prevState[category].metrics) {
          prevState[category].metrics[metric] = 0;
        }
        // reset the metrics in CustomMetricOppOrRisk
        if (
          category === "environmental_risk_metrics" ||
          category === "social_risk_metrics" ||
          category === "governance_risk_metrics"
        ) {
          for (let metric in CustomMetricOppOrRisk[category]) {
            CustomMetricOppOrRisk[category][metric] = false;
          }
        } else if (
          category === "environmental_opportunity_metrics" ||
          category === "social_opportunity_metrics" ||
          category === "governance_opportunity_metrics"
        ) {
          for (let metric in CustomMetricOppOrRisk[category]) {
            CustomMetricOppOrRisk[category][metric] = true;
          }
        }
      }
      return prevState;
    });
  };

  const handleDelete = async (user_name, frameworkName) => {
    try {
      const response = await axios.delete(
        `http://localhost:9090/delete_framework?user_name=${user_name}&framework_name=${frameworkName}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 添加token
          },
        }
      );

      if (response.status === 200) {
        console.log("Framework deleted successfully:", response.data.message);
        alert("Framework deleted successfully!");
        setRefreshKey(refreshKey + 1);
        setViewWindowVisible(false);
      } else {
        console.error("Failed to delete framework:", response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error(
        "Failed to delete framework:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Failed to delete framework");
    }
  };

  const [editWindowVisible, setEditWindowVisible] = useState(false);

  const handleToEditWindow = () => {
    resetCustomFramework();
    // get metrics weight from currentFramework and set to CustomFramework
    const regex = /^indicator [a-z]{2} weight$/;
    console.log(CustomFramework);
    setCustomFramework((prevState) => {
      for (let category of top_categories) {
        let matchedKey = Object.keys(currentFramework[category]).find((key) =>
          regex.test(key)
        );
        prevState[category].indicator_weight =
          currentFramework[category][matchedKey];
        // check if metric in currentFramework is in CustomFramework
        for (let metric in currentFramework[category]) {
          if (metric in prevState[category].metrics) {
            prevState[category].metrics[metric] =
              currentFramework[category][metric];
          }
        }
      }
      return prevState;
    });

    setViewWindowVisible(false);
    setEditWindowVisible(true);
  };

  const cardHeight = "450px";

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-3 mb-4">
          <div
            className="card h-100 d-flex align-items-center justify-content-center shadow card-hover"
            style={{
              cursor: "pointer",
              height: cardHeight,
            }}
            onClick={handleCreateFrame}
          >
            <div className="text-center">
              <img
                src={`FolderAdd.png`}
                alt="Create"
                style={{ width: "50px", height: "50px", marginBottom: "10px" }}
              />
              <p>Create your frame</p>
            </div>
          </div>
        </div>
        {frameworks.map((framework, index) => (
          <div key={index} className="col-3 mb-4">
            <div className="card h-100 d-flex flex-column justify-content-between shadow card-hover">
              <div className="card-body" style={{ height: cardHeight }}>
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="card-title text-center m-0">
                    {framework.framework_name}
                  </h4>
                  <img
                    src="View.png"
                    alt="View"
                    style={{
                      width: "1.8em",
                      height: "1.8em",
                      objectFit: "cover",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                    onClick={() => handleView(framework)}
                  />
                </div>
                <p className="card-text">
                  Creation Date: {framework.creation_date}
                </p>
                <RadarChart data={simplifyFrame(framework)} />
              </div>
              <div
                className="card-footer bg-transparent border-0 d-flex justify-content-center"
                style={{ marginBottom: "30px" }}
              >
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleSelect(framework)}
                >
                  Select
                </button>
                {!["IFRS S1", "IFRS S2", "TCFD", "TNFD", "APRA-CPG"].includes(
                  framework.framework_name
                ) && (
                  <img
                    src="Delete.png"
                    alt="Delete"
                    style={{
                      width: "2.2em",
                      height: "2.2em",
                      objectFit: "cover",
                      cursor: "pointer",
                      marginLeft: "60px",
                    }}
                    onClick={() => handleDelete(framework)}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        id="CustomFrameworkSetting"
        style={{
          display: customWindowVisible ? "flex" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "70%",
            height: "80%",
            backgroundColor: "#FFFFFF",
            padding: "20px",
            borderRadius: "5px",
            position: "relative",
          }}
        >
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            style={{ position: "absolute", top: "15px", right: "15px" }}
            onClick={() => setCustomWindowVisible(false)}
          ></button>
          <div style={{ height: "8%" }}>
            {CustomError && (
              <Alert severity="error" sx={{ width: "90%", margin: "auto" }}>
                {CustomError}
              </Alert>
            )}
          </div>
          <div style={{ overflow: "auto", height: "90%" }}>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  marginBottom: "40px",
                  marginTop: "20px",
                  display: "flex",
                }}
              >
                Custom Framework Setting
              </h2>
              <TextField
                id="framework_name"
                sx={{ width: "80%", maxWidth: "80%" }}
                label="Framework Name"
                value={CustomFramework.framework_name}
                onClick={() => setCustomError("")}
                onChange={(e) =>
                  setCustomFramework({
                    ...CustomFramework,
                    framework_name: e.target.value,
                  })
                }
                required
              />
              <List
                sx={{
                  width: "80%",
                  maxWidth: "80%",
                  bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                {top_categories.map((category, index) => (
                  <List
                    key={index}
                    subheader={
                      <ListSubheader component="div">{category}</ListSubheader>
                    }
                  >
                    <ListItemButton
                      key={index}
                      sx={{
                        border: "1px solid darkgrey",
                        borderRadius: "5px",
                        marginBottom: "5px",
                      }}
                      onClick={() => handleNestedIndicator(index)}
                    >
                      <ListItemText primary={category} />
                      <input
                        type="number"
                        className="form-control"
                        id={"indicator_weight_" + category}
                        name="indicator_weight"
                        style={{ width: "20%" }}
                        value={CustomFramework[category].indicator_weight}
                        min="0"
                        max="1"
                        step="0.01"
                        onClick={(event) => {
                          setCustomError("");
                          event.stopPropagation();
                        }}
                        onChange={(e) =>
                          setCustomFramework({
                            ...CustomFramework,
                            [category]: {
                              ...CustomFramework[category],
                              indicator_weight: e.target.value,
                            },
                          })
                        }
                        required
                      />
                      {nestedIndicators[index] ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={nestedIndicators[index]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {Object.keys(CustomFramework[category].metrics).map(
                          (metric, index) => (
                            <ListItemButton key={index} sx={{ pl: 4 }}>
                              <Checkbox
                                checked={
                                  CustomMetricOppOrRisk[category][metric]
                                }
                                onClick={() =>
                                  handleCustomMetricOppOrRisk(category, metric)
                                }
                              />
                              <Tooltip
                                title={
                                  MetricsList.find(
                                    (item) => item.metric_name === metric
                                  )?.metric_description
                                }
                                arrow
                              >
                                <ListItemText primary={metric} />
                              </Tooltip>
                              <input
                                type="number"
                                className="form-control"
                                id={category + "_" + metric}
                                name={category}
                                style={{ width: "20%" }}
                                min="0"
                                max="1"
                                step="0.01"
                                value={
                                  CustomFramework[category].metrics[metric]
                                }
                                disabled={
                                  !CustomMetricOppOrRisk[category][metric]
                                }
                                onClick={() => setCustomError("")}
                                onChange={(e) =>
                                  setCustomFramework({
                                    ...CustomFramework,
                                    [category]: {
                                      ...CustomFramework[category],
                                      metrics: {
                                        ...CustomFramework[category].metrics,
                                        [metric]: e.target.value,
                                      },
                                    },
                                  })
                                }
                                required
                              />
                            </ListItemButton>
                          )
                        )}
                      </List>
                    </Collapse>
                  </List>
                ))}
              </List>
              <Button
                variant="contained"
                size="medium"
                id="CustomFrameworkConfirm"
                style={{ marginTop: "10px" }}
                onClick={handleCustomFrameConfirm}
              >
                Confirm
              </Button>
            </Box>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div
          id="CustomFrameworkSetting"
          style={{
            display: customWindowVisible ? "flex" : "none",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "70%",
              height: "80%",
              backgroundColor: "#FFFFFF",
              padding: "20px",
              borderRadius: "5px",
              position: "relative",
            }}
          >
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              style={{ position: "absolute", top: "15px", right: "15px" }}
              onClick={() => setCustomWindowVisible(false)}
            ></button>
            <div style={{ height: "8%" }}>
              {CustomError && (
                <Alert severity="error" sx={{ width: "90%", margin: "auto" }}>
                  {CustomError}
                </Alert>
              )}
            </div>
            <div style={{ overflow: "auto", height: "90%" }}>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2
                  style={{
                    marginBottom: "40px",
                    marginTop: "20px",
                    display: "flex",
                  }}
                >
                  Custom Framework Setting
                </h2>
                <TextField
                  id="framework_name"
                  sx={{ width: "80%", maxWidth: "80%" }}
                  label="Framework Name"
                  value={CustomFramework.framework_name}
                  onClick={() => setCustomError("")}
                  onChange={(e) =>
                    setCustomFramework({
                      ...CustomFramework,
                      framework_name: e.target.value,
                    })
                  }
                  required
                />
                <List
                  sx={{
                    width: "80%",
                    maxWidth: "80%",
                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  {top_categories.map((category, index) => (
                    <List
                      key={index}
                      subheader={
                        <ListSubheader component="div">
                          {category}
                        </ListSubheader>
                      }
                    >
                      <ListItemButton
                        key={index}
                        sx={{
                          border: "1px solid darkgrey",
                          borderRadius: "5px",
                          marginBottom: "5px",
                        }}
                        onClick={() => handleNestedIndicator(index)}
                      >
                        <ListItemText primary={category} />
                        <input
                          type="number"
                          className="form-control"
                          id={"indicator_weight_" + category}
                          name="indicator_weight"
                          style={{ width: "20%" }}
                          value={CustomFramework[category].indicator_weight}
                          min="0"
                          max="1"
                          step="0.01"
                          onClick={(event) => {
                            setCustomError("");
                            event.stopPropagation();
                          }}
                          onChange={(e) =>
                            setCustomFramework({
                              ...CustomFramework,
                              [category]: {
                                ...CustomFramework[category],
                                indicator_weight: e.target.value,
                              },
                            })
                          }
                          required
                        />
                        {nestedIndicators[index] ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </ListItemButton>
                      <Collapse
                        in={nestedIndicators[index]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {Object.keys(CustomFramework[category].metrics).map(
                            (metric, index) => (
                              <ListItemButton key={index} sx={{ pl: 4 }}>
                                <Checkbox
                                  checked={
                                    CustomMetricOppOrRisk[category][metric]
                                  }
                                  onClick={() =>
                                    handleCustomMetricOppOrRisk(
                                      category,
                                      metric
                                    )
                                  }
                                />
                                <Tooltip
                                  title={
                                    MetricsList.find(
                                      (item) => item.metric_name === metric
                                    )?.metric_description
                                  }
                                  arrow
                                >
                                  <ListItemText primary={metric} />
                                </Tooltip>
                                <input
                                  type="number"
                                  className="form-control"
                                  id={category + "_" + metric}
                                  name={category}
                                  style={{ width: "20%" }}
                                  min="0"
                                  max="1"
                                  step="0.01"
                                  value={
                                    CustomFramework[category].metrics[metric]
                                  }
                                  disabled={
                                    !CustomMetricOppOrRisk[category][metric]
                                  }
                                  onClick={() => setCustomError("")}
                                  onChange={(e) =>
                                    setCustomFramework({
                                      ...CustomFramework,
                                      [category]: {
                                        ...CustomFramework[category],
                                        metrics: {
                                          ...CustomFramework[category].metrics,
                                          [metric]: e.target.value,
                                        },
                                      },
                                    })
                                  }
                                  required
                                />
                              </ListItemButton>
                            )
                          )}
                        </List>
                      </Collapse>
                    </List>
                  ))}
                </List>
                <Button
                  variant="contained"
                  size="medium"
                  id="CustomFrameworkConfirm"
                  style={{ marginTop: "10px" }}
                  onClick={handleCustomFrameConfirm}
                >
                  Confirm
                </Button>
              </Box>
            </div>
          </div>
        </div>

        <div
          id="CustomFrameworkEdit"
          style={{
            display: editWindowVisible ? "flex" : "none",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "70%",
              height: "80%",
              backgroundColor: "#FFFFFF",
              padding: "20px",
              borderRadius: "5px",
              position: "relative",
            }}
          >
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              style={{ position: "absolute", top: "15px", right: "15px" }}
              onClick={() => setEditWindowVisible(false)}
            ></button>
            <div style={{ height: "8%" }}>
              {CustomError && (
                <Alert severity="error" sx={{ width: "90%", margin: "auto" }}>
                  {CustomError}
                </Alert>
              )}
            </div>
            <div style={{ overflow: "auto", height: "90%" }}>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2
                  style={{
                    marginBottom: "40px",
                    marginTop: "20px",
                    display: "flex",
                  }}
                >
                  Custom Framework Editing
                </h2>
                <TextField
                  id="framework_to_be_mod"
                  sx={{ width: "80%", maxWidth: "80%" }}
                  label="Framework Name"
                  value={currentFramework?.framework_name || ""}
                  disabled
                />
                <List
                  sx={{
                    width: "80%",
                    maxWidth: "80%",
                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  {top_categories.map((category, index) => (
                    <List
                      key={index}
                      subheader={
                        <ListSubheader component="div">
                          {category}
                        </ListSubheader>
                      }
                    >
                      <ListItemButton
                        key={index}
                        sx={{
                          border: "1px solid darkgrey",
                          borderRadius: "5px",
                          marginBottom: "5px",
                        }}
                        onClick={() => handleNestedIndicator(index)}
                      >
                        <ListItemText primary={category} />
                        <input
                          type="number"
                          className="form-control"
                          id={"edit_indicator_weight_" + category}
                          name="indicator_weight"
                          style={{ width: "20%" }}
                          value={CustomFramework[category].indicator_weight}
                          min="0"
                          max="1"
                          step="0.01"
                          onClick={(event) => {
                            setCustomError("");
                            event.stopPropagation();
                          }}
                          onChange={(e) =>
                            setCustomFramework({
                              ...CustomFramework,
                              [category]: {
                                ...CustomFramework[category],
                                indicator_weight: e.target.value,
                              },
                            })
                          }
                          required
                        />
                        {nestedIndicators[index] ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </ListItemButton>
                      <Collapse
                        in={nestedIndicators[index]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {Object.keys(CustomFramework[category].metrics).map(
                            (metric, index) => (
                              <ListItemButton key={index} sx={{ pl: 4 }}>
                                <Checkbox
                                  checked={
                                    CustomMetricOppOrRisk[category][metric]
                                  }
                                  onClick={() =>
                                    handleCustomMetricOppOrRisk(
                                      category,
                                      metric
                                    )
                                  }
                                />
                                <Tooltip
                                  title={
                                    MetricsList.find(
                                      (item) => item.metric_name === metric
                                    )?.metric_description
                                  }
                                  arrow
                                >
                                  <ListItemText primary={metric} />
                                </Tooltip>
                                <input
                                  type="number"
                                  className="form-control"
                                  id={category + "_" + metric}
                                  name={category}
                                  style={{ width: "20%" }}
                                  min="0"
                                  max="1"
                                  step="0.01"
                                  value={
                                    CustomFramework[category].metrics[metric]
                                  }
                                  disabled={
                                    !CustomMetricOppOrRisk[category][metric]
                                  }
                                  onClick={() => setCustomError("")}
                                  onChange={(e) =>
                                    setCustomFramework({
                                      ...CustomFramework,
                                      [category]: {
                                        ...CustomFramework[category],
                                        metrics: {
                                          ...CustomFramework[category].metrics,
                                          [metric]: e.target.value,
                                        },
                                      },
                                    })
                                  }
                                  required
                                />
                              </ListItemButton>
                            )
                          )}
                        </List>
                      </Collapse>
                    </List>
                  ))}
                </List>
                <Button
                  variant="contained"
                  size="medium"
                  id="EditFrameworkConfirm"
                  style={{ marginTop: "10px" }}
                  onClick={handleEditFrameConfirm}
                >
                  Confirm
                </Button>
              </Box>
            </div>
          </div>
        </div>
        <div
          id="CustomFrameworkEdit"
          style={{
            display: editWindowVisible ? "flex" : "none",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "70%",
              height: "80%",
              backgroundColor: "#FFFFFF",
              padding: "20px",
              borderRadius: "5px",
              position: "relative",
            }}
          >
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              style={{ position: "absolute", top: "15px", right: "15px" }}
              onClick={() => setEditWindowVisible(false)}
            ></button>
            <div style={{ height: "8%" }}>
              {CustomError && (
                <Alert severity="error" sx={{ width: "90%", margin: "auto" }}>
                  {CustomError}
                </Alert>
              )}
            </div>
            <div style={{ overflow: "auto", height: "90%" }}>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2
                  style={{
                    marginBottom: "40px",
                    marginTop: "20px",
                    display: "flex",
                  }}
                >
                  Custom Framework Editing
                </h2>
                <TextField
                  id="framework_to_be_mod"
                  sx={{ width: "80%", maxWidth: "80%" }}
                  label="Framework Name"
                  value={currentFramework?.framework_name || ""}
                  disabled
                />
                <List
                  sx={{
                    width: "80%",
                    maxWidth: "80%",
                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  {top_categories.map((category, index) => (
                    <List
                      key={index}
                      subheader={
                        <ListSubheader component="div">
                          {category}
                        </ListSubheader>
                      }
                    >
                      <ListItemButton
                        key={index}
                        sx={{
                          border: "1px solid darkgrey",
                          borderRadius: "5px",
                          marginBottom: "5px",
                        }}
                        onClick={() => handleNestedIndicator(index)}
                      >
                        <ListItemText primary={category} />
                        <input
                          type="number"
                          className="form-control"
                          id={"edit_indicator_weight_" + category}
                          name="indicator_weight"
                          style={{ width: "20%" }}
                          value={CustomFramework[category].indicator_weight}
                          min="0"
                          max="1"
                          step="0.01"
                          onClick={(event) => {
                            setCustomError("");
                            event.stopPropagation();
                          }}
                          onChange={(e) =>
                            setCustomFramework({
                              ...CustomFramework,
                              [category]: {
                                ...CustomFramework[category],
                                indicator_weight: e.target.value,
                              },
                            })
                          }
                          required
                        />
                        {nestedIndicators[index] ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </ListItemButton>
                      <Collapse
                        in={nestedIndicators[index]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {Object.keys(CustomFramework[category].metrics).map(
                            (metric, index) => (
                              <ListItemButton key={index} sx={{ pl: 4 }}>
                                <Checkbox
                                  checked={
                                    CustomMetricOppOrRisk[category][metric]
                                  }
                                  onClick={() =>
                                    handleCustomMetricOppOrRisk(
                                      category,
                                      metric
                                    )
                                  }
                                />
                                <Tooltip
                                  title={
                                    MetricsList.find(
                                      (item) => item.metric_name === metric
                                    )?.metric_description
                                  }
                                  arrow
                                >
                                  <ListItemText primary={metric} />
                                </Tooltip>
                                <input
                                  type="number"
                                  className="form-control"
                                  id={category + "_" + metric}
                                  name={category}
                                  style={{ width: "20%" }}
                                  min="0"
                                  max="1"
                                  step="0.01"
                                  value={
                                    CustomFramework[category].metrics[metric]
                                  }
                                  disabled={
                                    !CustomMetricOppOrRisk[category][metric]
                                  }
                                  onClick={() => setCustomError("")}
                                  onChange={(e) =>
                                    setCustomFramework({
                                      ...CustomFramework,
                                      [category]: {
                                        ...CustomFramework[category],
                                        metrics: {
                                          ...CustomFramework[category].metrics,
                                          [metric]: e.target.value,
                                        },
                                      },
                                    })
                                  }
                                  required
                                />
                              </ListItemButton>
                            )
                          )}
                        </List>
                      </Collapse>
                    </List>
                  ))}
                </List>
                <Button
                  variant="contained"
                  size="medium"
                  id="EditFrameworkConfirm"
                  style={{ marginTop: "10px" }}
                  onClick={handleEditFrameConfirm}
                >
                  Confirm
                </Button>
              </Box>
            </div>
          </div>
        </div>

        {viewWindowVisible && currentFramework && (
          <div
            id="ViewFrameworkSetting"
            style={{
              display: "flex",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "70%",
                height: "80%",
                backgroundColor: "#FFFFFF",
                padding: "20px",
                borderRadius: "5px",
                position: "relative",
              }}
            >
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                style={{ position: "absolute", top: "15px", right: "15px" }}
                onClick={() => setViewWindowVisible(false)}
              ></button>
              <div style={{ overflow: "auto", height: "90%" }}>
                <Box
                  component="div"
                  noValidate
                  autoComplete="off"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h2
                    style={{
                      marginBottom: "20px",
                      marginTop: "20px",
                      display: "flex",
                    }}
                  >
                    {currentFramework.framework_name}
                    {![
                      "IFRS S1",
                      "IFRS S2",
                      "TCFD",
                      "TNFD",
                      "APRA-CPG",
                    ].includes(currentFramework.framework_name) && (
                      <img
                        src="/EpEdit.png"
                        alt="Edit"
                        style={{
                          width: "36px",
                          height: "36px",
                          marginLeft: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleToEditWindow(currentFramework)}
                      />
                    )}
                  </h2>
                  <p style={{ marginBottom: "40px", display: "flex" }}>
                    Creation Date: {currentFramework.creation_date}
                  </p>
                  <List
                    sx={{
                      width: "80%",
                      maxWidth: "80%",
                      bgcolor: "background.paper",
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                      <ListSubheader component="div" id="nested-list-subheader">
                        Indicator Weights
                      </ListSubheader>
                    }
                  >
                    {top_categories.map((category, index) => {
                      const weightKey = Object.keys(
                        currentFramework[category] || {}
                      ).find((key) => /^indicator [a-z]{2} weight$/.test(key));
                      return (
                        <List key={index}>
                          <ListItemButton
                            sx={{
                              border: "1px solid darkgrey",
                              borderRadius: "5px",
                              marginBottom: "5px",
                              padding: "10px",
                            }}
                            onClick={() => handleNestedIndicator(index)}
                          >
                            <ListItemText
                              primary={category}
                              secondary={
                                weightKey
                                  ? `Weight: ${currentFramework[category][weightKey]}`
                                  : "Frame does not own this type of metrics"
                              }
                            />
                            {nestedIndicators[index] ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
                          </ListItemButton>
                          <Collapse
                            in={nestedIndicators[index]}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List component="div" disablePadding>
                              {currentFramework[category] &&
                                Object.entries(currentFramework[category]).map(
                                  ([key, value], idx) =>
                                    !/^indicator_[a-z]{2}_weight$/.test(
                                      key
                                    ) && (
                                      <ListItemText
                                        key={idx}
                                        primary={`${key}: ${value}`}
                                        sx={{
                                          pl: 4,
                                          border: "1px solid lightgrey",
                                          borderRadius: "5px",
                                          marginBottom: "5px",
                                          padding: "10px",
                                        }}
                                      />
                                    )
                                )}
                            </List>
                          </Collapse>
                        </List>
                      );
                    })}
                  </List>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: ![
                        "IFRS S1",
                        "IFRS S2",
                        "TCFD",
                        "TNFD",
                        "APRA-CPG",
                      ].includes(currentFramework.framework_name)
                        ? "space-between"
                        : "center",
                      width: "50%",
                    }}
                  >
                    <Button
                      variant="contained"
                      size="medium"
                      id="CompanySelectingConfirm"
                      onClick={() => handleSelect(currentFramework)}
                      style={{ marginRight: "10px" }}
                    >
                      Select
                    </Button>
                    {![
                      "IFRS S1",
                      "IFRS S2",
                      "TCFD",
                      "TNFD",
                      "APRA-CPG",
                    ].includes(currentFramework.framework_name) && (
                      <Button
                        variant="contained"
                        size="medium"
                        color="primary"
                        onClick={() =>
                          handleDelete(
                            localStorage.getItem("username"),
                            currentFramework.framework_name
                          )
                        }
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </Box>
              </div>
            </div>
          </div>
        )}
      </div>
      {viewWindowVisible && currentFramework && (
        <div
          id="ViewFrameworkSetting"
          style={{
            display: "flex",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "70%",
              height: "80%",
              backgroundColor: "#FFFFFF",
              padding: "20px",
              borderRadius: "5px",
              position: "relative",
            }}
          >
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              style={{ position: "absolute", top: "15px", right: "15px" }}
              onClick={() => setViewWindowVisible(false)}
            ></button>
            <div style={{ overflow: "auto", height: "90%" }}>
              <Box
                component="div"
                noValidate
                autoComplete="off"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2
                  style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    display: "flex",
                  }}
                >
                  {currentFramework.framework_name}
                  {!["IFRS S1", "IFRS S2", "TCFD", "TNFD", "APRA-CPG"].includes(
                    currentFramework.framework_name
                  ) && (
                    <img
                      src="/EpEdit.png"
                      alt="Edit"
                      style={{
                        width: "36px",
                        height: "36px",
                        marginLeft: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleToEditWindow(currentFramework)}
                    />
                  )}
                </h2>
                <p style={{ marginBottom: "40px", display: "flex" }}>
                  Creation Date: {currentFramework.creation_date}
                </p>
                <List
                  sx={{
                    width: "80%",
                    maxWidth: "80%",
                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Indicator Weights
                    </ListSubheader>
                  }
                >
                  {top_categories.map((category, index) => {
                    const weightKey = Object.keys(
                      currentFramework[category] || {}
                    ).find((key) => /^indicator [a-z]{2} weight$/.test(key));
                    return (
                      <List key={index}>
                        <ListItemButton
                          sx={{
                            border: "1px solid darkgrey",
                            borderRadius: "5px",
                            marginBottom: "5px",
                            padding: "10px",
                          }}
                          onClick={() => handleNestedIndicator(index)}
                        >
                          <ListItemText
                            primary={category}
                            secondary={
                              weightKey
                                ? `Weight: ${currentFramework[category][weightKey]}`
                                : "Frame does not own this type of metrics"
                            }
                          />
                          {nestedIndicators[index] ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </ListItemButton>
                        <Collapse
                          in={nestedIndicators[index]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            {currentFramework[category] &&
                              Object.entries(currentFramework[category]).map(
                                ([key, value], idx) =>
                                  !/^indicator_[a-z]{2}_weight$/.test(key) && (
                                    <ListItemText
                                      key={idx}
                                      primary={`${key}: ${value}`}
                                      sx={{
                                        pl: 4,
                                        border: "1px solid lightgrey",
                                        borderRadius: "5px",
                                        marginBottom: "5px",
                                        padding: "10px",
                                      }}
                                    />
                                  )
                              )}
                          </List>
                        </Collapse>
                      </List>
                    );
                  })}
                </List>
                <div
                  style={{
                    display: "flex",
                    justifyContent: ![
                      "IFRS S1",
                      "IFRS S2",
                      "TCFD",
                      "TNFD",
                      "APRA-CPG",
                    ].includes(currentFramework.framework_name)
                      ? "space-between"
                      : "center",
                    width: "50%",
                  }}
                >
                  <Button
                    variant="contained"
                    size="medium"
                    id="CompanySelectingConfirm"
                    onClick={() => handleSelect(currentFramework)}
                    style={{ marginRight: "10px" }}
                  >
                    Select
                  </Button>
                  {!["IFRS S1", "IFRS S2", "TCFD", "TNFD", "APRA-CPG"].includes(
                    currentFramework.framework_name
                  ) && (
                    <Button
                      variant="contained"
                      size="medium"
                      color="primary"
                      onClick={() =>
                        handleDelete(
                          localStorage.getItem("username"),
                          currentFramework.framework_name
                        )
                      }
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </Box>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FrameSelect;
