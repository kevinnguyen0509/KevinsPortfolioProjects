'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentRollScorePlayer0 = document.querySelector('#current--0');
const currentRollScorePlayer1 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const newGameButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--roll');
const holdButtong = document.querySelector('.btn--hold');
let currentRollScore = 0;

score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.add('hidden');

rollDiceButton.addEventListener('click', function () {
  //1) Generate a random dice roll
  const diceRollResult = Math.trunc(Math.random() * 6) + 1;
  //2) Display dice
  dice.classList.remove('hidden');
  dice.src = `img/dice-${diceRollResult}.png`;
  //3) check for rolled 1: if true, switch to next player
  if (diceRollResult !== 1) {
    currentRollScore += diceRollResult;
    currentRollScorePlayer0.textContent = currentRollScore;
  } else {
    //current rollScore = 0
    currentRollScore = 0;
    currentRollScorePlayer0.textContent = currentRollScore;
    //switch players
  }
});
