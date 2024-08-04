import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ data }) => {
  const radarData = {
    labels: ["E_R", "E_O", "S_R", "S_O", "G_R", "G_O"],
    datasets: [
      {
        label: "Metrics Weight",
        data: [
          data.environmental_risk_metrics,
          data.environmental_opportunity_metrics,
          data.social_risk_metrics,
          data.social_opportunity_metrics,
          data.governance_risk_metrics,
          data.governance_opportunity_metrics,
        ],
        backgroundColor: "rgba(34, 202, 236, 0.2)",
        borderColor: "rgba(34, 202, 236, 1)",
        borderWidth: 1,
      },
    ],
  };

  const radarOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: () => "",
          title: (tooltipItem) => {
            const fullLabels = [
              "Environmental Risk",
              "Environmental Opportunity",
              "Social Risk",
              "Social Opportunity",
              "Governance Risk",
              "Governance Opportunity",
            ];
            return fullLabels[tooltipItem[0].dataIndex];
          },
        },
      },
    },
    scales: {
      r: {
        pointLabels: {
          font: {
            size: 10,
          },
        },
        ticks: {
          display: false,
          backdropColor: "transparent",
          color: "#666",
          z: 1,
          min: 0,
          max: 1,
          stepSize: 0.1,
        },
      },
    },
  };

  const plugins = [
    {
      id: "customDataLabels",
      beforeRender: (chart) => {
        chart.config.data.datasets.forEach((dataset) => {
          dataset.pointLabels = dataset.data.map(() => "");
        });
      },
    },
  ];

  return <Radar data={radarData} options={radarOptions} plugins={plugins} />;
};

export default RadarChart;
