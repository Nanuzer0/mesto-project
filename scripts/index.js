// @todo: Темплейт карточки

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// Попапы
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

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

// Функции открытия/закрытия попапов
function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

// Функция создания карточки
function createCard(cardData) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Обработчик клика по картинке
  cardImage.addEventListener('click', () => {
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openModal(imagePopup);
  });

  // Обработчик лайка
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  // Обработчик удаления
  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  return cardElement;
}

// Обработчик отправки формы профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup);
}

// Обработчик отправки формы карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard({
    name: cardNameInput.value,
    link: cardLinkInput.value
  });
  cardsList.prepend(newCard);
  closeModal(cardPopup);
  evt.target.reset();
}

// Обработчик открытия формы редактирования профиля
function handleProfileEditClick() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
}

// Слушатели событий
profileEditButton.addEventListener('click', handleProfileEditClick);
addCardButton.addEventListener('click', () => openModal(cardPopup));
popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);

// Вывести начальные карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardsList.append(cardElement);
});
