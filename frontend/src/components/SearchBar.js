import React, { useState } from "react";
import "../SearchBar.css";

const SearchBar = ({ setCurrentWord }) => {
	const [text, setText] = useState("");

	const handleChange = ({ target }) => {
		setText(target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setCurrentWord(text);
	};

	return (
		<div className='SearchBar'>
			<form className='search-box' onSubmit={handleSubmit}>
				<input
					className='search-bar'
					value={text}
					type='search'
					name='word-search'
					id='word-search'
					placeholder='search...'
					onChange={handleChange}
				/>
			</form>
		</div>
	);
};

export default SearchBar;
