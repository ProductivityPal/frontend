import React from "react";
import { useState } from "react";
import { Chart } from "react-google-charts";
import './DonutChart.css';
  
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

  type DonutChartProps = {
    doneTasks: number,
    notDoneTasks: number,
  }

  export function DonutChart() {
    const [doneTasks, setDoneTasks] = useState(12)
    const [notDoneTasks, setNotDoneTasks] = useState(20)

    const data = [
    ["Task", "Hours per Day"],
    ["Done", doneTasks],
    ["Not Done", 20],
    ];

    return (
      <div className="donut-chart-container">
        <Chart
        chartType="PieChart"
        width="100%"
        height="280px"
        data={data}
        options={options}
      />
      <div className="centered-text">
        <h1>{doneTasks / (doneTasks+notDoneTasks)*100}%</h1>
        <p>Tasks Done</p>
        </div>

      </div>
        
    );
  }