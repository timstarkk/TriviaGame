const game = {
    number: 20,
    reloadNumber: 4,
    intervalId: 0,
    reloadInterval: 0,
    chosen: "",
    question: "",
    correctAnswer: "",
    wrongOne: "",
    wrongTwo: "",
    wrongThree: "",
    correctAnswers: 0,
    wrongAnswers: 0,
    unanswered: 0,

    questions: [
        {
            name: "one",
            question: 'When was the first Apple computer released?',
            answer: '1976',
            wrongAnswer1: '1991',
            wrongAnswer2: '1973',
            wrongAnswer3: '1984',
        },
        {
            name: "two",
            question: 'In what year was the first Macintosh released?',
            answer: '1984',
            wrongAnswer1: '1995',
            wrongAnswer2: '2001',
            wrongAnswer3: '1976',
        },
        {
            name: "three",
            question: 'What is the Apple Inc. stock ticker?',
            answer: 'AAPL',
            wrongAnswer1: 'APLE',
            wrongAnswer2: 'APPL',
            wrongAnswer3: 'IMAC',
        },
        {
            name: "four",
            question: "What famous scientist was featured on Apple's first company logo?",
            answer: 'Isaac Newtown',
            wrongAnswer1: 'Albert Einstein',
            wrongAnswer2: 'Nikola Tesla',
            wrongAnswer3: 'Ben Franklin',
        },
        {
            name: "five",
            question: 'Apple originally had three founders, what was the name of the third founder?',
            answer: 'Ronald Wayne',
            wrongAnswer1: 'Bill Gates',
            wrongAnswer2: 'Jeff Bezos',
            wrongAnswer3: 'Douglas Engelbart',
        },
        {
            name: "six",
            question: 'How much did a share of Apple Inc. stock cost at IPO?',
            answer: '$22',
            wrongAnswer1: '$98',
            wrongAnswer2: '$6',
            wrongAnswer3: '$33',
        },
        {
            name: "seven",
            question: "What is the name of Apple's current CEO?",
            answer: 'Tim Cook',
            wrongAnswer1: 'Tim Stark',
            wrongAnswer2: 'Bill Gates',
            wrongAnswer3: 'Peter Thiel',
        },
        {
            name: "eight",
            question: 'What year was the Ipod released?',
            answer: '2001',
            wrongAnswer1: '1999',
            wrongAnswer2: '2003',
            wrongAnswer3: '1991',
        }
    ],

    shuffleArray: function (array) {
        let i = 0;
        let j = 0;
        let temp = null;
        for (i = array.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    },

    setScreen: function () {
        game.number = 20;
        game.question = game.questions[0]
        game.correctAnswer = game.question.answer;
        wrongOne = game.question.wrongAnswer1;
        wrongTwo = game.question.wrongAnswer2;
        wrongThree = game.question.wrongAnswer3;
        let questionOrder = ['one', 'two', 'three', 'four']

        $('#show-number').text(`Time remaining: 20s`)
        $(`#startCon`).addClass('hidden');
        $(`.show`).removeClass('hidden');
        $(`#question`).text(`${game.question.question}`);


        game.shuffleArray(questionOrder);
        console.log(questionOrder);

        $(`#${questionOrder[0]}`).text(`${wrongOne}`);
        $(`#${questionOrder[1]}`).text(`${game.correctAnswer}`);
        $(`#${questionOrder[2]}`).text(`${wrongTwo}`);
        $(`#${questionOrder[3]}`).text(`${wrongThree}`);
    },

    start: function () {
        game.intervalId = setInterval(game.decrement, 1000);
    },

    decrement: function () {
        game.number--;
        $("#show-number").html(`Time remaining: ${game.number}s`);

        if (game.number === 0) {
            $('#question').text('Out of Time!');
            game.unanswered++;
            game.questions.shift();
            if (game.questions.length > 0) {
                $('.answerButton').addClass('hidden');
                $('#question').addClass('hidden');
                game.reloadNumber = 4;
                game.stop();
                game.startTimer();
            } else {
                $('.answerButton').addClass('hidden');
                $('#question').addClass('hidden');
                game.reloadNumber = 4;
                game.stop();
                game.startTimer();
            }
        };
    },

    startTimer: function () {
        game.reloadInterval = setInterval(game.reloadDecrement, 1000);
        game.reloadNumber = 3;
    },

    reloadDecrement: function () {
        console.log(game.reloadNumber)
        game.reloadNumber--;
        if (game.questions.length > 0) {
            if (game.reloadNumber === 0) {
                game.stop();
                game.setScreen();
                game.start();
            };
        } else {
            if (game.reloadNumber === 0) {
                game.stop();
                game.finalScreen();
            };
        }

    },

    checkAnswer: function (answer) {
        let buttonId = answer.id

        if (game.questions.length > 0) {
            if ($(`#${buttonId}`).text() === game.correctAnswer) {
                $('#question').text('Correct!');
                game.correctAnswers++;
                game.questions.shift();
                if (game.questions.length > 0) {
                    $('.answerButton').addClass('hidden');
                    $('#show-number').html(`<img src="assets/images/winGif.gif" alt="Steve Jobs" class="gifSize">`);
                    game.reloadNumber = 4;
                    game.stop();
                    game.startTimer();
                } else {
                    $('.answerButton').addClass('hidden');
                    $('#show-number').html(`<img src="assets/images/winGif.gif" alt="Steve Jobs" class="gifSize">`);
                    game.reloadNumber = 4;
                    game.stop();
                    game.startTimer();
                };
            } else {
                $('#question').html('Wrong!');
                game.wrongAnswers++;
                game.questions.shift();
                if (game.questions.length > 0) {
                    $('.answerButton').addClass('hidden');
                    $('#question').append(`<br>The Correct Answer was ${game.correctAnswer}`);
                    $('#show-number').html(`<img src="assets/images/loseGif.gif" alt="Steve Jobs" class="gifSize">`);
                    game.reloadNumber = 3;
                    game.stop();
                    game.startTimer();
                } else {
                    $('#question').append(`<br>The Correct Answer was ${game.correctAnswer}`);
                    $('.answerButton').addClass('hidden');
                    $('#show-number').html(`<img src="assets/images/loseGif.gif" alt="Steve Jobs" class="gifSize">`);
                    game.reloadNumber = 3;
                    game.stop();
                    game.startTimer();
                };
            };
        }
    },

    finalScreen: function () {
        $('#startCon').text('GAME OVER');
        $('#question').html(`<h5>correct answers: ${game.correctAnswers}<br>
            incorrect answers: ${game.wrongAnswers}<br>unanswered questions: ${game.unanswered}</h5>`);
        $('#show-number').addClass('hidden');
        $('#again').removeClass('hidden');
        $('#again').addClass('moveUp');
        $('.answerButton').addClass('hidden');

    },

    stop: function () {
        clearInterval(game.intervalId);
        clearInterval(game.reloadInterval);
    },

    reset: function () {
        game.number = 20,
            game.reloadNumber = 0,
            game.intervalId = 0,
            game.reloadInterval = 0,
            game.chosen = "",
            game.question = "",
            game.correctAnswer = "",
            game.wrongOne = "",
            game.wrongTwo = "",
            game.wrongThree = "",
            game.correctAnswers = 0,
            game.wrongAnswers = 0,
            game.unanswered = 0,
            game.questions = [
                {
                    name: "one",
                    question: 'What color is the sky?',
                    answer: 'blue',
                    wrongAnswer1: 'green',
                    wrongAnswer2: 'taco',
                    wrongAnswer3: 'of course not',
                },
                {
                    name: "two",
                    question: 'What color is grass, typically?',
                    answer: 'green',
                    wrongAnswer1: 'red',
                    wrongAnswer2: 'yes',
                    wrongAnswer3: 'what the hell',
                }
            ],

            game.setScreen();
        game.start();
    },
}

$(document).ready(function () {
    game.shuffleArray(game.questions);
});

$("#stop").on("click", game.stop);

$("#start").on("click", function () {
    var audio = new Audio("assets/chime.mp3")
    audio.play();
    game.setScreen();
    game.start();
});

$(".answerButton").on("click", function (e) {
    game.checkAnswer(this);
})

$("#again").on("click", function () {
    $('#again').addClass('hidden');
    $('#show-number').removeClass('hidden');
    var audio = new Audio("assets/chime.mp3")
    audio.play();
    game.reset();
})