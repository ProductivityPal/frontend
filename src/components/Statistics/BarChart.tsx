import React, { useEffect } from "react";
import { Chart } from "react-google-charts";

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
            data={[["Category", "Done Tasks", "Not done tasks"], ...props.data]}
            options={options}
        />
    );
}