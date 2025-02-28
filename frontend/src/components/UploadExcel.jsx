import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "../styles/UploadExcel.css";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UploadExcel = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setData(parsedData);
      generateChartData(parsedData);
    };
    reader.readAsBinaryString(file);
  };

  const generateChartData = (parsedData) => {
    if (parsedData.length < 2) return;
    
    const labels = parsedData.slice(1).map((row) => row[0]); // First column as labels
    const datasets = parsedData[0].slice(1).map((colName, colIndex) => ({
      label: colName,
      data: parsedData.slice(1).map((row) => Number(row[colIndex + 1]) || 0),
      borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
      borderWidth: 2,
      fill: false,
    }));

    setChartData({ labels, datasets });
  };

  return (
    <div className="container">
      <h2 className="title">Upload Excel File</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="file-input" />

      {data.length > 0 && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                {data[0].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {chartData && (
        <div className="chart-container">
          <h3 className="chart-title">2D Graph Visualization</h3>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default UploadExcel;
