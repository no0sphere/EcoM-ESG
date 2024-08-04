import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ComparisonModeData from "./ComparisonModeData";

const ComparisonMode = () => {
  const styleComparisonMode = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "10px",
    margin: "5px",
    height: "80vh",
  };

  return (
    <div>
      <div style={styleComparisonMode}>
        <ComparisonModeData />
      </div>
    </div>
  );
};

export default ComparisonMode;
