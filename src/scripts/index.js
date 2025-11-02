import '../pages/index.css';
import { createCardElement, handleDeleteCard, handleLikeCard } from './card';
import { openModal } from './modal';
import { enableValidation, clearValidation } from './validation';
import { changeUserInformation, getInitialCards, getUserInformation, postNewCard } from './api';

// DOM ELEMENTS
const placesWrap = document.querySelector('.places__list');

/* Profile Information */
const userNameElement = document.querySelector('.profile__title');
const userDescriptionElement = document.querySelector('.profile__description');
const userAvatarElement = document.querySelector('.profile__image');

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

// GLOBAL STORE
let userProfileData = {};

// SET EVENT LISTENERS
cardAddBtn.addEventListener('click', () => {
  openModal(cardAddModal, handleSubmitAddCard);
});

profileEditBtn.addEventListener('click', () => {
  const profileEditForm = document.querySelector('form[name="edit-profile"]');
  fillEditProfileInputs();
  clearValidation(profileEditForm, validationConfig);
  openModal(profileEditModal, handleSubmitProfileEdit);
});

// FORM HANDLERS
const fillEditProfileInputs = () => {
  userNameInput.value = userNameElement.textContent;
  descriptionInput.value = userDescriptionElement.textContent;
};

const handleSubmitProfileEdit = (evt) => {
  evt.preventDefault();

  changeUserInformation({ name: userNameInput.value, about: descriptionInput.value })
    .then((userData) => {
      userNameElement.textContent = userData.name;
      userDescriptionElement.textContent = userData.about;
    })
    .catch((error) => console.error('Failed: ', error));
};

const clearCardAddForm = () => {
  const cardAddForm = document.querySelector('form[name="new-place"]');
  cardAddForm.reset();
  clearValidation(cardAddForm, validationConfig);
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
  const cardInputData = { name: cardAddNameInput.value, link: cardAddUrlInput.value };

  postNewCard(cardInputData)
    .then((cardData) => {
      placesWrap.prepend(
        createCardElement(cardData, userProfileData, {
          onDelete: handleDeleteCard,
          onLike: handleLikeCard,
          onClick: handleOpenCard(cardData),
        })
      );
    })
    .catch((error) => console.error('Failed: ', error));

  clearCardAddForm();
};

modalWindows.forEach((modal) => {
  modal.classList.add('popup_is-animated');
});

const fetchInitialData = () => {
  Promise.all([getUserInformation(), getInitialCards()])
    .then(([userData, cardsData]) => {
      fillUserData(userData);
      renderCards(cardsData);
    })
    .catch((error) => console.error('Failed: ', error));
};

const fillUserData = (userData) => {
  userProfileData = userData;
  userNameElement.textContent = userData.name;
  userDescriptionElement.textContent = userData.about;
  userAvatarElement.style = `background-image: url(${userData.avatar})`;
};

const renderCards = (cards) => {
  cards.forEach((card) => {
    placesWrap.append(
      createCardElement(card, userProfileData, {
        onDelete: handleDeleteCard,
        onLike: handleLikeCard,
        onClick: handleOpenCard(card),
      })
    );
  });
};

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);

fetchInitialData();
