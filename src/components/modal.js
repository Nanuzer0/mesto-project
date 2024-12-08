export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
};

export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
};

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export const setPopupListeners = (popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
}; 