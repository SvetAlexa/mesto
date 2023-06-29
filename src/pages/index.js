import './index.css';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api';

import {
    initialCardsContainer,
    configFormSelector,
    templateCardElement,
    popupNewCard,
    popupProfileInfo,
    popupOpenImage,
    config
}
    from '../scripts/utils/constants.js';

import {
    formPopupNewCard,
    formPopupProfileInfo,
    nameInput,
    aboutInput,
    buttonAddNewCard,
    buttonEditProfileInfo
}
    from '../scripts/utils/elements.js'

//функция создания новой карточки
function createCard(data, handleImageClick, templateSelector) {
    const card = new Card(data, handleImageClick, templateSelector);
    return card.generateCard();
}

const cardSection = new Section(renderCard, initialCardsContainer);

function renderCard(data) {
    cardSection.addItem(createCard({ data, handleImageClick }, templateCardElement), 'append');
 }

const popupWithImage = new PopupWithImage(popupOpenImage);
popupWithImage.setEventListeners();

//обработчик открытия попапа по картинке
function handleImageClick(data) {
    console.log(data)
    popupWithImage.open(data)
};

const formNewCardValidation = new FormValidator(configFormSelector, formPopupNewCard);
const formProfileInfoValidation = new FormValidator(configFormSelector, formPopupProfileInfo);

formNewCardValidation.enableValidation();
formProfileInfoValidation.enableValidation();

const userInfo = new UserInfo({ userNameSelector: '.profile__name', userAboutSelector: '.profile__activity' })

const formNewCard = new PopupWithForm({
    popupSelector: popupNewCard,
    handleSubmitForm: (data) => {
        cardSection.addItem(createCard(data, templateCardElement, handleImageClick), 'prepend')
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
    }
})
formProfileInfo.setEventListeners();

//слушатель кнопки редактирования профиля
buttonEditProfileInfo.addEventListener('click', function (evt) {
    formProfileInfoValidation.cleanErrorMessage()
    formProfileInfo.open();
    formProfileInfo.setInputValues(userInfo.getUserInfo());
    formProfileInfoValidation.enabledButton();
});

const api = new Api(config);

api.getInitialCards()
    .then(result => {
        // console.log(result);
        // console.log(result.forEach(item => {
        //     console.log(item)
        // })
        // )
        cardSection.renderItems(result)
    })
// .catch((err) => {
//     console.log(err);
// })