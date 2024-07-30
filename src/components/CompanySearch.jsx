import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import Select from "react-select";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import RatingReport from "./RatingReport";
import DownloadReport from "./DownloadReport";
import Papa from "papaparse";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels
);

const CompanySearch = () => {
  const { frameworkName } = useParams();
  const userName = localStorage.getItem("username");
  const location = useLocation();
  const { simplifiedFrame } = location.state || {};
  const navigate = useNavigate();
  //const mock = new MockAdapter(axios);

  // mock.onGet(new RegExp('/api/rating')).reply(config => {
  //     const { industry, company, year } = config.params;
  //     console.log(industry)
  //     console.log(company)
  //     console.log(year)
  //     const token = config.headers['Authorization'];
  //     const decodedIndustry = decodeURIComponent(industry);

  //     if (token !== `Bearer ${localStorage.getItem('token')}`) {
  //         return [401, { code: 401, status: "failed", message: "Unauthorized", timestamp: Date.now(), data: null }];
  //     }

  //     if (decodedIndustry === 'Information Technology' && company === 'Apple' && year === '1000') {
  //         return [400, {
  //             "code": 400,
  //             "status": "failed",
  //             "message": "'year' must be a valid number representing the year.",
  //             "timestamp": 1718203200000,
  //             "data": null
  //         }];
  //     }

  //     if (decodedIndustry === 'Financial Technology (Fintech) & Infrastructure' && company === 'JPMorgan' && year === '2021') {
  //         return [200, {
  //             "code": 200,
  //             "status": "succeed",
  //             "message": "ESG Rating calculated successfully.",
  //             "timestamp": 1718203200000,
  //             "data": [
  //                 {
  //                     "er_weight": "0.0007",
  //                     "eo_weight": "0.0007",
  //                     "sr_weight": "0.1000",
  //                     "so_weight": "0.7848",
  //                     "gr_weight": "0.2238",
  //                     "go_weight": "0.8000",
  //                     "Rating of Company": "3.1215"
  //                 },
  //                 {
  //                     "er_weight": "0.0009",
  //                     "eo_weight": "0.0050",
  //                     "sr_weight": "0.1000",
  //                     "so_weight": "0.7848",
  //                     "gr_weight": "0.2238",
  //                     "go_weight": "0.7383",
  //                     "Average Rating of Industry": "3.1192"
  //                 }
  //             ]
  //         }];
  //     }

  //     if (decodedIndustry === 'Information Technology' && company === 'Apple' && year === '2022') {
  //         return [404, {
  //             "code": 404,
  //             "status": "failed",
  //             "message": "Didn’t find any data for this company in this industry for this year.",
  //             "timestamp": 1718203200000,
  //             "data": null
  //         }];
  //     }

  //     return [500, {
  //         "code": 500,
  //         "status": "error",
  //         "message": "Internal Server Error",
  //         "timestamp": Date.now(),
  //         "data": null
  //     }];
  // });

  const [options_industry, setOptionsIndustry] = useState([]);

  useEffect(() => {
    fetch("/industry.csv")
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: true,
          complete: (results) => {
            const industries = results.data.map((item) => ({
              value: item.industry_name,
              label: item.industry_name,
            }));
            setOptionsIndustry(industries);
          },
        });
      });
  }, []);

  const [error, setError] = useState("");
  const [rating, setRating] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCompanySelecting = async (e) => {
    setRating(null);
    setError("");
    e.preventDefault();
    setIsSubmitted(true);
    console.log("Selected Industry:", selectedIndustry);
    console.log("Selected Company:", selectedCompany);
    console.log("Selected Year:", selectedYear);
    try {
      const response = await axios.get(`http://localhost:9090/basic/rating`, {
        params: {
          framework_name: frameworkName,
          user_name: userName,
          industry: encodeURIComponent(selectedIndustry.value),
          company: encodeURIComponent(selectedCompany),
          year: selectedYear,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log("API Response:", response);
      if (response.status === 200) {
        console.log("Rating Data:", response.data.data);
        setRating(response.data.data);
      }
    } catch (error) {
      console.error("API Error:", error);
      if (error.response) {
        switch (error.response.data.code) {
          case "1000":
            setError("Invalid company format.");
            break;
          case "1001":
            setError("Invalid industry format.");
            break;
          case "1002":
            setError("Invalid year format.");
            break;
          case "1003":
            setError("No such company in this industry.");
            break;
          case "4006":
            setError("Framework does not exist.");
            break;
          case "5001":
            setError(
              "Insufficient data in the database to calculate the rating."
            );
            break;
          default:
            setError("An unexpected error occurred. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleCompanyChange = (e) => {
    error && setError("");
    setSelectedCompany(e.target.value);
  };

  const handleYear = (e) => {
    error && setError("");
    setSelectedYear(e.target.value);
  };

  const handleIndustry = (e) => {
    error && setError("");
    setSelectedIndustry(e);
  };

  const convertToPercentage = (value) => {
    return (parseFloat(value) * 100).toFixed(2);
  };

  const pieData = {
    labels: [
      "Environmental Risk",
      "Environmental Opportunity",
      "Social Risk",
      "Social Opportunity",
      "Governance Risk",
      "Governance Opportunity",
    ],
    datasets: [
      {
        label: "Company",
        data: rating
          ? [
              convertToPercentage(rating[0].er_weight),
              convertToPercentage(rating[0].eo_weight),
              convertToPercentage(rating[0].sr_weight),
              convertToPercentage(rating[0].so_weight),
              convertToPercentage(rating[0].gr_weight),
              convertToPercentage(rating[0].go_weight),
            ]
          : [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverOffset: 15,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      datalabels: {
        display: false,
      },
    },
    cutout: "50%",
  };

  const barData = {
    labels: [
      "Environmental Risk",
      "Environmental Opportunity",
      "Social Risk",
      "Social Opportunity",
      "Governance Risk",
      "Governance Opportunity",
    ],
    datasets: [
      {
        label: "Company",
        data: rating
          ? [
              convertToPercentage(rating[0].er_weight),
              convertToPercentage(rating[0].eo_weight),
              convertToPercentage(rating[0].sr_weight),
              convertToPercentage(rating[0].so_weight),
              convertToPercentage(rating[0].gr_weight),
              convertToPercentage(rating[0].go_weight),
            ]
          : [],
        backgroundColor: "#FF9F40",
      },
      {
        label: "Industry",
        data: rating
          ? [
              convertToPercentage(rating[1].er_weight),
              convertToPercentage(rating[1].eo_weight),
              convertToPercentage(rating[1].sr_weight),
              convertToPercentage(rating[1].so_weight),
              convertToPercentage(rating[1].gr_weight),
              convertToPercentage(rating[1].go_weight),
            ]
          : [],
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
        formatter: (value) => `${Math.round(value)}%`,
        font: {
          weight: "bold",
          size: 10,
        },
        color: "gray",
        offset: -5,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        categoryPercentage: 0.6,
        barPercentage: 0.8,
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  const descriptions = [
    "This metric represents the environmental risk weight of the company.",
    "This metric indicates the environmental opportunity weight of the company.",
    "This metric shows the social risk weight of the company.",
    "This metric reflects the social opportunity weight of the company.",
    "This metric denotes the governance risk weight of the company.",
    "This metric signifies the governance opportunity weight of the company.",
    "Rating of Company: This is the overall ESG rating of the company.",
  ];

  const handleDownload = () => {
    const dataToSend = {
      rating,
      simplifiedFrame,
      pieData,
      pieOptions,
      barData,
      barOptions,
      descriptions,
      selectedIndustry,
      selectedCompany,
      selectedYear,
    };
    navigate("/downloadreport", {
      state: JSON.parse(JSON.stringify(dataToSend)),
    });
  };

  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <form>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: "10px",
            margin: "20px",
            width: "95%",
          }}
        >
          <div style={{ width: "25%" }}>
            <Select
              options={options_industry}
              placeholder="industry"
              onChange={handleIndustry}
              value={selectedIndustry}
            />
          </div>
          <div style={{ width: "25%" }}>
            <input
              className="form-control me-2"
              type="search"
              aria-label="Search"
              placeholder="company"
              onChange={handleCompanyChange}
              value={selectedCompany}
            ></input>
          </div>
          <div style={{ width: "25%" }}>
            <input
              className="form-control me-2"
              type="number"
              aria-label="Year"
              placeholder="year"
              onChange={handleYear}
              value={selectedYear}
            ></input>
          </div>
          <div style={{ width: "10%" }}>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleCompanySelecting}
            >
              Search
            </button>
          </div>
        </div>
      </form>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
      {isSubmitted ? (
        rating !== null && (
          <div>
            <RatingReport
              data={rating}
              simplifiedFrame={simplifiedFrame}
              pieData={pieData}
              pieOptions={pieOptions}
              barData={barData}
              barOptions={barOptions}
              descriptions={descriptions}
              Industry={selectedIndustry}
              Company={selectedCompany}
              Year={selectedYear}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <button className="btn btn-primary" onClick={handleDownload}>
                Download report
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="container my-5">
          <div className="content">
            <h3 className="mb-3">Frame Select - User Guide</h3>
            <section className="mb-4">
              <h4>Industry</h4>
              <p>
                You need to select a Industry where the company belongs. E.G:
                Apple belongs to IT
              </p>
            </section>
            <section className="mb-4">
              <h4>Company and Year</h4>
              <p>
                Typing company name in second input. Finally, give us a year
                which you want to search, please do not typing years like 1000.
              </p>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanySearch;
