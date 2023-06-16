import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
    initialCards,
    initialCardsContainer,
    configFormSelector,
    templateCardElement,
    popupNewCard,
    popupProfileInfo,
    popupOpenImage,
    formPopupNewCard,
    formPopupProfileInfo,
    nameInput,
    aboutInput,
    buttonAddNewCard,
    buttonEditProfileInfo,
    buttonFormSave,
    buttonFormAddCard
}
    from '../utils/constants.js';

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
            defaultCard.addItem(createCard(item, templateCardElement, handleCardClick), 'append');
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
            newCard.addItem(createCard(item, templateCardElement, handleCardClick), 'prepend');
        }
    },
        initialCardsContainer
    );
    newCard.renderItems()
};

const popupWithImage = new PopupWithImage(popupOpenImage);
popupWithImage.setEventListeners();

//обработчик открытия попапа по картинке
function handleCardClick(title, link) {
    popupWithImage.open(title, link)
};

const formNewCardValidation = new FormValidator(configFormSelector, formPopupNewCard);
const formProfileInfoValidation = new FormValidator(configFormSelector, formPopupProfileInfo);

formNewCardValidation.enableValidation();
formProfileInfoValidation.enableValidation();

const userInfo = new UserInfo({ userNameSelector:'.profile__name', userAboutSelector: '.profile__activity' })

const formNewCard = new PopupWithForm({
    popupSelector: popupNewCard,
    handleSubmitForm: (data) => {
        renderNewCard([data]);
        formNewCard.close()
    }
})
formNewCard.setEventListeners();


//слушатель кнопки добавления новой карточки
buttonAddNewCard.addEventListener('click', function (evt) {
    formNewCardValidation.cleanErrorMessage();
    formNewCard.open();
    formNewCardValidation.disabledButton(buttonFormAddCard);
});

const formProfileInfo = new PopupWithForm({
    popupSelector: popupProfileInfo,
    handleSubmitForm: (dataInput) => {
        userInfo.setUserInfo(dataInput);
        formProfileInfo.close()
    }
})
formProfileInfo.setEventListeners();

//внесение данных пользователя со страницы в поля формы
function setInputValues() {
    nameInput.value = userInfo.getUserInfo().user;
    aboutInput.value = userInfo.getUserInfo().about;
}

//слушатель кнопки редактирования профиля
buttonEditProfileInfo.addEventListener('click', function (evt) {
    formProfileInfoValidation.cleanErrorMessage()
    formProfileInfo.open();
    setInputValues()
    formProfileInfoValidation.enabledButton(buttonFormSave);
});