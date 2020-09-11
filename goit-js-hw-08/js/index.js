'use strict';
import photos from './gallery-items.js';

const gallerey = document.querySelector('ul.js-gallery');
const modal = document.querySelector('div.js-lightbox');
const imgModal = document.querySelector('img.lightbox__image');
const backdrop = document.querySelector('div.lightbox__content');
const closeModalBtn = document.querySelector(
  'button[data-action="close-lightbox"]'
);
let currentIndex;

const galleryHTML = photos.map((photo, index) => {
  const li = document.createElement('li');
  li.classList.add('gallery__item');

  const img = document.createElement('img');
  img.classList.add('gallery__image');
  img.setAttribute('src', `${photo.preview}`);
  img.setAttribute('data-source', `${photo.original}`);
  img.setAttribute('alt', `${photo.description}`);

  // для пролистывания стрелочками добавляем дата атрибут data-index
  // imgModal.setAttribute('data-index', photos.indexOf(photo));
  // но поскольку map пройдётся по каждомй элементу т.е. index присвоится автоматически
  img.setAttribute('data-index', index);
  // =========================

  const link = document.createElement('a');
  link.classList.add('gallery__link');
  link.setAttribute('href', `${photo.original}`);

  link.append(img);
  li.append(link);

  return li;
});

gallerey.append(...galleryHTML);

const galleryImage = document.querySelectorAll('.gallery__image');

gallerey.addEventListener('click', (e) => {
  e.preventDefault();
  // // это чтоб не срабатывала ссылка на href фотки, а показывало модалку

  // if (e.target === e.currentTarget) {
  //   return;
  // }
  if (e.target.classList.contains('gallery__image')) { // это проверка - кликаем ли мы ТОЧНО на картинку
    imgModal.setAttribute('src', e.target.getAttribute('data-source'));
    imgModal.setAttribute('alt', e.target.getAttribute('alt'));
    currentIndex = +e.target.dataset.index; // возьми индекс картинки, которая открывается в модалке
    window.addEventListener('keydown', handleKeyPress);
    modal.classList.add('is-open');
  }
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
  if (e.target === e.currentTarget) {
    closeModal();
  }
}

const changeImg = () => {
  imgModal.setAttribute('src', photos[currentIndex].original);
  imgModal.setAttribute('alt', photos[currentIndex].description);
};

function handleKeyPress(e) {
  // if (e.code === 'Escape') {
  //   closeModal();
  // }
  switch (e.code) {
    case 'Escape':
      closeModal();
      break;
    case 'ArrowRight':
      if (currentIndex + 1 < photos.length) {
        currentIndex++;
        changeImg();
      }

      break;
    case 'ArrowLeft':
      if (currentIndex - 1 >= 0) {
        currentIndex--;
        changeImg();
      }
  }
}
