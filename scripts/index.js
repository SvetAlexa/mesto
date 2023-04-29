const initialCards = [
    {
        link: 'https://images.unsplash.com/photo-1644543419167-2cc7a5738665?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8JUQwJUExJUQwJUI4JUQxJTg1JUQwJUJFJUQxJTgyJUQxJThEJTIwJUQwJTkwJUQwJUJCJUQwJUI4JUQwJUJEJUQxJThDfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        name: 'Сихотэ-Алинь Приморский край',
    },
    {
        link: 'https://images.unsplash.com/photo-1598535348425-e76a7cc312d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8JUQwJUExJUQxJTgzJUQwJUJCJUQwJUIwJUQwJUJBJUQxJTgxJUQwJUJBJUQwJUI4JUQwJUI5JTIwJUQwJUJBJUQwJUIwJUQwJUJEJUQxJThDJUQwJUJFJUQwJUJEfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        name: 'Сулакский каньон Дагестан',
    },
    {
        link: 'https://images.unsplash.com/photo-1660026671516-21658a9c2c7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8JUQwJUI0JUQwJUJFJUQwJUJCJUQwJUI4JUQwJUJEJUQwJUIwJTIwJUQwJUI0JUQxJTgzJUQxJTg1JUQwJUJFJUQwJUIyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        name: 'Чечкыш (Долина горных духов) Горный Алтай',
    },
    {
        link: 'https://images.unsplash.com/photo-1614000531402-74cca389903f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fCVEMCVCMSVEMCVCMCVEMCVCOSVEMCVCQSVEMCVCMCVEMCVCQnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        name: 'Байкал',
    },
    {
        link: 'https://images.unsplash.com/photo-1634665610480-073d92470559?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fCVEMCVCNCVEMCVCRSVEMCVCQyVEMCVCMSVEMCVCMCVEMCVCOXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        name: 'Домбай Ущелье Аманауз',
    },
    {
        link: 'https://images.unsplash.com/photo-1627329904799-607897b1eb60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fCVEMCVBRCVEMCVCQiVEMSU4QyVEMCVCMSVEMSU4MCVEMSU4MyVEMSU4MXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        name: 'Карачаево-Черкесия Сентинский храм',
    },
];

const initialCardsContainer = document.querySelector('.elements__lists');
const template = document.querySelector('#element-item-template');

const createCard = (card) => {
    const li = template.content.querySelector('.element').cloneNode(true);

    li.querySelector('.element__image').src = card.link;
    li.querySelector('.element__title').textContent = card.name;
    initialCardsContainer.append(li);
    return li;
};

const listCards = initialCards.map(card => {
    const cardElement = createCard(card);
    return cardElement;
});









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