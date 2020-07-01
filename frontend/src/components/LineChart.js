import React from "react";
import { Line } from "react-chartjs-2";
import generateColor from "../helpers/generateColor";

const LineChart = ({ word }) => {
  const years = Object.keys(word);

  const genres = word[years[0]]
    ? Object.keys(word[years[0]].movies)
    : ["Action"];

  const datasets = genres.reduce((accumulator, currentGenre) => {
    const color = generateColor();
    const genreData = {
      label: "Frequency Throughout The Years",
      data: years.map((year) => {
        return Object.values(word[year].movies[currentGenre]).reduce(
          (acc, curr) => acc + curr,
          0
        );
      }),
      borderColor: color,
      backgroundColor: color,
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
