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
    $('.feedback').hide();
    $('.end-quiz').hide();
  }

  //Start function startQuiz
  function startQuiz() {
    questionNumberDisplay.text(1);
    //Clicking on the start button does this
    $('.btn-start').on('click', function () {
      currentQuestion = 0;

      //Calls this function to get the questions (and display them) and answers (but do not display them yet)
      displayQuestionsAndAnswers();

      //Appending the answer array in the empty "ul" under the question and displaying the answers
      $('.answerList').append(displayAnswers);

      //Call this function below to set click listeners on the answers
      answersClickListener();
    });
  }

  //Define the 'next' button click listener here
  //Inside the function handle the last screen part
  //When clicking on the feedback's "next" button,
  function nextButtonClickListener() {
    $('.feedback button').on('click', function () {
      //Hide the feedback box
      $('.feedback').hide();

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
        //Call the displayQuestionsAndAnswers function again
        displayQuestionsAndAnswers();
        //Show the .questionAnswerForm
        $('.questionAnswerForm').show();
        //Display the new answers on the .answerList ul
        $('.answerList').html(displayAnswers);
      }
    });
  }

  function startOver() {
    $('.end-quiz button').on('click', function () {
      location.reload();
    });
  }


  function answersClickListener() {
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
          $('.questionAnswerForm').hide();
          //Show the feedback with the picture
          $('.feedback').show();
          $('.fixerPhoto').attr('src', STORE[currentQuestion].icon);

          return;
        }

        //If the answer clicked is the wrong answer, increment the current question
        //Empty the answerList ul
        $('.answerList').empty();
        $('.questionAnswerForm').hide();
        $('.feedback').show();
        $('.feedback h2').text(`Sorry! The correct answer is "${STORE[currentQuestion].correctAnswer}"`);



        //Call the displayQuestionsAndAnswers function
        displayQuestionsAndAnswers();
        //Append the new answers display to the answerList ul
        $('.answerList').append(displayAnswers);
      });
    }
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


  function init() {
    hideSections();
    nextButtonClickListener();
    startQuiz();
    startOver();
  }


  //Call this function to start the app
  init();

});


//refactoring:
//1. DRY
//2. Pure functions 
//3. Look at function names