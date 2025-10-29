const openModal = (modalElem) => {
  modalElem.classList.add('popup_is-opened');

  const onCloseClick = (evt) => {
    if (evt.target.matches('.popup__close') || evt.target.matches('.popup_is-opened'))
      closeModal(modalElem, onCloseClick, onEscKeydown);
  };

  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') closeModal(modalElem, onCloseClick, onEscKeydown);
  };

  modalElem.addEventListener('click', onCloseClick);
  document.addEventListener('keydown', onEscKeydown);
};

const closeModal = (modalElem, onCloseClick, onEscKeydown) => {
  modalElem.classList.remove('popup_is-opened');

  modalElem.removeEventListener('click', onCloseClick);
  document.removeEventListener('keydown', onEscKeydown);
};

export { openModal };
