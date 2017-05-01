const fs = require('fs-promise');

function parseHtml() {
    return fs.readFile('./lib/testHtmlFile.html');
}

module.exports.parseHtml = parseHtml;