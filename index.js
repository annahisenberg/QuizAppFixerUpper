//Click on start button to generate quiz questions


//initiate quiz

jQuery(function ($) {
  //declaring variables
  let displayAnswers = [];
  let score = 0;
  let scoreDisplay = $('.score');
  let currentQuestion = 0;
  let questionDisplay = $('.questionNumber');
  let answers;

  //Hiding the popup container and the question and score keeper
  $('.col-6').hide();
  $('.popup').hide();


  //Starting function startQuiz
  function startQuiz() {
    questionDisplay.text(1);
    //Clicking on the start button does this
    $('.btn-start').on('click', function () {
      currentQuestion = 0;

      //Calls this function to display the questions and answers
      displayQuestionsAndAnswers();

      //Appending the answer array in the empty "ul" under the question
      $('.answerList').append(displayAnswers);

      //Looping through the answers which we declared in the "displayQuestionsAndAnswers" function
      for (let i = 0; i < answers.length; i++) {

        // Adds click listener to the "answerList" ul after loading li's
        $('.answerList').on('click', ` #${i}`, function (event) {

          //if the clicked answer's text = the current question's correct answer,
          if ($(event.target).text() === STORE[currentQuestion].correctAnswer) {
            //increment the score
            score++;
            //Display the score
            scoreDisplay.text(score);
            //Hide the .questionAnswerForm
            $('.questionAnswerForm').hide(); // style="display: none"
            //Show the popup with the picture
            $('.popup').show();
            $('.fixerPhoto').attr('src', STORE[currentQuestion].icon);

            //When clicking on the popup's "next" button,
            $('.popup button').on('click', function () {
              //Hide the popup
              $('.popup').hide();
              //Call the displayQuestionsAndAnswers function again
              displayQuestionsAndAnswers();
              //Show the .questionAnswerForm
              $('.questionAnswerForm').show();
              //Display the new answers on the .answerList ul
              $('.answerList').html(displayAnswers);
            });

            //Increment the question
            currentQuestion += 1;
            questionDisplay.text(currentQuestion);
            return
          }

          //If the answer clicked is the wrong answer, increment the current question
          currentQuestion += 1;
          questionDisplay.text(currentQuestion);
          //Empty the answerList ul
          $('.answerList').empty();
          //Call the displayQuestionsAndAnswers function
          displayQuestionsAndAnswers();
          //Append the new answers display to the answerList ul
          $('.answerList').append(displayAnswers);
        });
      }
    });
  }


  function displayQuestionsAndAnswers() {
    //storing the answers in the answers variable
    answers = STORE[currentQuestion].answers;

    // Removing the start page
    $('.quizStart').remove();

    //Showing the questions and answer keeper
    $('.col-6').show();

    //Setting questionAnswerForm display to active so that we can see it (because before it was set to display: none)
    $('.questionAnswerForm').addClass('active');

    // Replacing the old question with the new question
    $('.questionAnswerForm h2').replaceWith(`<h2>${STORE[currentQuestion].question}</h2>`);

    // Creating an empty array and iterating through the answers. We are putting each answer into an 'li' and then pushing them into the displayAnswers array.
    displayAnswers = [];
    for (let i = 0; i < answers.length; i++) {
      displayAnswers.push(`<li id=${i}><a>${answers[i]}</a></li>`);
    }

  }



  startQuiz();


});