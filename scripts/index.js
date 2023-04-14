console.log('Привет, это я, твой первый JavaScript код!');

const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtomElement = document.querySelector('.profile__edit-button');

const openPopup = function () {
    console.log('openPopup');
    popupElement.classList.add('popup_is-opened');
}

const closePopup = function () {
    console.log('closePopup');
    popupElement.classList.remove('popup_is-opened');
}

popupOpenButtomElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);