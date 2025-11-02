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

  if (cardData.likes.some((user) => user._id === userData._id)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', onLike);
  cardImage.addEventListener('click', onClick);

  return cardElement;
};

export { createCardElement };
