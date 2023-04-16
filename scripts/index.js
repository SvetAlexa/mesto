const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtomElement = document.querySelector('.profile__edit-button');

const openPopup = function () {
    popupElement.classList.add('popup_is-opened');
};

const closePopup = function () {
    popupElement.classList.remove('popup_is-opened');
};

popupOpenButtomElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_value_name');
let jobInput = formElement.querySelector('.popup__input_value_activity');

function handleFormSubmit(evt) {
    evt.preventDefault();
    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__activity');
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupElement.classList.remove('popup_is-opened');
}

formElement.addEventListener('submit', handleFormSubmit);