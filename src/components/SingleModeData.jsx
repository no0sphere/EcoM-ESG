import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const SingleModeData = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  //Read the Description from the csv file in public folder
  const [Description, setDescription] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/MetricDescription.csv");
      const reader = response.body.getReader();
      const result = await reader.read(); // raw read of the stream
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // convert stream to text
      Papa.parse(csv, {
        complete: function (results) {
          console.log("Parsed results:", results);
          setDescription(results.data);
        },
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      });
    }

    fetchData();
  }, []);

  //Read the Industry from the csv file in public folder
  const [options_industry, setOptions_Industry] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/industry.csv");
      const reader = response.body.getReader();
      const result = await reader.read(); // raw read of the stream
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // convert stream to text
      Papa.parse(csv, {
        complete: function (results) {
          console.log("Parsed results:", results);
          setOptions_Industry(results.data);
        },
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      });
    }
    fetchData();
  }, []);

  const [error, setError] = useState("");

  const handleSearchIndustry = async (e) => {
    try {
      console.log("selectedIndustry", e);
      console.log(
        "get",
        `http://localhost:9090/basic/single/companies?industryName=${encodeURIComponent(
          e
        )}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const response = await axios.get(
        `http://localhost:9090/basic/single/companies?industryName=${encodeURIComponent(
          e
        )}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200 && response.data.status === 200) {
        console.log("response", response);
        setCompanies(response.data.data);
      } else {
        //error
        console.log("response", response);
        setError(response.data.message);
      }
    } catch (error) {
      console.log("error", error);
      setError("Error:", error.message);
    }
  };

  const [Companies, setCompanies] = useState([]);

  const handleSearchCompany = async (e) => {
    try {
      console.log("selectedCompany", e);
      console.log(
        "get",
        `http://localhost:9090/basic/single/years?company=${encodeURIComponent(
          e
        )}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const response = await axios.get(
        `http://localhost:9090/basic/single/years?company=${encodeURIComponent(
          e
        )}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200 && response.data.status === 200) {
        console.log("response", response);
        setYears(response.data.data);
        console.log("Years", Years);
      } else {
        //error
        console.log("response", response);
        setError(response.data.message);
      }
    } catch (error) {
      console.log("error", error);
      setError("Error:", error.message);
    }
  };

  const [Years, setYears] = useState([]);

  const handleCompanySelecting = async (e) => {
    setIndicators([]);
    setError("");
    e.preventDefault(); // prevent refresh
    try {
      console.log("selectedIndustry", selectedIndustry);
      console.log("selectedCompany", selectedCompany);
      console.log("selectedYear", selectedYear);
      console.log(
        "get",
        `http://localhost:9090/basic/single?industry=${encodeURIComponent(
          selectedIndustry.value
        )}&company=${encodeURIComponent(selectedCompany.value)}&year=${
          selectedYear.value
        }`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const response = await axios.get(
        `http://localhost:9090/basic/single?industry=${encodeURIComponent(
          selectedIndustry.value
        )}&company=${encodeURIComponent(selectedCompany.value)}&year=${
          selectedYear.value
        }`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200 && response.data.status === 200) {
        console.log("response", response);
        setIndicators(response.data.data.metrics);
        console.log("Indicators", Indicators);
      } else {
        //error
        console.log("response", response);
        setError(response.data.message);
      }
    } catch (error) {
      console.log("error", error);
      setError("Error:", error.message);
    }
  };

  const [Indicators, setIndicators] = useState([]);

  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const handleIndustryChange = (e) => {
    error && setError("");
    setSelectedIndustry(e);
    handleSearchIndustry(e.value);
  };

  const handleCompanyChange = (e) => {
    error && setError("");
    setSelectedCompany(e);
    handleSearchCompany(e.value);
  };

  const handleYearChange = (e) => {
    error && setError("");
    setSelectedYear(e);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div className="container">
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
              options={options_industry.map((item) => {
                return { value: item.industry_name, label: item.industry_name };
              })}
              placeholder="industry"
              onChange={handleIndustryChange}
              value={selectedIndustry}
            />
          </div>
          <div style={{ width: "25%" }}>
            <Select
              options={Companies.map((item) => {
                return { value: item, label: item };
              })}
              placeholder="company"
              onChange={handleCompanyChange}
              value={selectedCompany}
              isDisabled={selectedIndustry ? false : true}
            />
          </div>
          <div style={{ width: "25%" }}>
            <Select
              options={Years.map((item) => {
                return { value: item, label: item };
              })}
              placeholder="year"
              onChange={handleYearChange}
              value={selectedYear}
              isDisabled={selectedCompany ? false : true}
            />
          </div>
          <div style={{ width: "10%" }}>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleCompanySelecting}
              disabled={
                selectedYear && selectedCompany && selectedIndustry
                  ? false
                  : true
              }
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          margin: "10px",
          width: "100%",
          height: "40vw",
        }}
      >
        <div id="IndicatorTable" style={{ height: "90%" }}>
          <div
            id="CompanyName&year"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <h2 style={{ marginRight: "5px" }}>
              {selectedCompany ? selectedCompany.value : "No company selected"}
            </h2>
            <h5 style={{ marginLeft: "5px" }}>
              {selectedYear
                ? "(" + selectedYear.value + ")"
                : "(No year selected)"}
            </h5>
          </div>
          <TableContainer
            component={Paper}
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              maxHeight: "100%",
              overflow: "auto",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell scope="col" sx={{ maxWidth: "100px" }}>
                    Indicator
                  </StyledTableCell>
                  <StyledTableCell scope="col" sx={{ maxWidth: "100px" }}>
                    Pillar
                  </StyledTableCell>
                  <StyledTableCell scope="col" sx={{ maxWidth: "100px" }}>
                    Description
                  </StyledTableCell>
                  <StyledTableCell scope="col" sx={{ maxWidth: "100px" }}>
                    Value
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Indicators.map((indicator, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{indicator.metric}</StyledTableCell>
                    <StyledTableCell>
                      {
                        Description.find(
                          (item) => item.metric_name === indicator.metric
                        )?.pillar
                      }
                    </StyledTableCell>
                    <StyledTableCell>
                      {
                        Description.find(
                          (item) => item.metric_name === indicator.metric
                        )?.metric_description
                      }
                    </StyledTableCell>
                    <StyledTableCell>
                      {indicator.value} {indicator.unit}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default SingleModeData;
