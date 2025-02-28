import React from "react";
import { Line } from "react-chartjs-2";
import "../styles/Chart2D.css";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart2D = ({ data }) => {
  if (data.length < 2) return <p>Enter data to generate the graph</p>;

  const labels = data.map((_, i) => `Row ${i + 1}`);
  const datasetValues = data[0].map((_, colIndex) => ({
    label: `Column ${colIndex + 1}`,
    data: data.map(row => Number(row[colIndex]) || 0),
    borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
    borderWidth: 2,
    fill: false,
  }));

  return (
    <div className="chart-container">
      <h3 className="chart-title"> 2D Graph Generated </h3>
      <Line data={{ labels, datasets: datasetValues }} />
    </div>
  );
};

export default Chart2D;
