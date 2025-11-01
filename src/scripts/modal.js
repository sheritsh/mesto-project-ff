const openModal = (modalElem, onSubmit) => {
  modalElem.classList.add('popup_is-opened');

  const onCloseClick = (evt) => {
    if (evt.target.matches('.popup__close') || evt.target.matches('.popup_is-opened')) {
      closeModal(modalElem, onCloseClick, onEscKeydown, handleFormSubmit);
    }
  };

  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeModal(modalElem, onCloseClick, onEscKeydown, handleFormSubmit);
    }
  };

  const handleFormSubmit = (evt) => {
    onSubmit(evt);
    closeModal(modalElem, onCloseClick, onEscKeydown, handleFormSubmit);
  };

  modalElem.addEventListener('click', onCloseClick);
  document.addEventListener('keydown', onEscKeydown);
  if (onSubmit) {
    modalElem.addEventListener('submit', handleFormSubmit);
  }
};

const closeModal = (modalElem, onCloseClick, onEscKeydown, handleFormSubmit) => {
  modalElem.classList.remove('popup_is-opened');

  modalElem.removeEventListener('click', onCloseClick);
  document.removeEventListener('keydown', onEscKeydown);
  if (handleFormSubmit) {
    modalElem.removeEventListener('submit', handleFormSubmit);
  }
};

export { openModal };
