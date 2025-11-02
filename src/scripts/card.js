import { deleteCard } from './api';

const cardTemplate = document
  .querySelector('#card-template')
  .content.querySelector('.places__item');

const createCardElement = (cardData, userData, { onClick, onLike, onDelete }) => {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCounter.textContent = cardData.likes.length;
  cardElement.dataset.id = cardData._id;

  cardElement.querySelector('.card__title').textContent = cardData.name;

  if (userData._id !== cardData.owner._id) {
    deleteButton.style = 'display: none;';
  } else {
    deleteButton.addEventListener('click', onDelete);
  }

  likeButton.addEventListener('click', onLike);
  cardImage.addEventListener('click', onClick);

  return cardElement;
};

const handleDeleteCard = (evt) => {
  const cardElement = evt.target.closest('.card');
  deleteCard(cardElement.dataset.id)
    .then((res) => {
      cardElement.remove();
    })
    .catch((error) => console.error('Failed: ', error));
};

const handleLikeCard = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
};

export { createCardElement, handleDeleteCard, handleLikeCard };
