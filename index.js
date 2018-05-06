$(function ($) {

  //declaring global variables
  let displayAnswers = [];
  let answers;
  let score = 0;
  let scoreDisplay = $('.score');
  let currentQuestion = 0;
  let questionNumberDisplay = $('.questionNumber');


  //this function deals with the start button on the first page
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
      //Call these functions to get the questions (and display them) and answers (but not display them yet)
      displayQuestions();
      retrieveAndDisplayAnswers();
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
        if (score > 3) {
          $('.final-score').text(`${score}/${STORE.length}`);
          $('.end-quiz').show();
        } else {
          $('.end-quiz').show();
          $('.end-quiz h2').text(`Aww, looks like you need to watch more Fixer Upper! Your score was only ${score} out of ${STORE.length}. Want to try again?`);
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
    //increment and display score
    score++;
    scoreDisplay.text(score);
  }

  function hideAnswersShowFeedback() {
    $('.answerList').empty();
    $('.questionAnswerForm').hide();
  }

  function showFixerPhoto() {
    $('.fixerPhoto').attr('src', STORE[currentQuestion].icon);
  }

  function answersClickListener() {
    for (let i = 0; i < answers.length; i++) {
      // Adds click listener to the "answerList" ul after loading li's
      $('.answerList').on('click', ` #${i}`, function (event) {
        //if the clicked answer's text = the current question's correct answer,
        if ($(event.target).val() === STORE[currentQuestion].correctAnswer) {
          incrementAndShowScore();
          hideAnswersShowFeedback();
          $('.correct-feedback').show();
          showFixerPhoto();
        }
        if ($(event.target).val() !== STORE[currentQuestion].correctAnswer) {
          hideAnswersShowFeedback();
          $('.wrong-feedback').show();
          $('.wrong-feedback h2').text(`Uh oh! That wasn't the right answer. The right answer was: "${STORE[currentQuestion].correctAnswer}"`);
          showFixerPhoto();
        }
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
    //assign the answers to the answers variable
    answers = STORE[currentQuestion].answers;
    // Iterate through the answers. Put each answer into an 'li' and then pushing them into the displayAnswers array.
    displayAnswers = [];
    for (let i = 0; i < answers.length; i++) {
      displayAnswers.push(`<label><input type="radio" value="${answers[i]}" name="answer" id=${i} required>${answers[i]}</label>`);
    }
    //Display the new answers on the .answerList ul
    $('.answerList').html(displayAnswers.join('') + '<button>Submit</button>');
  }

  function startOver() {
    $('.end-quiz button').on('click', function () {
      location.reload();
    });
  }


  function init() {
    startQuiz();
    nextButtonClickListener();
    startOver();
  }



  init();

});

//Submit button event listener

// for (let i = 0; i < answers.length; i++) {
//   // Adds click listener to the "answerList" ul after loading li's
//   $('.submit-btn').on('submit', `#${i}`, function (event) {
//     event.preventDefault();
//     let selected = $('input:checked');
//     let clickedAnswer = selected.val();
//     //if the clicked answer's text = the current question's correct answer,
//     if (clickedAnswer === STORE[currentQuestion].correctAnswer) {
//       incrementAndShowScore();
//       hideAnswersShowFeedback();
//       $('.correct-feedback').show();
//       showFixerPhoto();
//     }
//     if (clickedAnswer !== STORE[currentQuestion].correctAnswer) {
//       hideAnswersShowFeedback();
//       $('.wrong-feedback').show();
//       $('.wrong-feedback h2').text(`Uh oh! That wasn't the right answer. The right answer was: "${STORE[currentQuestion].correctAnswer}"`);
//       showFixerPhoto();
//     }
//   });
// }