import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import React from "react";
import { Pie } from "react-chartjs-2";

const labels = ["Pending", "Accepted", "Rejected"];

const data = {
  labels,
  datasets: [
    {
      label: "Number of articles",
      data: [20, 30, 19],
      backgroundColor: ["#FF0000", "#00FF00", "#0000FF"],
    },
  ],
};

const options = {
  title: {
    display: true,
    text: "Number of articles by status",
  },
  legend: {
    display: true,
    position: "bottom",
  },
  maintainAspectRatio: false,
};

Chart.register(CategoryScale);

export default function PieChart(props) {
  return <Pie data={data} options={options} />;
}
