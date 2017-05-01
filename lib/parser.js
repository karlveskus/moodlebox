const fs = require('fs-promise');
const cheerio = require('cheerio');

function parseHtml() {
    return fs.readFile('./lib/testHtml.html').then(function(sisu){
        $ = cheerio.load(sisu);
    });
}

module.exports.parseHtml = parseHtml;