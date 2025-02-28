import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setData } from "../redux/slices/dataSlice";
import * as XLSX from "xlsx";

import "../styles/ManualDataEntry.css";


const ManualDataEntry = () => {
  const [tableData, setTableData] = useState([
    ["", ""], 
  ]);
  const dispatch = useDispatch();

  const handleAddRow = () => {
    setTableData([...tableData, Array(tableData[0].length).fill("")]);
  };

  const handleAddColumn = () => {
    setTableData(tableData.map((row) => [...row, ""]));
  };

  const handleChange = (rowIndex, colIndex, value) => {
    const updatedData = tableData.map((row, rIdx) =>
      rIdx === rowIndex ? row.map((cell, cIdx) => (cIdx === colIndex ? value : cell)) : row
    );
    setTableData(updatedData);
  };

  const handleSaveData = () => {
    dispatch(setData(tableData));
    alert("Data saved successfully!");
  };

  const exportToCSV = () => {
    const ws = XLSX.utils.aoa_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table_data.xlsx");
  };

  return (
    <div className="excel-container">
      <h2 className="title"> Excel_File For Data</h2>

      <div className="table-wrapper">
        <table className="excel-table">
          <thead>
            <tr>
              <th>#</th>
              {tableData[0].map((_, colIndex) => (
                <th key={colIndex}>Column {colIndex + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="row-number">{rowIndex + 1}</td>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                      style={{ width: "100%", minWidth: "80px" }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

   
      <div className="buttons">
        <button className="btn add-row" onClick={handleAddRow}>Add Row</button>
        <button className="btn add-column" onClick={handleAddColumn}>Add Column</button>
        <button className="btn save" onClick={handleSaveData}> Save Data</button>
        <button className="btn export" onClick={exportToCSV}> Export to Excel</button>
      </div>
    </div>
  );
};

export default ManualDataEntry;
