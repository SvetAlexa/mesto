const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtomElement = document.querySelector('.profile__edit-button');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__activity');

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_value_name');
let jobInput = formElement.querySelector('.popup__input_value_activity');

//открываем popup, заполняем поля формы значениями из профиля
const openPopup = function () {
    popupElement.classList.add('popup_is-opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

//закрываем popup
const closePopup = function () {
    popupElement.classList.remove('popup_is-opened');
};

//обработчики событий открытия и закрытия popup
popupOpenButtomElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

//обработчик "отправки" формы, заполняем профиль новыми значениями из полей формы
function handleFormSubmit(evt) {
    evt.preventDefault(); //отменяем стандартную отправку формы
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

//обработчик события "отправки" формы
formElement.addEventListener('submit', handleFormSubmit);