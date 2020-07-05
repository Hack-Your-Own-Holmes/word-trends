const mss = require('./movie-script-scraper/src/mss');

const options = {
    genre: 'Action',
    total: 200,
};

mss(options)
    .then(filePaths => {
        console.log(filePaths);
    })
    .catch(err => {
        console.error('There was a problem');
    });