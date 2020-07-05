const _ = require('lodash');
const string = require('string');
const shouldRandomlySave = require('./shouldRandomlySave');
const { checkDirectory } = require('../helper/fileSystem');
const getScript = require('../../getScript/getScript');
const cleanArr = require('../../helper/cleanArr');
const handleError = require('../../helper/handleError');
const getDate = require('../../getScript/getDate');

async function sleep(millis) {
	return new Promise(resolve => setTimeout(resolve, millis));
}

const removeInvalidURLs = urls => {
	return _.remove(urls, url => {
		return string(url).contains('.html');
	});
};

const addScriptsToDir = async (urls, options) => {
	// Loop through script URLs
	const promiseArr = Array()
	try {
		const { genre, dest } = options;
		const total = options.total * 3;
		let totalCounter = 0;

		const cleaned = removeInvalidURLs(urls);
		await checkDirectory(dest, genre);



		for (let i = 0; i < cleaned.length; i++) {
			url = cleaned[i]
			await sleep(50)

			++totalCounter;
			name = url.match("scripts\/.*\.html")[0].slice(8, -5).replace(/-/g, '%20');
			date_url = `https://www.imsdb.com/Movie%20Scripts/${name}%20Script.html`

			const date = await getDate(date_url, options);
			if (!date) {
				continue
			}

			const filePath = await getScript(url, options, date);

			promiseArr.push(filePath)
		}

		return Promise.all(promiseArr).then(data => {
			return cleanArr(data);
		});
	} catch (e) {
		console.log("error:", e)
		return Array()
	}
};

module.exports = addScriptsToDir;
