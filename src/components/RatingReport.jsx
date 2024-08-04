import React, { useRef } from "react";
import { Doughnut, Bar } from "react-chartjs-2";

const convertToPercentage = (value) => {
  return (parseFloat(value) * 100).toFixed(2);
};

const getMaxWeight = (data) => {
  const weights = [
    { key: "er_weight", label: "Environmental Risk" },
    { key: "eo_weight", label: "Environmental Opportunity" },
    { key: "sr_weight", label: "Social Risk" },
    { key: "so_weight", label: "Social Opportunity" },
    { key: "gr_weight", label: "Governance Risk" },
    { key: "go_weight", label: "Governance Opportunity" },
  ];

  let maxWeight = { key: "", value: 0, label: "" };

  weights.forEach((weight) => {
    const value = parseFloat(data[weight.key]);
    if (value > maxWeight.value) {
      maxWeight = { key: weight.key, value: value, label: weight.label };
    }
  });

  return maxWeight;
};

const weightNames = {
  er_weight: "Environmental Risk",
  eo_weight: "Environmental Opportunity",
  sr_weight: "Social Risk",
  so_weight: "Social Opportunity",
  gr_weight: "Governance Risk",
  go_weight: "Governance Opportunity",
};

const getTextColor = (companyValue, industryValue) => {
  return parseFloat(companyValue) > parseFloat(industryValue) ? "red" : "green";
};

const getComparisonImage = (companyValue, industryValue) => {
  return parseFloat(companyValue) > parseFloat(industryValue)
    ? "/Rise.png"
    : "/Decline.png";
};

const RatingReport = ({
  data,
  pieData,
  pieOptions,
  barData,
  barOptions,
  descriptions,
  Industry,
  Company,
  Year,
}) => {
  if (!data || data.length < 2) {
    return <div>No data available</div>;
  }

  const barChartRef = useRef(null);

  const maxWeight = getMaxWeight(data[0]);

  return (
    <div
      className="container mt-4"
      style={{
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 className="text-center" style={{ fontWeight: 600, color: "#333" }}>
        {Industry.label} - {Company} ({Year})
      </h3>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        Company Rating: {data[0]["Rating of Company"]}
        <img
          src={getComparisonImage(
            parseFloat(data[0]["Rating of Company"]),
            parseFloat(data[1]["Average Rating of Industry"])
          )}
          alt="comparison"
          style={{ marginLeft: "5px", width: "24px", height: "24px" }}
        />
      </p>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        Rating Average: {data[1]["Average Rating of Industry"]}
      </p>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        Most valuable weight: {maxWeight.label} -{" "}
        {convertToPercentage(maxWeight.value)}%
      </p>
      <div className="row">
        <div className="col-md-6">
          <div
            className="chart-container"
            style={{
              width: "100%",
              height: "400px",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Doughnut data={pieData} options={pieOptions} />
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="chart-container"
            style={{
              width: "100%",
              height: "400px",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Bar ref={barChartRef} data={barData} options={barOptions} />
          </div>
        </div>
      </div>
      <div className="mt-4" style={{ textAlign: "left" }}>
        {Object.keys(data[0]).map(
          (key, index) =>
            key !== "Rating of Company" &&
            key !== "Average Rating of Industry" && (
              <p key={index} style={{ fontSize: "1.1rem" }}>
                <strong>{weightNames[key] || key}:</strong> The company's value
                is &nbsp;
                <span
                  style={{
                    color: getTextColor(
                      parseFloat(data[0][key]),
                      parseFloat(data[1][key])
                    ),
                  }}
                >
                  {convertToPercentage(data[0][key])}%
                </span>
                <img
                  src={getComparisonImage(
                    parseFloat(data[0][key]),
                    parseFloat(data[1][key])
                  )}
                  alt="comparison"
                  style={{ marginLeft: "5px", width: "16px", height: "16px" }}
                />
                , compared to the industry average of &nbsp;
                {convertToPercentage(data[1][key])}% . {descriptions[index]}
              </p>
            )
        )}
        <p style={{ fontSize: "1.1rem" }}>
          <strong>Average Rating of Industry:</strong> The industry average
          rating is {data[1]["Average Rating of Industry"]}.
        </p>
      </div>
    </div>
  );
};

export default RatingReport;
