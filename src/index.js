import { enableValidation } from './components/validate.js';
import { openPopup, closePopup, setPopupListeners } from './components/modal.js';
import { createCard } from './components/card.js';
import { 
  getUserInfo, 
  getInitialCards, 
  updateUserInfo, 
  addCard,
  deleteCard,
  likeCard,
  unlikeCard,
  updateAvatar
} from './components/api.js';
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
const avatarPopup = document.querySelector('.popup_type_avatar');

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

// Элементы формы аватара
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector('.popup__input_type_avatar');
const profileImage = document.querySelector('.profile__image');
const profileImageButton = document.querySelector('.profile__image-edit-button');

// Добавляем класс анимации попапам
[profilePopup, cardPopup, imagePopup, avatarPopup].forEach((popup) => {
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
  addCard(cardNameInput.value, cardLinkInput.value)
    .then((cardData) => {
      const cardElement = createCard(cardData, handleCardImageClick, cardData.owner._id);
      cardsList.prepend(cardElement);
      closePopup(cardPopup);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Обработчик отправки формы профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  updateUserInfo(nameInput.value, jobInput.value)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Обработчик открытия формы редактирования профиля
function handleProfileEditClick() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(profilePopup);
}

// Обработчик открытия попапа аватара
profileImageButton.addEventListener('click', () => {
  openPopup(avatarPopup);
});

// Обработчик отправки формы аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  updateAvatar(avatarInput.value)
    .then((userData) => {
      profileImage.src = userData.avatar;
      closePopup(avatarPopup);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    });
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
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

// Загрузка данных с сервера
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    // Сохраняем id пользователя
    const userId = userData._id;
    
    // Установка данных пользователя
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.src = userData.avatar;
    
    // Отрисовка карточек с передачей userId
    cards.forEach((cardData) => {
      const cardElement = createCard(cardData, handleCardImageClick, userId);
      cardsList.append(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });
