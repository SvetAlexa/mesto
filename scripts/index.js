const initialCards = [
    {
        link: 'https://unsplash.com/photos/ec3QSoInblM',
        name: 'Сихотэ-Алинь Приморский край',
    },
    {
        link: 'https://unsplash.com/photos/1PXSA5d4208',
        name: 'Сулакский каньон Дагестан',
    },
    {
        link: 'https://unsplash.com/photos/wGA5ktslkfc',
        name: 'Чечкыш (Долина горных духов) Горный Алтай',
    },
    {
        link: 'https://unsplash.com/photos/XdZCa1M2m9o',
        name: 'Байкал',
    },
    {
        link: 'https://unsplash.com/photos/sCLNmLYemfA',
        name: 'Домбай Ущелье Аманауз',
    },
    {
        link: 'https://unsplash.com/photos/bW-ig06IfAg',
        name: 'Карачаево-Черкесия Сентинский храм ',
    },
];

const itemsContainer = document.querySelector('.elements__lists');







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