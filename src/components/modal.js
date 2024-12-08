// Универсальный обработчик закрытия по Esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

// Функция закрытия попапа по клику на оверлей
function handleOverlayClose(evt) {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
    closePopup(evt.target.closest('.popup'));
  }
}

// Функция открытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

// Функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
}

// Функция добавления слушателей для попапа
export function setPopupListeners(popup) {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('mousedown', handleOverlayClose);
} 