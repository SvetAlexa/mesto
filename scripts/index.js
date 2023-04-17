const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtomElement = document.querySelector('.profile__edit-button');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__activity');

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_value_name');
let jobInput = formElement.querySelector('.popup__input_value_activity');

//открытие popup
const openPopup = function () {
    popupElement.classList.add('popup_is-opened');
    nameInput.value = profileName.textContent; //заполняем поля формы значениями из профиля
    jobInput.value = profileJob.textContent;
};

//закрытие popup
const closePopup = function () {
    popupElement.classList.remove('popup_is-opened');
};

//обработчики событий открытия и закрытия popup
popupOpenButtomElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

//обработчик "отправки" формы,
function handleFormSubmit(evt) {
    evt.preventDefault(); //отменяем стандартную отправку формы
    profileName.textContent = nameInput.value; //заполняем профиль новыми значениями из полей формы
    profileJob.textContent = jobInput.value;
    closePopup();
}

//обработчик события "отправки" формы
formElement.addEventListener('submit', handleFormSubmit);