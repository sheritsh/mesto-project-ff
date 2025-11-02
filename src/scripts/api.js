const config = {
  baseUrl: 'https://nomoreparties.co/v1/higher-front-back-dev',
  headers: {
    authorization: 'f262bbc7-902d-45dd-908a-ebce7c786e0a',
    'Content-Type': 'application/json',
  },
};

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Error: ${response.status}`);
};

/* USER API */
const getUserInformation = async () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
};

const changeUserInformation = async (userData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(userData),
  }).then(handleResponse);
};

const changeUserAvatar = async (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(handleResponse);
};

/* CARDS API */
const getInitialCards = async () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};

const postNewCard = async (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(card),
  }).then(handleResponse);
};

const deleteCard = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(handleResponse);
};

/* LIKES API */
const likeCard = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(handleResponse);
};

const unlikeCard = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(handleResponse);
};

export {
  getUserInformation,
  getInitialCards,
  changeUserInformation,
  postNewCard,
  deleteCard,
  likeCard,
  unlikeCard,
  changeUserAvatar,
};
