'use strict';
import photos from './gallery-items.js';

const gallerey = document.querySelector('ul.js-gallery');
const modal = document.querySelector('div.js-lightbox');
const imgModal = document.querySelector('img.lightbox__image');
const backdrop = document.querySelector('div.lightbox__content');
const closeModalBtn = document.querySelector(
  'button[data-action="close-lightbox"]'
);

photos.forEach((elem) => {
  const li = document.createElement('li');
  li.classList.add('gallery__item');

  const img = document.createElement('img');
  img.classList.add('gallery__image');
  img.setAttribute('src', `${elem.preview}`);
  img.setAttribute('data-source', `${elem.original}`);
  img.setAttribute('alt', `${elem.description}`);

  const link = document.createElement('a');
  link.classList.add('gallery__link');
  link.setAttribute('href', `${elem.original}`);

  link.append(img);
  li.append(link);
  gallerey.append(li);
});

gallerey.addEventListener('click', (e) => {
  e.preventDefault();
  // это чтоб не срабатывала ссылка на href фотки, а показывало модалку
  if (e.target === e.currentTarget) {
    return;
  }
  modal.classList.add('is-open');
  imgModal.setAttribute('src', e.target.getAttribute('data-source'));
  imgModal.setAttribute('alt', e.target.getAttribute('alt'));
  window.addEventListener('keydown', handleKeyPress);
});

closeModalBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', handleOverlayClick);

function closeModal(e) {
  // console.log('TARGET:', e.target);
  // console.log('CURRENT:', e.currentTarget);
  modal.classList.remove('is-open');
  imgModal.setAttribute('src', '');
  window.removeEventListener('keydown', handleKeyPress);
}

function handleOverlayClick(e) {
  // console.log('TARGET:', e.target);
  // console.log('CURRENT:', e.currentTarget);
  if (e.target !== e.currentTarget) {
    return;
  }
  closeModal();
}

function handleKeyPress(e) {
  if (e.code !== 'Escape') {
    return;
  }
  closeModal();
}
