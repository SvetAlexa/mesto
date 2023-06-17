import './index.css';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

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
    from '../scripts/utils/constants.js';

//функция создания новой карточки
function createCard(data, templateSelector, handleImageClick) {
    const card = new Card(data, templateSelector, handleImageClick);
    return card.generateCard();
}

const section = new Section({
        items: initialCards,
        renderer: (item) => {
            section.addItem(createCard(item, templateCardElement, handleCardClick), 'append');
        }
    },
        initialCardsContainer
    );

section.renderItems();

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

const userInfo = new UserInfo({ userNameSelector: '.profile__name', userAboutSelector: '.profile__activity' })

const formNewCard = new PopupWithForm({
    popupSelector: popupNewCard,
    handleSubmitForm: (data) => {
        section.addItem(createCard(data, templateCardElement, handleCardClick), 'prepend')
    }
})
formNewCard.setEventListeners();


//слушатель кнопки добавления новой карточки
buttonAddNewCard.addEventListener('click', function (evt) {
    formNewCardValidation.cleanErrorMessage();
    formNewCard.open();
    formNewCardValidation.disabledButton();
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
function setInputsFormProfileInfo() {
    const dataUserProfile = userInfo.getUserInfo()
    nameInput.value = dataUserProfile.user;
    aboutInput.value = dataUserProfile.about;
}

//слушатель кнопки редактирования профиля
buttonEditProfileInfo.addEventListener('click', function (evt) {
    formProfileInfoValidation.cleanErrorMessage()
    formProfileInfo.open();
    setInputsFormProfileInfo()
    formProfileInfoValidation.enabledButton();
});