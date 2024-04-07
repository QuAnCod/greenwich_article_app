import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import React from "react";
import { alignPropType } from "react-bootstrap/esm/types";
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

ChartJS.register(ArcElement, Tooltip, Legend, Title);

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
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 20,
        },
      },
      legend: {
        display: true,
        position: "right",
      },
      alignPropType: "left",
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return <Pie width={600} height={600} data={chartData} options={options} />;
}
