import React, { useState, useEffect } from "react";
import LineChart from "./components/LineChart";
import SearchBar from "./components/SearchBar";
import fetchWord from "./helpers/fetchWord";
import "./index.css";

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
    <div className="App">
      <a
        className="gitHub"
        href="https://github.com/Hack-Your-Own-Holmes/word-trends"
        target="_blank"
      >
        Link to Github
      </a>
      <header className="header">Movie Word Trends</header>

      <SearchBar setCurrentWord={setCurrentWord} />
      <div className="line-chart">
        {typeof word === "object" && <LineChart word={word} />}
      </div>
    </div>
  );
}

export default App;
