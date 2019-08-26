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
            question: 'What color is grass, typically?',
            answer: 'green',
            wrongAnswer1: 'red',
            wrongAnswer2: 'yes',
            wrongAnswer3: 'what the hell',
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

        $('#show-number').text(`Time remaining: 20`)
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
        $("#show-number").html(`Time remaining: ${game.number}`);

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
    },

    reloadDecrement: function () {
        game.reloadNumber--;
        if (game.questions.length > 0) {
            if (game.reloadNumber === 0) {
                game.setScreen();
                game.start();
            };
        } else {
            if (game.reloadNumber === 0) {
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
                    $('#show-number').html(`gif`);
                    game.reloadNumber = 4;
                    game.stop();
                    game.startTimer();
                } else {
                    $('.answerButton').addClass('hidden');
                    $('#show-number').html(`gif`);
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
                    $('#show-number').html(`gif`);
                    game.reloadNumber = 3;
                    game.stop();
                    game.startTimer();
                } else {
                    $('#question').append(`<br>The Correct Answer was ${game.correctAnswer}`);
                    $('.answerButton').addClass('hidden');
                    $('#show-number').html(`gif`);
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
    game.setScreen();
    game.start();
});

$(".answerButton").on("click", function (e) {
    game.checkAnswer(this);
})

$("#again").on("click", function () {
    $('#again').addClass('hidden');
    $('#show-number').removeClass('hidden');
    game.reset();
})