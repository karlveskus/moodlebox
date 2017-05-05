const fs = require('fs-promise');
const cheerio = require('cheerio');

function parseHtml() {
    return fs.readFile('./lib/testHtml.html').then(function(sisu){
        $ = cheerio.load(sisu);


        let questions = [];

        $('.que').each(function(index, queBody) {
            question = {
                id: null,
                info: {}
            };

            // INFO FROM QUESTION CLASS
            // =======================================
            let classes = $(queBody).attr("class").split(" ");
            question.info.type = classes[1];
            question.info.feedbackType = classes[2];
            question.info.correctnessType = classes[3];


            // INFO FROM INFO BLOCK
            // ======================================= 
            question.id = $(queBody).find("input").get(1).attribs.value.split("&")[2].split("=")[1];
            question.info.grade = $(queBody).find(".grade").text().split(" ")[1];

        
            let questionBody = $(queBody).find(".formulation");

            switch(question.info.type) {
                case "multianswer":
                    console.log(question.info.type);
                    break;
                case "multichoice":
                    question.questionText = parseQText(questionBody);
                    break;
                case "shortanswer":
                    question.questionText = parseQText(questionBody);
                    break;
                case "match":
                    question.questionText = parseQText(questionBody);
                    break;
                case "calculated":
                    question.questionText = parseQText(questionBody);
                    break;
                case "calculatedmulti":
                    question.questionText = parseQText(questionBody);
                    break;
                default:
                    console.log("Sellist tüüpi test ei ole veel toetatud");
            }

            questions.push(question);            
        });

        return questions;
    });
}

function parseQText(questionBody) {
    let qtext = questionBody.find(".qtext");
    let normalizedHtml = qtext.html().replace(/(\n|  )/gm,"");
    return normalizedHtml;
}

module.exports.parseHtml = parseHtml;