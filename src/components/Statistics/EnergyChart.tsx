import React from "react";
import { Chart } from "react-google-charts";

// export const data = [
//     [
//       "Day",
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//     ],
//     [1, 0, 0, 0],
//     [6, 50, 100, 100],
//     [7, 100, 100, 100],
//     [8, 100, 50, 100],
//     [9, 50, 0, 50],
//     [10, 50, , 50],
//     [11, 0, , 50],
//     [12, 0, 50,0],
//     [13, 50, 100, 0],
//     [14, 50, 100, 0],
//     [15,0,100,50],
//     [16,0,0,0],
//     [17,0,0,0],
//     [18,100,100,50],
//   ];
  
// export const options = {
//   chart: {
//     title: "Energy Levels",
//   },
//   backgroundColor: "transparent",
// };

// export function LineChart() {
//   return (
//     <Chart
//       chartType="Line"
//       width="100%"
//       height="358px"
//       data={data}
//       options={options}
//     />
//   );
// }


export const data = [
  [
    { type: "string", id: "Position" },
    { type: "string", id: "Name" },
    { type: "date", id: "Start" },
    { type: "date", id: "End" },
  ],
  [
    "Monday",
    "High",
    new Date(0, 0, 0, 12, 0, 0),
    new Date(0, 0, 0, 13, 0, 0),
  ],
  ["Monday", "Low", new Date(0, 0, 0, 16, 0, 0),new Date(0, 0, 0, 17, 30, 0),],
  ["Monday", "Medium", new Date(0, 0, 0, 14, 0, 0),new Date(0, 0, 0, 15, 30, 0),],
  ["Tuesday", "High", new Date(0, 0, 0, 12, 30, 0),new Date(0, 0, 0, 14, 0, 0),],
  ["Tuesday", "Low", new Date(0, 0, 0, 16, 30, 0),new Date(0, 0, 0, 18, 0, 0),],
  [
    "Tuesday",
    "Medium",
    new Date(0, 0, 0, 14, 30, 0),
    new Date(0, 0, 0, 16, 0, 0),
  ],
  
  [
    "Wednesday",
    "High",
    new Date(0, 0, 0, 12, 0, 0),new Date(0, 0, 0, 14, 0, 0),
  ],
  [
    "Wednesday",
    "Low",
    new Date(0, 0, 0, 6, 0, 0),new Date(0, 0, 0, 7, 0, 0),
  ],
  [
    "Wednesday",
    "Medium",
    new Date(0, 0, 0, 8, 0, 0),new Date(0, 0, 0, 10, 0, 0),
  ],
  
];

export function EnergyChart() {
  return <Chart chartType="Timeline" data={data} width="95%" height="100%" options={{
    title: "Energy Levels",
    timeline: { colorByRowLabel: false },
    backgroundColor: "transparent",
    margin: "50px" 
  }}/>;
}

