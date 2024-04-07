import { Chart as ChartJS, ArcElement, PointElement, LineElement, Tooltip, Legend, CategoryScale, LinearScale, Title } from "chart.js";
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
  plugins: {
    title: {
      display: true,
      text: "Number of articles through years",
      font: {
        size: 20,
      }
    },
    legend: {
      display: true,
      position: "top",
    },
  },
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: "Year",
      },
    },
    y: {
      title: {
        display: true,
        text: "Number of articles",
      },
    },
  },
  elements: {
    point: {
      pointStyle: "circle",
    },
  }
};

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

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
