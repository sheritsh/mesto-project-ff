const openModal = (modalElem, onSubmit) => {
  modalElem.classList.add('popup_is-opened');

  const onCloseClick = (evt) => {
    if (evt.target.matches('.popup__close') || evt.target.matches('.popup_is-opened')) {
      closeModal(modalElem, onCloseClick, onEscKeydown, handleModalSubmit);
    }
  };

  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeModal(modalElem, onCloseClick, onEscKeydown, handleModalSubmit);
    }
  };

  const handleModalSubmit = (evt) => {
    onSubmit(evt);
    closeModal(modalElem, onCloseClick, onEscKeydown, handleModalSubmit);
  };

  modalElem.addEventListener('click', onCloseClick);
  document.addEventListener('keydown', onEscKeydown);
  if (onSubmit) {
    modalElem.addEventListener('submit', handleModalSubmit);
  }
};

const closeModal = (modalElem, onCloseClick, onEscKeydown, handleModalSubmit) => {
  modalElem.classList.remove('popup_is-opened');

  modalElem.removeEventListener('click', onCloseClick);
  document.removeEventListener('keydown', onEscKeydown);
  if (handleModalSubmit) {
    modalElem.removeEventListener('submit', handleModalSubmit);
  }
};

export { openModal };
