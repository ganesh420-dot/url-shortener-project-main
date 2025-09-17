import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(BarElement, Tooltip, CategoryScale, LinearScale, Legend, Filler);

const Graph = ({ graphData }) => {
  // Aggregate clicks by date
  const aggregated = graphData?.reduce((acc, item) => {
    // Only keep date part, ignore time
    const date = item.clickDate.split("T")[0];
    const count = item.count || 1; // fallback to 1 if count not provided
    acc[date] = (acc[date] || 0) + count;
    return acc;
  }, {});

  const labels = Object.keys(aggregated || {});
  const userPerDaya = Object.values(aggregated || {});

  const data = {
    labels: labels.length > 0 ? labels : ["No Data"],
    datasets: [
      {
        label: "Total Clicks",
        data: userPerDaya.length > 0 ? userPerDaya : [0],
        backgroundColor: "#3b82f6",
        borderColor: "#1D2327",
        fill: true,
        barThickness: 20,
        categoryPercentage: 1.5,
        barPercentage: 1.5,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            if (Number.isInteger(value)) return value.toString();
            return "";
          },
        },
        title: {
          display: true,
          text: "Number Of Clicks",
          font: { family: "Arial", size: 16, weight: "bold", color: "#FF0000" },
        },
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Date",
          font: { family: "Arial", size: 16, weight: "bold", color: "#FF0000" },
        },
      },
    },
  };

  return <Bar className="w-full" data={data} options={options} />;
};

export default Graph;
