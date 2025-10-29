import { openModal } from './modal';
import { imagePreviewModal } from './index';

const cardTemplate = document
  .querySelector('#card-template')
  .content.querySelector('.places__item');

const createCardElement = (data, { onClick, onLike, onDelete }) => {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardElement.querySelector('.card__title').textContent = data.name;

  likeButton.addEventListener('click', onLike);
  cardImage.addEventListener('click', onClick);
  deleteButton.addEventListener('click', onDelete);

  return cardElement;
};

const handleDeleteCard = (evt) => {
  evt.target.closest('.card').remove();
};

const handleLikeCard = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
};

const handleOpenCard = (imgPreviewElement, imgCaptionElement, cardData) => {
  return () => {
    imgPreviewElement.src = ''; // prevent last image render
    imgPreviewElement.src = cardData.link;
    imgPreviewElement.alt = cardData.name;
    imgCaptionElement.textContent = cardData.name;

    openModal(imagePreviewModal);
  };
};

export { createCardElement, handleDeleteCard, handleLikeCard, handleOpenCard };
