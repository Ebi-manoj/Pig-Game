'use strict';
// selecting elements

const dice = document.querySelector('.dice');
const player1 = document.querySelector('.player-0');
const player2 = document.querySelector('.player-1');
const arrowEl = document.querySelector('.arrow-container');
const score0El = document.querySelector('.totalScore-0');
const score1El = document.querySelector('.totalScore-1');
const current0El = document.querySelector('.currentScore-0');
const current1El = document.querySelector('.currentScore-1');
const player1Name = document.querySelector('.name-0');
const player2Name = document.querySelector('.name-1');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnNew = document.querySelector('.btn-new');

let current = 0;
let active = 0;
let score = [0, 0];
let isflipped = true;
let playing = true;

const reset = function () {
  dice.classList.add('hidden');
  arrowEl.classList.remove('hidden');
  document.querySelector(`.player-${active}`).classList.remove('player-winner');
  arrowEl.style.transform = 'rotate(180deg)';
  player1Name.textContent = 'PLAYER 1';
  player2Name.textContent = 'PLAYER 2';

  current = 0;
  active = 0;
  score = [0, 0];
  isflipped = true;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
};

const switchPlayer = function () {
  document.querySelector(`.currentScore-${active}`).textContent = 0;
  current = 0;
  active = active ? 0 : 1;
  player1.classList.toggle('player-active');
  player2.classList.toggle('player-active');
  isflipped = !isflipped;
  rotateArrow();
};

const rotateArrow = function () {
  if (isflipped) {
    arrowEl.style.transform = 'rotate(180deg)';
  } else {
    arrowEl.style.transform = 'rotate(0deg)';
  }
};

reset();

btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceRollNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(diceRollNumber);

    dice.classList.remove('hidden');
    dice.src = `dice-${diceRollNumber}.png`;

    if (diceRollNumber !== 1) {
      current += diceRollNumber;
      document.querySelector(`.currentScore-${active}`).textContent = current;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    score[active] += current;
    document.querySelector(`.totalScore-${active}`).textContent = score[active];
    if (score[active] >= 100) {
      document.querySelector(`.currentScore-${active}`).textContent = 0;
      document
        .querySelector(`.player-${active}`)
        .classList.add('player-winner');
      document.querySelector(`.name-${active}`).textContent = 'WINNER 🥇';
      dice.classList.add('hidden');
      arrowEl.classList.add('hidden');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', reset);
