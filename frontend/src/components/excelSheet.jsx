import React, { useState, useEffect } from "react";
import Chart2D from "./Chart2D";
import axios from "axios";
import "../styles/ExcelSheet.css";

const ExcelSheet = () => {
  const [data, setData] = useState([["", "", ""]]);

  useEffect(() => {
    fetchData();
  }, []);

 
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/data");
      if (response.data.length > 0) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const handleChange = (rowIndex, colIndex, value) => {
    setData((prevData) =>
      prevData.map((row, rIdx) =>
        rIdx === rowIndex ? row.map((cell, cIdx) => (cIdx === colIndex ? value : cell)) : row
      )
    );
  };

  // Save data to the database
  const saveData = async () => {
    try {
      await axios.post("http://localhost:5000/save", { data });
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  
  const addRow = () => {
    setData([...data, Array(data[0].length).fill("")]);
  };

  const addColumn = () => {
    setData(data.map(row => [...row, ""]));
  };

  const removeRow = () => {
    if (data.length > 1) {
      setData(data.slice(0, -1));
    }
  };

  const removeColumn = () => {
    if (data[0].length > 1) {
      setData(data.map(row => row.slice(0, -1)));
    }
  };

  return (
    <div className="excel-container">
      <h2 className="title">Interactive Excel Data Representation</h2>

      <div className="table-wrapper">
        <table className="excel-table">
          <thead>
            <tr>
              <th>#</th>
              {data[0].map((_, colIndex) => (
                <th key={colIndex}>Column {colIndex + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="row-number">{rowIndex + 1}</td>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) =>
                        handleChange(rowIndex, colIndex, e.target.value)
                      }
                      placeholder={`R${rowIndex + 1}C${colIndex + 1}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="buttons">
        <button className="btn add-row" onClick={addRow}> Add Row</button>
        <button className="btn add-column" onClick={addColumn}>Add Column</button>
        <button className="btn remove-row" onClick={removeRow}> Remove Row</button>
        <button className="btn remove-column" onClick={removeColumn}>Remove Column</button>
        <button className="btn save" onClick={saveData}>Save Data</button>
      </div>

      <Chart2D data={data} />
    </div>
  );
};

export default ExcelSheet;
