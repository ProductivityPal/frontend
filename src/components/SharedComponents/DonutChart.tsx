import React from "react";
import { Chart } from "react-google-charts";

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
    background: "red",
  };

  export function DonutChart() {
    return (
        <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
        style={{ backgroundColor: "red" }}
      />
    );
  }