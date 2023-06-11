import { Card } from '../components/Card.js';
import { initialCards } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { configFormSelector } from '../utils/constants.js';
import Section from '../components/Section.js';

import { initialCardsContainer } from '../utils/constants.js';



const popupNewCard = document.querySelector('.popup_type_new-card');
const popupProfileInfo = document.querySelector('.popup_type_edit');
const popupOpenImage = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');

const formPopupNewCard = document.querySelector('.popup__form_type_new-card');
const formPopupProfileInfo = document.querySelector('.popup__form_type_edit');

const titleInput = formPopupNewCard.querySelector('.popup__input_value_title');
const linkInput = formPopupNewCard.querySelector('.popup__input_value_link');

const nameInput = formPopupProfileInfo.querySelector('.popup__input_value_name');
const jobInput = formPopupProfileInfo.querySelector('.popup__input_value_activity');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__activity');

const buttonAddNewCard = document.querySelector('.profile__add-button');
const buttonEditProfileInfo = document.querySelector('.profile__edit-button');

const buttonFormSave = document.querySelector('.popup__button-sumbit_save');
const buttonFormAddCard = document.querySelector('.popup__button-sumbit_create');

const buttonsClosePopup = document.querySelectorAll('.popup__close-button');

const imagePopup = document.querySelector('.popup__image');
const titlePopup = document.querySelector('.popup__caption');

//функция создания новой карточки
function createCard(data, templateSelector, handleImageClick) {
    const card = new Card(data, templateSelector, handleImageClick);
    const cardElement = card.generateCard();
    return cardElement;
}

//отрисовка карточек "из коробки"
function renderDefaultCards() {
    const defaultCard = new Section({
        items: initialCards,
        renderer: (item) => {
            const cardNode = createCard(item, '#element-item-template', handleImageClick);
            console.log(cardNode)
            defaultCard.addItem(cardNode, 'append');
        }
    },
        initialCardsContainer
    );
    defaultCard.renderItems()
};

renderDefaultCards()

//функция отрисовки карточки от пользователя
function renderNewCard(data) {
    const newCard = new Section({
        items: data,
        renderer: (item) => {
            const cardNode = createCard(item, '#element-item-template', handleImageClick);
            console.log(cardNode)
            newCard.addItem(cardNode, 'prepend');
        }
    },
        initialCardsContainer
    );
    newCard.renderItems()
};

const openPopup = (popup) => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEsc);
};

const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEsc);
};

//обработчик открытия попапа по картинке
function handleImageClick(name, link) {
    imagePopup.src = link;
    imagePopup.alt = name;
    titlePopup.textContent = name;
    openPopup(popupOpenImage);
};

//закрытие попапов по нажатию на крестик
buttonsClosePopup.forEach((item) => {
    item.addEventListener('click', (evt) => {
        const closeButton = evt.target;
        closePopup(closeButton.closest('.popup'));
    });
});

//закрытие попапов по overlay
popups.forEach((item) => {
    item.addEventListener('mousedown', (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(evt.currentTarget);
        }
    });
});

const closePopupByEsc = (evt) => {
    const key = evt.key;
    if (key === 'Escape') {
        const activePopup = document.querySelector('.popup_is-opened');
        closePopup(activePopup);
    }
};

const formNewCardValidation = new FormValidator(configFormSelector, formPopupNewCard);
const formProfileInfoValidation = new FormValidator(configFormSelector, formPopupProfileInfo);

formNewCardValidation.enableValidation();
formProfileInfoValidation.enableValidation();

//слушатель кнопки добавления новой карточки
buttonAddNewCard.addEventListener('click', function (evt) {
    formNewCardValidation.cleanErrorMessage();
    openPopup(popupNewCard);
    formPopupNewCard.reset();
    formNewCardValidation.disabledButton(buttonFormAddCard);
});

//слушатель кнопки редактирования профиля
buttonEditProfileInfo.addEventListener('click', function (evt) {
    formProfileInfoValidation.cleanErrorMessage()
    openPopup(popupProfileInfo);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    formProfileInfoValidation.enabledButton(buttonFormSave);
});

//обработчик сабмита создания новой карточки
const handleFormSubmitNewCard = (evt) => {
    evt.preventDefault();
    const dataCard = [{
        name: titleInput.value,
        link: linkInput.value
    }]
    renderNewCard(dataCard);
    closePopup(popupNewCard);
};

formPopupNewCard.addEventListener('submit', handleFormSubmitNewCard);

//обработчик сабмита редактирования профиля
function handleFormSubmitEdit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfileInfo);
};

formPopupProfileInfo.addEventListener('submit', handleFormSubmitEdit);