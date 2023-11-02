import React from "react";
import { Chart } from "react-google-charts";

// export const data = [
//     ["Category", "Done Tasks", "Not done tasks"],
//     ["Category 1", 100, 80],
//     ["Category 2", 50, 60],
//     ["Category 3", 70, 10],
//     ["Category 4", 10, 90],
// ];

type BarChartProps = {
    title: string,
    data: any[][]
}

export function BarChart(props: BarChartProps) {
    const options = {
        title: props.title,
        chartArea: { width: "50%" },
        isStacked: true,
        legend: "bottom",
        colors: ["#EE7F3B", "#E5E5E5"],
        backgroundColor: "transparent",
    };
    return (
        <Chart
            chartType="BarChart"
            width="100%"
            height="400px"
            data={props.data}
            options={options}
        />
    );
}