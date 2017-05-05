const fs = require('fs-promise');
const cheerio = require('cheerio');

function parseHtml() {
    return fs.readFile('./lib/testHtml.html').then(function(sisu){
        $ = cheerio.load(sisu);

        let questions = [];

        $('.que').each(function(index, queBody) {
            try {
                question = {
                    id: null,
                    info: {}
                };

                // // INFO FROM QUESTION CLASS
                // // =======================================
                let classes = $(queBody).attr("class").split(" ");
                question.info.type = classes[1];
                question.info.feedbackType = classes[2];
                question.info.correctnessType = classes[3];


                // // INFO FROM INFO BLOCK
                // // ======================================= 
                question.id = getQuestionId(queBody);
                question.info.grade = question.info.correctnessType != "notanswered" 
                                                                    ? $(queBody).find(".grade").text().split(" ")[1] 
                                                                    : null;

                let questionBody = $(queBody).find(".formulation");
                let feedback = $(queBody).find(".outcome");

                switch(question.info.type) {
                    case "multianswer":
                        question.multianswer = parseMultianswer(questionBody);
                        question.feedback = parseFeedback(feedback);
                        break;
                    case "multichoice":
                        question.questionHtml = parseQText(questionBody);
                        question.answer = parseMultichoiceABlock(questionBody);
                        break;
                    case "shortanswer":
                        question.questionHtml = parseQText(questionBody);
                        question.answer = parseShortanswerABlock(questionBody);
                        question.feedback = parseFeedback(feedback);
                        break;
                    case "match":
                        question.questionHtml = parseQText(questionBody);
                        break;
                    case "calculated":
                        question.questionHtml = parseQText(questionBody);
                        break;
                    case "calculatedmulti":
                        question.questionHtml = parseQText(questionBody);
                        break;
                    default:
                        console.log("Sellist tüüpi test ei ole veel toetatud");
                }
                
                if (question.info.type == 'multichoice') {
                    questions.push(question);        
                }

            } catch(err) {
                console.log("Something went wrong. ERROR: " + err)
            }
                
        });

        return questions;
    });
}

function parseQText(questionBody) {
    let qtext = questionBody.find(".qtext");
    let normalizedHtml = normalizeHtml(qtext.html());
    return normalizedHtml;
}

function parseShortanswerABlock(questionBody) {
    let ablock = questionBody.find(".ablock");
    let answer = {};
    let answerInputBox = ablock.find("input");

    answer.text = answerInputBox.attr("value");
    answer.correct = answerInputBox.hasClass("correct");

    return answer;
}

function parseMultianswer(questionBody) {
    multianswer = [];
    return normalizeHtml(questionBody.html());
} 

function parseMultichoiceABlock(questionBody) {
    let answer = {};
    answer.prompt = questionBody.find(".prompt").text();
    answer.choices = {};

    

    // $(questionBody).find(".answer").find("div").each(function(i, el) {
    //     console.log(el);
    //     // let choice = {};
    //     // choice.correctnessType = el.hasClass(".correct") ? "correct" : (el.hasClass(".incorrect") ? "incorrect" : null)


    //     // choices.push(choice);
    // });
    
    return answer;
}

function parseFeedback(feedback) {
    if (feedback.length) {
        return normalizeHtml(feedback.html());
    } else {
        return {};
    }
}

function getQuestionId(queBody) {
    return $(queBody).find("input")
                     .filter(".questionflagpostdata")
                     .attr('value')
                     .split("&")
                     .filter(function(el){
                        return el.split("=")[0] == "qid";
                      })[0]
                     .split("=")[1];
}

function normalizeHtml(html) {
    return html.replace(/(\n|  )/gm,"");
}

module.exports.parseHtml = parseHtml;