import React from "react";
import { Chart } from "react-google-charts";
import './DonutChart.css';

export const data = [
    ["Task", "Hours per Day"],
    ["Done", 12],
    ["Not Done", 20],
  ];
  
  export const options = {
    title: "Tasks Status",
    legend: "none",
    pieHole: 0.9,
    is3D: false,
    slices: {
        0: { color: "#EE7F3B" },
        1: { color: "#E5E5E5" },
    },
    pieStartAngle: 0,
    backgroundColor: "transparent",
  };


  export function DonutChart() {
    return (
      <div className="donut-chart-container">
        <Chart
        chartType="PieChart"
        width="100%"
        height="300px"
        data={data}
        options={options}
      />
      <div className="centered-text">
        <h1>37%</h1>
        <p>Tasks Done</p>
        </div>

      </div>
        
    );
  }