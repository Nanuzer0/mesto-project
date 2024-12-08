import { deleteCard, likeCard, unlikeCard } from './api.js';

export const createCard = (cardData, handleImageClick, userId) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  
  likeCounter.textContent = cardData.likes.length;
  
  const isLiked = cardData.likes.some(user => user._id === userId);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  }

  cardImage.addEventListener('click', () => handleImageClick(cardData));

  likeButton.addEventListener('click', () => {
    const likeMethod = likeButton.classList.contains('card__like-button_is-active') 
      ? unlikeCard 
      : likeCard;

    likeMethod(cardData._id)
      .then((updatedCard) => {
        likeButton.classList.toggle('card__like-button_is-active');
        likeCounter.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.log(err));
  });

  if (deleteButton) {
    deleteButton.addEventListener('click', () => {
      deleteCard(cardData._id)
        .then(() => {
          cardElement.remove();
        })
        .catch((err) => console.log(err));
    });
  }

  return cardElement;
}; 