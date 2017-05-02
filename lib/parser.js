const fs = require('fs-promise');
const cheerio = require('cheerio');

function parseHtml() {
    return fs.readFile('./lib/testHtml.html').then(function(sisu){
        $ = cheerio.load(sisu);
        let questions = [];

        $('.que').each(function(index, queBody) {
            question = {};

            let classes = $(queBody).attr("class").split(" ");
            let grade = $(queBody).find(".grade").text();
            let questionHtml = $(queBody).find(".qtext").html().replace(/(\r\n|\n|\r|  )/gm,"");

            question.classes = classes;
            question.grade = grade;
            question.questionHtml = questionHtml;
            questions.push(question);
        });

        return questions;
    });
}

module.exports.parseHtml = parseHtml;