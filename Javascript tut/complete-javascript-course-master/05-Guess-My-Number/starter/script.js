'use strict';
let score = 20;
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let highScore = 0;

function displayMessage(message) {
  return message;
}

function replaceHighScore() {
  highScore = score;
  document.querySelector('.highscore').textContent = highScore;
}

function sendFeedBackToShowCorrectAnswerFound() {
  document.querySelector('body').style.backgroundColor = '#60b347';
  document.querySelector('.number').style.width = '30rem';
  document.querySelector('.number').textContent = secretNumber;
  document.querySelector('.message').textContent = displayMessage(
    '🎉 You got the number!'
  );
}

function tellUserIfGuessWasTooHighOrTooLow(guess, secretNumber) {
  document.querySelector('.message').textContent =
    guess > secretNumber
      ? displayMessage('📈 Too High!')
      : displayMessage('📉 Too Low!');
}

function subtractOnePointFromScore() {
  score--;
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
}

function setScoreToZero() {
  document.querySelector('.score').textContent = 0;
}

function resetGame() {
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.guess').value = '';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.number').textContent = '?';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
}
//Clicking With Mouse
document.querySelector('.again').addEventListener('click', function () {
  resetGame();
});

document.querySelector('.guess').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const guess = document.querySelector('.guess').value;

    if (!guess) {
      // If Incorrect
      document.querySelector('.message').textContent = displayMessage(
        '🚫 No Number Currently!'
      );
      document.querySelector('.guess').value = '';
    } else if (guess == secretNumber) {
      //If Correct
      sendFeedBackToShowCorrectAnswerFound();

      if (score > highScore) {
        replaceHighScore();
      }
    } else if (guess !== secretNumber) {
      if (score > 1) {
        tellUserIfGuessWasTooHighOrTooLow(guess, secretNumber);
        subtractOnePointFromScore();
      } else {
        document.querySelector('.message').textContent = displayMessage(
          '😢 Sorry, you lost.'
        );
        setScoreToZero();
      }
    }
  }
});

document.querySelector('.check').addEventListener('click', function () {
  const guess = document.querySelector('.guess').value;

  if (!guess) {
    // If Incorrect
    document.querySelector('.message').textContent = displayMessage(
      '🚫 No Number Currently!'
    );
    document.querySelector('.guess').value = '';
  } else if (guess == secretNumber) {
    //If Correct
    sendFeedBackToShowCorrectAnswerFound();

    if (score > highScore) {
      replaceHighScore();
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      tellUserIfGuessWasTooHighOrTooLow(guess, secretNumber);
      subtractOnePointFromScore();
    } else {
      document.querySelector('.message').textContent = displayMessage(
        '😢 Sorry, you lost.'
      );
      setScoreToZero();
    }
  }
});
