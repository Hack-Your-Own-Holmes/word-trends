const writeToFile = require('./helper/writeToFile');
const isInvalidScript = require('./helper/isInvalidScript');
const extractPageContents = require('./helper/extractPageContents');
const api = require('../helper/api');
const handleError = require('../helper/handleError');
const string = require('string');
const cheerio = require('cheerio');

const getDate = async (url, options) => {
    options.dest = options.dest || 'scripts';
    const { dest, genre } = options;
    try {
        const html = await api(url);
        const $ = cheerio.load(html);
        let date = $("b:contains('Script Date')")
        if (!date.get(0)) {
            date = $("b:contains('Movie Release Date')")
            if (!date.get(0)) {
                return false
            }
        }
        let result = date.get(0).nextSibling.nodeValue

        result = Date.parse(result.substring(result.indexOf(":") + 1).trim())
        return result
    } catch (e) {
        return handleError(e);
    }
};

module.exports = getDate;
