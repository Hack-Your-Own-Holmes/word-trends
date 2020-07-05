const { removeExtraScripts } = require('./helper/fileSystem');
const handleURLs = require('./helper/handleURLs');
const addScriptsToDir = require('./helper/addScriptsToDir');
const api = require('../helper/api');
const isValidGenre = require('../helper/isValidGenre');
const handleError = require('../helper/handleError');
let results = Array()
const getScriptsByGenre = async options => {
	const genres = [
		'Action',
		'Adventure',
		'Animation',
		'Comedy',
		'Crime',
		'Drama',
		'Family',
		'Fantasy',
		'Film-Noir',
		'Horror',
		'Musical',
		'Mystery',
		'Romance',
		'Sci-Fi',
		'Short',
		'Thriller',
		'War',
		'Western',
	];
	for (let genre of genres) {
		try {
			const url = `http://www.imsdb.com/feeds/genre.php?genre=${genre}`;
			const rawURLs = await api(url);
			const urls = handleURLs(rawURLs);
			const filePaths = await addScriptsToDir(urls, options);
			const prunedFilePaths = await removeExtraScripts(
				filePaths,
				options.total
			);
			results.concat(prunedFilePaths);
		} catch (err) {
			return handleError(err);
		}
	}
	return results
};

module.exports = getScriptsByGenre;
