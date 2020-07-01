import React, { useState, useEffect } from "react";
import LineChart from "./components/LineChart";
import SearchBar from "./components/SearchBar";
import fetchWord from "./helpers/fetchWord";

function App() {
	const [currentWord, setCurrentWord] = useState("");
	const [word, setWord] = useState("");

	useEffect(() => {
		if (currentWord !== "") {
			fetchWord(currentWord).then((data) => {
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
