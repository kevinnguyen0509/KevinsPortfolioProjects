'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const showModalButton = document.querySelectorAll('.show-modal');
const closeModalButton = document.querySelector('.close-modal');

const closeModal = function () {
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
};
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
for (let i = 0; i < showModalButton.length; i++)
  showModalButton[i].addEventListener('click', openModal);

closeModalButton.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden'))
    closeModal();
});
