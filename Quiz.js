const startingMinutes = 10;
let time = startingMinutes * 60;

const countdownEL = document.getElementById("countdown");
setInterval(updateCountdown, 1000);
function updateCountdown( ){
    const minutes = Math.floor(time/ 60);
    let seconds = time % 60;

    seconds=seconds <10 ? "0" +seconds : seconds;

}




(function() {
    var questions = [{
      question: "Java is Javascript",
      choices: ["Yes", "No", "It depends", "All of the above", "None of the above"],
      correctAnswer:"No"
    }, {
      question: "Declare a variable?",
      choices: ["if", "variable", "v", "var", "vrl"],
      correctAnswer: "var"
    }, {
      question: "Where do we put JS?",
      choices: ["script", "style", "div", "js", "css"],
      correctAnswer: "script"
    }, {
      question: "not a real statement?",
      choices: ["if", "else if", "else", "otherwise"],
      correctAnswer: "otherwise"
    }, {
      question: "Boolean(24>6)",
      choices: ["NaN", "false", "true", "all of the above", "none of the above"],
      correctAnswer: "true"
    }];
    
    var questionCounter = 0; 
    var selections = [];
    var quiz = $('#quiz'); 
    
    
    displayNext();
    
    
    $('#next').on('click', function (e) {
      e.preventDefault();
      
      
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
      
      if (isNaN(selections[questionCounter])) {
        alert('Please make a selection!');
      } else {
        questionCounter++;
        displayNext();
      }
    });
    
    
    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    
    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });
    
    
    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    
    
    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h2>Question ' + (index + 1) + ':</h2>');
      qElement.append(header);
      
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    

    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
    
    
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    
    
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
          
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    
    function displayScore() {
      var score = $('<p>',{id: 'question'});
      
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
        var initials = prompt ("Enter Your Initials");
      if (initials != null){
        alert("Congratulations " + initials)
      }
      score.append('You got ' + numCorrect + ' questions out of ' +
                   questions.length + ' correct ');
      return score;
    

    }

  })();