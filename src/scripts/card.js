const cardTemplate = document
  .querySelector('#card-template')
  .content.querySelector('.places__item');

function createCardElement(data, { onClick, onLike, onDelete }) {
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
}

export { createCardElement };
