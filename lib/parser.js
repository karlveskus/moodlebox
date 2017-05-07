const cheerio = require('cheerio');

function parseHtml(html) {
    $ = cheerio.load(html);
    let questions = [];

    $('.que').each((index, queBody) => {
        try {
            let question = {
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
            let qtext = getQText(questionBody);
            let ablock = getABlock(questionBody);

            switch(question.info.type) {
                case "multianswer":
                    question.multianswer = parseMultianswer(questionBody);
                    question.feedback = parseFeedback(feedback);
                    break;
                case "multichoice":
                    question.questionHtml = parseQText(qtext);
                    question.answer = parseMultichoiceABlock(ablock);
                    question.feedback = parseFeedback(feedback);
                    break;
                case "shortanswer":
                    question.questionHtml = parseQText(qtext);
                    question.answer = parseShortanswerABlock(ablock);
                    question.feedback = parseFeedback(feedback);
                    break;
                case "match":
                    question.questionHtml = parseQText(qtext);
                    break;
                case "calculated":
                    question.questionHtml = parseQText(qtext);
                    break;
                case "calculatedmulti":
                    question.questionHtml = parseQText(qtext);
                    break;
                default:
                    console.log("Sellist tüüpi test ei ole veel toetatud");
            }

            questions.push(question);

        } catch(err) {
            console.log("Something went wrong. ERROR: " + err)
        }
            
    });

    return questions;
  
}

function getABlock(questionBody) {
    return questionBody.find(".ablock");
}

function getQText(questionBody) {
    return questionBody.find(".qtext");
}

function parseQText(qtext) {
    let normalizedHtml = normalizeHtml(qtext.html());
    return normalizedHtml;
}

function parseShortanswerABlock(ablock) {
    let answer = {};
    let answerInputBox = ablock.find("input");

    answer.text = answerInputBox.attr("value");
    answer.correct = answerInputBox.hasClass("correct");

    return answer;
}

function parseMultianswer(questionBody) {
    let multianswer = [];
    return normalizeHtml(questionBody.html());
} 

function parseMultichoiceABlock(ablock) {
    let answer = {
        prompt: null,
        type: null,
        choices: []
    };
    answer.prompt = ablock.find(".prompt").text();
    

    ablock.find("div").filter((i, el) => {
        return $(el).hasClass("r0") || $(el).hasClass("r1");
    }).each((i, el)=>{
        el = $(el);
        let checkbox = el.find("input");
        let value = el.find("label");

        choice = {};
        answer.type = checkbox.attr("type");

        choice.checked = checkbox.attr("checked") != undefined;
        choice.correctnessType = el.hasClass("correct") ? "correct" : (el.hasClass("incorrect") ? "incorrect" : (answer.type == "radio" ? "correct" : "unknown"));
        choice.text = value.text();
        
        answer.choices.push(choice);
    });
    
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