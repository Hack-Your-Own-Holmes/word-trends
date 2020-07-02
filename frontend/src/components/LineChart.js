import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ word, currentWord }) => {
	const years = Object.keys(word);

	const genres = word[years[0]]
		? Object.keys(word[years[0]].movies)
		: ["Action"];

	const datasets = genres.reduce((accumulator, currentGenre) => {
		const genreData = {
			label: currentWord,
			data: years.map((year) => {
				return Object.values(word[year].movies[currentGenre]).reduce(
					(acc, curr) => acc + curr,
					0
				);
			}),
			borderColor: "rgb(35, 64, 153)",
			backgroundColor: "rgba(35, 64, 153,0.3)",
			borderWidth: 1,
		};
		accumulator.push(genreData);
		return accumulator;
	}, []);

	const data = {
		labels: years,
		datasets,
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
		responsive: true,
	};

	return <Line data={data} options={options}></Line>;
};

export default LineChart;
