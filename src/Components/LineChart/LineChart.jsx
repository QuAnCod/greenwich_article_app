import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import React from "react";
import { Line } from "react-chartjs-2";

// const labels = ["2023", "2024", "2025"];

// const data = {
//   labels,
//   datasets: [
//     {
//       label: "Number of articles",
//       data: [20, 30, 19],
//       borderColor: "#3e95cd",
//       fill: false,
//     },
//   ],
// };

const options = {
  title: {
    display: true,
    text: "Number of students and articles through years",
  },
  legend: {
    display: true,
    position: "bottom",
  },
  maintainAspectRatio: false,
};

Chart.register(CategoryScale);

export default function LineChart(props) {
  const { labels, data } = props.dataForLineChart;

  const chartData = {
    labels,
    datasets: [
      {
        label: "Number of articles",
        data,
        borderColor: "#3e95cd",
        fill: false,
      },
    ],
  };

  return <Line width={800} height={350} data={chartData} options={options} />;
}
