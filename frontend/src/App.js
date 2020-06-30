import React from "react";
// import logo from "./logo.svg";
import LineChart from "./components/LineChart";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <SearchBar />
      <LineChart />
    </div>
  );
}

export default App;
