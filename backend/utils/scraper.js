const fs = require("fs");
const puppeteer = require("puppeteer");

const scrape = async (word) => {
	const browser = await puppeteer.launch();
	const URL = `http://www.quodb.com/search/${word}?p=1&titles_per_page=100&phrases_per_title=1`;

	/* GET MOVIES BY PAGE FUNCTION DECLARATION START */

	const moviesSinglePage = async (url) => {
		try {
			const page = await browser.newPage();
			await page.goto(url, { timeout: 0 });

			const moviesForWord = await page.evaluate(() => {
				return Array.from(
					document.querySelectorAll("#results_table tr[data-imdb]")
				).map((quote) => {
					const str = quote.querySelector("small").textContent;
					const [title, year] = str.split("(");
					return {
						title,
						year: parseInt(year),
					};
				});
			});
			await page.close();

			// recursively scrape next pages
			if (moviesForWord.length === 0) {
				return moviesForWord;
			} else {
				const nextPageNumber = parseInt(url.match(/p=(\d+)/)[1]) + 1;
				const nextUrl = `http://www.quodb.com/search/${word}?p=${nextPageNumber}&titles_per_page=100&phrases_per_title=1`;

				return moviesForWord.concat(await moviesSinglePage(nextUrl));
			}
		} catch (error) {
			console.log("something went wrong");
			console.log(error.message);
		}
	};
	/* GET MOVIES BY PAGE FUNCTION DECLARATION END */

	/* GET GENRES FUNCTION DECLARATION START */

	const getGenres = async (url) => {
		const page = await browser.newPage();
		await page.goto(url, { timeout: 0 });

		const genres = await page.evaluate(() => {
			return Array.from(document.querySelectorAll("#facets_list li"))
				.filter((li) => li.querySelector("small"))
				.map((li) => {
					const genreName = li.querySelector("a").textContent;
					const genreNumber = li.querySelector("small").textContent;

					return {
						genreName,
						count: parseInt(genreNumber.substring(1, genreNumber.length - 1)),
					};
				});
		});
		return genres;
	};
	/* GET GENRES FUNCTION DECLARATION END */

	const movies = await moviesSinglePage(URL);
	const genres = await getGenres(URL);

	fs.writeFile("demo.json", JSON.stringify({ movies, genres }), (err) => {
		if (err) throw err;
		console.log("The file has been saved!");
	});

	await browser.close();
	// return {word,movies,genres:getGenres(URL)}
};

module.exports = scrape;
