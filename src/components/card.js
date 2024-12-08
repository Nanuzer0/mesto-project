export const createCard = (cardData, handleImageClick) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Обработчик клика по картинке
  cardImage.addEventListener('click', () => handleImageClick(cardData));

  // Обработчик лайка
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  // Обработчик удаления
  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  return cardElement;
}; 