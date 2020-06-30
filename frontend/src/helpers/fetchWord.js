import axios from "axios";

const URL = `http://localhost:5000/api/word_trends`;

export default async () => {
	const response = await axios.get(URL);
	const { data } = await response;
	return Object.values(data)[1];
	// data = {_id:"objectId",[word]:{...years}}
};
