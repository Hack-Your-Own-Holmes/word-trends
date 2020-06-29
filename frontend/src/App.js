import React, { useState, useEffect } from "react";
import LineChart from "./components/LineChart";
import SearchBar from "./components/SearchBar";
import fetchWord from "./helpers/fetchWord";
import "./App.css";

function App() {
	const [currentWord, setCurrentWord] = useState("");
	const [word, setWord] = useState("");

	useEffect(() => {
		// fetchWord(currentWord);
		if (currentWord !== "") {
			fetchWord().then((data) => {
				setWord(data);
			});
		}
	}, [currentWord]);

	return (
		<div className='App'>
			<SearchBar setCurrentWord={setCurrentWord} />

			{typeof word === "object" && <LineChart word={word} />}
		</div>
	);
}

export default App;
