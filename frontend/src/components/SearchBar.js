import React from "react";
import "../SearchBar.css";

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="search ..."
            />
          </div>
        </main>
      </div>
    );
  }
}
