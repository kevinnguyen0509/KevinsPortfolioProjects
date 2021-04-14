'use strict';

// Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentRollScorePlayer0 = document.querySelector('#current--0');
const currentRollScorePlayer1 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const newGameButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.add('hidden');

const score = [0, 0];
let currentRollScore = 0;
let activePlayer = 0;

function switchPlayers() {
  //current rollScore = 0
  currentRollScore = 0;
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = currentRollScore;
  //switch players
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
}
rollDiceButton.addEventListener('click', function () {
  //1) Generate a random dice roll
  const diceRollResult = Math.trunc(Math.random() * 6) + 1;
  //2) Display dice
  dice.classList.remove('hidden');
  dice.src = `img/dice-${diceRollResult}.png`;
  //3) check for rolled 1: if true, switch to next player
  if (diceRollResult !== 1) {
    currentRollScore += diceRollResult;
    document.getElementById(
      `current--${activePlayer}`
    ).textContent = currentRollScore;
  } else {
    switchPlayers();
  }
});

holdButton.addEventListener('click', function () {
  //1) Add current score to active player's score
  score[activePlayer] += currentRollScore;
  document.getElementById(`current--${activePlayer}`).textContent =
    score[activePlayer];

  switchPlayers(); //switch player
  score0El.textContent = score[0];
  score1El.textContent = score[1];
  //2) check if player's score is >= 100 playerscore = playerscore >= 100 ? close game: add score to Total score then do step 3

  if (score[0] >= 100) {
    player0Element.classList.add('player--winner');
    rollDiceButton.disabled = true;
    holdButton.disabled = true;
  } else if (score[1] >= 100) {
    console.log('player 2 wins');
    player1Element.classList.add('player--winner');
    rollDiceButton.disabled = true;
    holdButton.disabled = true;
  }
});

newGameButton.addEventListener('click', function () {
  switchPlayers();
  score[0] = 0;
  score[1] = 0;
  score0El.textContent = score[0];
  score1El.textContent = score[1];
  currentRollScore = 0;

  player1Element.classList.remove('player--winner');
  player0Element.classList.remove('player--winner');

  rollDiceButton.disabled = false;
  holdButton.disabled = false;
});
