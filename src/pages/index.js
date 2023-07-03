import './index.css';

import defaultImage from '../images/defaultImage.jpg'

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api';

import {
    configFormSelector,
    config
}
    from '../scripts/utils/constants.js';

import {
    initialCardsContainer,
    templateCardElement,
    popupNewCard,
    popupProfileInfo,
    popupOpenImage,
    popupConfirmationDelete,
    popupProfileAvatar,
    formPopupNewCard,
    formPopupProfileInfo,
    formPopupAvatarPhoto,
    buttonAddNewCard,
    buttonEditProfileInfo,
    buttonEditAvatarPhoto
}
    from '../scripts/utils/elements.js'

const api = new Api(config);

let userId;

//функция создания новой карточки
function createCard(item, templateSelector) {
    const card = new Card(
        {
            data: item,
            userId: userId,
            handleErrorImage: () => {
                item.link = defaultImage;
            },
            handleImageClick: () => {
                popupWithImage.open(item);
            },
            handleRemoveButtonClick: (card) => {
                popupWithConfirmation.open(card);
            },
            handleLikeClick: (instance) => {
                api.swapLike(instance.getCardId(), instance.isLiked())
                    .then(cardData => {
                        instance.setDataLikes(cardData)
                    })
                    .catch((err) => {
                        console.log('Произошла ошибка', err)
                    })
            },
            templateSelector
        })
    const cardElement = card.generateCard();
    card.swapTrashButton(card.checkUserId());

    return cardElement;
}

const cardSection = new Section(
    {
        renderer: (item) => {
            cardSection.addItem(createCard(item, templateCardElement), 'append');
        }
    },
    initialCardsContainer)

const popupWithImage = new PopupWithImage(popupOpenImage);

popupWithImage.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation(popupConfirmationDelete,
    {
        handleConfirmationDelete: (card) => {
            api.removeCard(card._data._id)
                .then(() => card.removeCard())
                .catch((err) => {
                    console.log('Произошла ошибка', err)
                })
        },
    }
);

popupWithConfirmation.setEventListeners();

const formNewCardValidation = new FormValidator(configFormSelector, formPopupNewCard);
const formProfileInfoValidation = new FormValidator(configFormSelector, formPopupProfileInfo);
const formProfileAvatarValidation = new FormValidator(configFormSelector, formPopupAvatarPhoto);

formNewCardValidation.enableValidation();
formProfileInfoValidation.enableValidation();
formProfileAvatarValidation.enableValidation();

const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userAboutSelector: '.profile__activity',
    userAvatarSelector: '.profile__avatar'
})

const formNewCard = new PopupWithForm({
    popupSelector: popupNewCard,
    handleSubmitForm: (data) => {
        formNewCard.swapButtonSubmitText('Сохранение...');
        api.createNewCard(data)
            .then(function (dataFromServer) {
                cardSection.addItem(createCard(dataFromServer, templateCardElement), 'prepend');
            })
            .catch((err) => {
                console.log('Произошла ошибка', err);
            })
            .finally(() => {
                formNewCard.swapButtonSubmitText('Создать');
            })
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
    handleSubmitForm: (data) => {
        formProfileInfo.swapButtonSubmitText('Сохранение...');
        api.editUserInfo(data)
            .then(function (dataFromServer) {
                userInfo.setUserInfo(dataFromServer);
            })
            .catch((err) => {
                console.log('Произошла ошибка', err);
            })
            .finally(() => {
                formProfileInfo.swapButtonSubmitText('Сохранить');
            })
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

const formUpdatedAvatar = new PopupWithForm({
    popupSelector: popupProfileAvatar,
    handleSubmitForm: (data) => {
        formUpdatedAvatar.swapButtonSubmitText('Сохранение...');
        api.editAvatarPhoto(data)
            .then(function (dataFromServer) {
                userInfo.setAvatarImage(dataFromServer);
            })
            .catch((err) => {
                console.log('Произошла ошибка', err);
            })
            .finally(() => {
                formUpdatedAvatar.swapButtonSubmitText('Сохранить');
            })
    }
})

formUpdatedAvatar.setEventListeners();

//слушатель кнопки редактирования аватара
buttonEditAvatarPhoto.addEventListener('click', () => {
    formProfileAvatarValidation.cleanErrorMessage()
    formUpdatedAvatar.open();
    formUpdatedAvatar.setInputValues(userInfo.getAvatarInfo());
    formProfileAvatarValidation.enabledButton();
})

api.getAllInfo()
    .then(([userData, cardArray]) => {
        userInfo.setUserInfo(userData);
        userInfo.setAvatarImage(userData);
        userId = userData._id;
        cardSection.renderItems(cardArray);
    })
    .catch((err) => {
        console.log('Произошла ошибка', err);
    })