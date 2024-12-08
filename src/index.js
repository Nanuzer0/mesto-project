import { enableValidation } from './components/validate.js';
import { openPopup, closePopup, setPopupListeners } from './components/modal.js';
import { createCard } from './components/card.js';
import { initialCards } from './scripts/cards.js';
import './styles/index.css';

// Настройки валидации
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Находим все попапы и добавляем им слушатели
const popups = document.querySelectorAll('.popup');
popups.forEach(setPopupListeners);

// Включаем валидацию форм
enableValidation(validationSettings);

// @todo: Темплейт карточки

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// Попапы
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// Элементы попапа с картинкой
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Кнопки и другие элементы
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupCloseButtons = document.querySelectorAll('.popup__close');

// Элементы формы редактирования профиля
const profileForm = document.querySelector('.popup_type_edit .popup__form');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Элементы формы добавления карточки
const cardForm = document.querySelector('.popup_type_new-card .popup__form');
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardForm.querySelector('.popup__input_type_url');

// Добавляем класс анимации попапам
[profilePopup, cardPopup, imagePopup].forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

// Функция открытия попапа с картинкой
function handleCardImageClick(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopup(imagePopup);
}

// Обработчик отправки формы карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard(
    {
      name: cardNameInput.value,
      link: cardLinkInput.value
    },
    handleCardImageClick
  );
  cardsList.prepend(newCard);
  closePopup(cardPopup);
  evt.target.reset();
}

// Обработчик отправки формы профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profilePopup);
}

// Обработчик открытия формы редактирования профиля
function handleProfileEditClick() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(profilePopup);
}

// Слушатели событий
profileEditButton.addEventListener('click', handleProfileEditClick);
addCardButton.addEventListener('click', () => openPopup(cardPopup));
popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);

// Вывести начальные карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, handleCardImageClick);
  cardsList.append(cardElement);
});
