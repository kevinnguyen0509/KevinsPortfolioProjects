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
const holdButtong = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.add('hidden');

const score = [0, 0];
let currentRollScore = 0;
let activePlayer = 0;

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
});
