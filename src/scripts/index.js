import '../pages/index.css';
import { initialCards } from './cards';
import { createCardElement, handleDeleteCard, handleLikeCard } from './card';
import { openModal } from './modal';

// DOM ELEMENTS
const placesWrap = document.querySelector('.places__list');

/* Profile Information */
const userNameElement = document.querySelector('.profile__title');
const userDescriptionElement = document.querySelector('.profile__description');

/* Profile Inputs */
const userNameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

/* Card Add Inputs */
const cardAddNameInput = document.querySelector('.popup__input_type_card-name');
const cardAddUrlInput = document.querySelector('.popup__input_type_url');

/* Image Preview Selectors */
const imgPreviewElement = document.querySelector('.popup__image');
const imgCaptionElement = document.querySelector('.popup__caption');

/* Modals */
const profileEditModal = document.querySelector('.popup_type_edit');
const cardAddModal = document.querySelector('.popup_type_new-card');
export const imagePreviewModal = document.querySelector('.popup_type_image');
const modalWindows = document.querySelectorAll('.popup');

/* Btns to open modal */
const profileEditBtn = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');

// SET EVENT LISTENERS
cardAddBtn.addEventListener('click', () => {
  openModal(cardAddModal, handleSubmitAddCard);
});

profileEditBtn.addEventListener('click', () => {
  fillEditProfileInputs();
  openModal(profileEditModal, handleSubmitProfileEdit);
});

// FORM HANDLERS
const fillEditProfileInputs = () => {
  userNameInput.value = userNameElement.textContent;
  descriptionInput.value = userDescriptionElement.textContent;
};

const handleSubmitProfileEdit = (evt) => {
  evt.preventDefault();

  userNameElement.textContent = userNameInput.value;
  userDescriptionElement.textContent = descriptionInput.value;
};

const clearCardAddForm = () => {
  document.forms['new-place'].reset();
};

const handleOpenCard = (cardData) => {
  return () => {
    imgPreviewElement.src = ''; // prevent last image render
    imgPreviewElement.src = cardData.link;
    imgPreviewElement.alt = cardData.name;
    imgCaptionElement.textContent = cardData.name;

    openModal(imagePreviewModal);
  };
};

const handleSubmitAddCard = (evt) => {
  evt.preventDefault();
  const cardData = { name: cardAddNameInput.value, link: cardAddUrlInput.value };

  placesWrap.prepend(
    createCardElement(cardData, {
      onDelete: handleDeleteCard,
      onLike: handleLikeCard,
      onClick: handleOpenCard(cardData),
    })
  );

  clearCardAddForm();
};

modalWindows.forEach((modal) => {
  modal.classList.add('popup_is-animated');
});

initialCards.forEach((data) => {
  placesWrap.append(
    createCardElement(data, {
      onDelete: handleDeleteCard,
      onLike: handleLikeCard,
      onClick: handleOpenCard(data),
    })
  );
});
