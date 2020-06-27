import React from "react";
import { Line } from "react-chartjs-2";
import { randomNums } from "../helper";

const LineChart = () => {
	const data = {
		labels: [1996, 1997, 1997, 1998, 1999, 2000],
		datasets: [
			{
				label: "Action",
				data: randomNums(55, 155),
				borderWidth: 1,
				borderColor: "rgba(255,34,56)",
			},
			{
				label: "Drama",
				data: randomNums(55, 155),
				borderWidth: 1,
				borderColor: "rgba(25,214,56)",
			},
			{
				label: "Thriller",
				data: randomNums(55, 155),
				borderWidth: 1,
				borderColor: "rgba(25,14,216)",
			},
		],
	};
	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
	};
	return <Line data={data} options={options}></Line>;
};

export default LineChart;
