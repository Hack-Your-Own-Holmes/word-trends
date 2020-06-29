import React, { useState } from "react";

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
		<div>
			<form onSubmit={handleSubmit}>
				<input
					value={text}
					type='search'
					name='word-search'
					id='word-search'
					onChange={handleChange}
				/>
				<button type='submit'>Search</button>
			</form>
		</div>
	);
};

export default SearchBar;
