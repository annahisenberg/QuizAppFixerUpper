//Click on start button to generate quiz questions


//initiate quiz

jQuery(function ($) {

  let displayAnswers = [];
  let score = 0;
  let randomQuestion;
  let answers;

  // It's only selecting the score tag 
  let scoreDisplay = $('.score');


  function startQuiz() {

    $('.btn-start').on('click', function () {

      displayQuestionsAndAnswers();
      $('.answerList').append(displayAnswers);

      //Searching for correct answer
      for (let i = 0; i < answers.length; i++) {
        // Adds event listener after loading li's
        $('.answerList').on('click', ` #${i}`, function (event) {

          if ($(event.target).text() === STORE[randomQuestion].correctAnswer) {
            score++;
            scoreDisplay.text(score);
            alert('You are correct!');
            $('.answerList').empty();
            displayQuestionsAndAnswers();
            $('.answerList').append(displayAnswers);
            // WORK AFTER HERE

          } else {
            // $('.questionAnswerForm').remove();
            $('.answerList').empty();
            displayQuestionsAndAnswers();
            $('.answerList').append(displayAnswers);
          }

        });

      }


    });
  }

  function displayQuestionsAndAnswers() {
    randomQuestion = Math.floor(Math.random() * Math.floor(STORE.length));
    answers = STORE[randomQuestion].answers;

    $('.quizStart').remove();

    //Setting questionAnswerForm display to active so that we can see it (because before it was set to display: none)
    $('.questionAnswerForm').addClass('active');

    // Question
    $('.questionAnswerForm h2').replaceWith(`<h2>${STORE[randomQuestion].question}</h2>`);
    // Answers
    displayAnswers = [];
    for (let i = 0; i < answers.length; i++) {
      displayAnswers.push(`<li id=${i}><a>${answers[i]}</a></li>`)
    }
    // console.log(displayAnswers);
    console.log(displayAnswers);

  }


  startQuiz();



});