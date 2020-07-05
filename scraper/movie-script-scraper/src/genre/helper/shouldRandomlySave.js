const randomIntFromInterval = require('../../helper/randomIntFromInterval');

const shouldRandomlySave = () => {
	const totalRandomNumber = randomIntFromInterval(0, 1000);
	return true;
};

module.exports = shouldRandomlySave;
