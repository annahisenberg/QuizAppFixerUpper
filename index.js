//Click on start button to generate quiz questions


//initiate quiz

jQuery(function ($) {

  let displayAnswers = [];
  let score = 0;
  let currentQuestion = 0;
  let answers;

  // It's only selecting the score tag 
  let scoreDisplay = $('.score');

  $('.col-6').hide();
  $('.popup').hide();

  function startQuiz() {

    $('.btn-start').on('click', function () {
      currentQuestion = 0;
      displayQuestionsAndAnswers();
      $('.answerList').append(displayAnswers);

      //Searching for correct answer
      for (let i = 0; i < answers.length; i++) {
        // Adds event listener after loading li's
        $('.answerList').on('click', ` #${i}`, function (event) {


          if ($(event.target).text() === STORE[currentQuestion].correctAnswer) {

            score++;
            scoreDisplay.text(score);
            $('.questionAnswerForm').hide(); // style="display: none"
            $('.popup').show();
            $('.fixerPhoto').attr('src', STORE[currentQuestion].icon);

            $('.popup button').on('click', function () {
              $('.popup').hide();
              displayQuestionsAndAnswers();
              $('.questionAnswerForm').show();
              $('.answerList').html(displayAnswers);
            });
            // WORK AFTER HERE
            currentQuestion += 1;
            return
          }

          currentQuestion += 1;
          $('.answerList').empty();
          displayQuestionsAndAnswers();
          $('.answerList').append(displayAnswers);

        });
      }
    });
  }

  function displayQuestionsAndAnswers() {

    answers = STORE[currentQuestion].answers;

    $('.quizStart').remove();
    $('.col-6').show();

    //Setting questionAnswerForm display to active so that we can see it (because before it was set to display: none)
    $('.questionAnswerForm').addClass('active');

    // Question
    $('.questionAnswerForm h2').replaceWith(`<h2>${STORE[currentQuestion].question}</h2>`);
    // Answers
    displayAnswers = [];
    for (let i = 0; i < answers.length; i++) {
      displayAnswers.push(`<li id=${i}><a>${answers[i]}</a></li>`);
    }

  }



  startQuiz();


  //When clicking on wrong answer, show another box with a picture and say "Wrong!"


});