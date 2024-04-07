import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import React from "react";
import { Pie } from "react-chartjs-2";

// const labels = ["Pending", "Accepted", "Rejected"];

// const data = {
//   labels,
//   datasets: [
//     {
//       label: "Number of articles",
//       data: [20, 30, 19],
//       backgroundColor: ["#FF0000", "#00FF00", "#0000FF"],
//     },
//   ],
// };

Chart.register(CategoryScale);

export default function PieChart(props) {
  const { labels, data } = props.dataForPieChart;
  const { title } = props;

  const chartData = {
    labels,
    datasets: [
      {
        label: "Number of articles",
        data,
        backgroundColor: ["#FF0000", "#00FF00", "#0000FF"],
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: title,
    },
    legend: {
      display: true,
      position: "bottom",
    },
    maintainAspectRatio: false,
  };

  return <Pie data={chartData} options={options} />;
}
