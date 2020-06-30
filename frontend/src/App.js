import React, { useState, useEffect } from "react";
import LineChart from "./components/LineChart";
import SearchBar from "./components/SearchBar";
<<<<<<< HEAD
import "./App.css";

function App() {
  return (
    <div className="App">
      <SearchBar />
      <LineChart />
    </div>
  );
=======
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
>>>>>>> 81ae67a25950929836c0d34ebb2a7f0f3d52b477
}

export default App;
