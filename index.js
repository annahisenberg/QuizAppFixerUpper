jQuery(function ($) {

  //declaring global variables
  let displayAnswers = [];
  let score = 0;
  let scoreDisplay = $('.score');
  let currentQuestion = 0;
  let questionNumberDisplay = $('.questionNumber');
  let answers;



  //Hide the feedback container, the question and score keeper, and the end quiz container
  function hideSections() {
    $('.col-6').hide();
    $('.correct-feedback').hide();
    $('.wrong-feedback').hide();
    $('.end-quiz').hide();
  }

  //Start function startQuiz
  function startQuiz() {
    //Setting first question to 1
    questionNumberDisplay.text(1);
    //Clicking on the start button does this
    $('.btn-start').on('click', function () {
      currentQuestion = 0;
      // Remove the start page screen
      $('.quizStart').remove();
      //Showing the questions and answer keeper
      $('.col-6').show();
      //Calls these functions to get the questions (and display them) and answers (but not display them yet)
      displayQuestions();
      retrieveAndDisplayAnswers();
      //Appending the answer array to the empty "ul" under the question and displaying the answers
      //Call this function below to set click listeners on the answers
      answersClickListener();
    });
  }

  //Define the 'next' button click listener on the feedback screen here
  //Inside the function handle the last screen part
  //When clicking on the feedback's "next" button,
  function nextButtonClickListener() {
    $('.next-button').on('click', function () {
      //Hide the feedback box
      $('.correct-feedback').hide();
      $('.wrong-feedback').hide();


      if (currentQuestion >= STORE.length - 1) {
        if (score >= 3) {
          $('.final-score').text(`${score}/${STORE.length}`);
          $('.end-quiz').show();
        } else {
          $('.end-quiz').show();
          $('.end-quiz h2').text(`Aww, looks like you need to watch more Fixer Upper! Your score is ${score}/${STORE.length}`);
        }
      } else {
        currentQuestion += 1;
        questionNumberDisplay.text(currentQuestion + 1);
        //Call the displayQuestions and answers functions again
        displayQuestions();
        retrieveAndDisplayAnswers();
        //Show the .questionAnswerForm
        $('.questionAnswerForm').show();
      }
    });
  }

  function incrementAndShowScore() {
    //increment the score
    score++;
    //Display the score
    scoreDisplay.text(score);
  }

  function hideAnswersShowFeedback() {
    $('.answerList').empty();
    $('.questionAnswerForm').hide();
  }

  function answersClickListener() {
    for (let i = 0; i < answers.length; i++) {
      // Adds click listener to the "answerList" ul after loading li's
      $('.answerList').on('click', ` #${i}`, function (event) {
        //if the clicked answer's text = the current question's correct answer,
        if ($(event.target).text() === STORE[currentQuestion].correctAnswer) {
          incrementAndShowScore();
          hideAnswersShowFeedback();
          $('.correct-feedback').show();
          $('.fixerPhoto').attr('src', STORE[currentQuestion].icon);
        }
        if ($(event.target).text() !== STORE[currentQuestion].correctAnswer) {
          hideAnswersShowFeedback();
          $('.wrong-feedback').show();
          $('.fixerPhoto').attr('src', STORE[currentQuestion].icon);
        }
        // displayQuestions();
        // retrieveAndDisplayAnswers();
      });
    }
  }

  function displayQuestions() {
    //Setting questionAnswerForm display to active so that we can see it (because before it was set to display: none)
    $('.questionAnswerForm').addClass('active');
    // Replacing the old question with the new question
    $('.questionAnswerForm h2').replaceWith(`<h2>${STORE[currentQuestion].question}</h2>`);
  }


  function retrieveAndDisplayAnswers() {
    //assigning the answers to the answers variable
    answers = STORE[currentQuestion].answers;
    // Iterating through the answers. We are putting each answer into an 'li' and then pushing them into the displayAnswers array.
    displayAnswers = [];
    for (let i = 0; i < answers.length; i++) {
      displayAnswers.push(`<li id=${i}><a>${answers[i]}</a></li>`);
    }
    $('.answerList').append(displayAnswers);
    //Display the new answers on the .answerList ul
    $('.answerList').html(displayAnswers);
  }

  function startOver() {
    $('.end-quiz button').on('click', function () {
      location.reload();
    });
  }


  function init() {
    hideSections();
    nextButtonClickListener();
    startQuiz();
    startOver();
  }



  init();

});