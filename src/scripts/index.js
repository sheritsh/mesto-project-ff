import '../pages/index.css';
import { initialCards } from './cards';
import { createCardElement } from './card';
import { openModal } from './modal';

// DOM ELEMENTS
const placesWrap = document.querySelector('.places__list');

/* Modals */
const profileEditModal = document.querySelector('.popup_type_edit');
const cardAddModal = document.querySelector('.popup_type_new-card');
const imagePreviewModal = document.querySelector('.popup_type_image');
const modalWindows = document.querySelectorAll('.popup');

/* Btns to open modal */
const profileEditBtn = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');

const handleDeleteCard = (evt) => {
  evt.target.closest('.card').remove();
};

const handleLikeCard = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
};

const handleOpenCard = () => {
  openModal(imagePreviewModal);
};

cardAddBtn.addEventListener('click', () => {
  openModal(cardAddModal);
});

profileEditBtn.addEventListener('click', () => {
  openModal(profileEditModal);
});

modalWindows.forEach((modal) => {
  modal.classList.add('popup_is-animated');
});

initialCards.forEach((data) => {
  placesWrap.append(
    createCardElement(data, {
      onDelete: handleDeleteCard,
      onLike: handleLikeCard,
      onClick: handleOpenCard,
    })
  );
});
