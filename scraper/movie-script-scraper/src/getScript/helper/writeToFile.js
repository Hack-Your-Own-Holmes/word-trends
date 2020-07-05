const fs = require('fs');
const util = require('util');
const handleError = require('../../helper/handleError');

const writeFile = util.promisify(fs.writeFile);

const writeToFile = (path, script) => {
	console.log("writing to file", path)
	return writeFile(path, script)
		.then(() => {
			return path;
		})
		.catch(err => {
			return handleError(err);
		});
};

module.exports = writeToFile;
