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
                        console.error(`Произошла ошибка: ${err}`);
                    })
            }
        },
        templateSelector)
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
            api.removeCard(card.data._id)
                .then(() => {
                    card.removeCard();
                    popupWithConfirmation.close();
                })
                .catch((err) => {
                    console.error(`Произошла ошибка: ${err}`);
                })
        },
    }
);

popupWithConfirmation.setEventListeners();

const formValidators = {}

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement)

        const formName = formElement.getAttribute('name')
        formValidators[formName] = validator; //записываем в объект формы под именем
        validator.enableValidation();
    });
};

enableValidation(configFormSelector); //создаем экземпляры валидаторов всех форм

const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userAboutSelector: '.profile__activity',
    userAvatarSelector: '.profile__avatar'
})

function handleSubmit(request, popupInstance, loadingText = "Сохранение...") {
    popupInstance.renderLoading(true, loadingText);
    request()
        .then(() => {
            popupInstance.close()
        })
        .catch((err) => {
            console.error(`Произошла ошибка: ${err}`);
        })
        .finally(() => {
            popupInstance.renderLoading(false);
        });
}

function handleNewCardFormSubmit(data) {
    function makeRequest() {
        return api.createNewCard(data)
            .then((cardData) => {
                cardSection.addItem(createCard(cardData, templateCardElement), 'prepend');
            });
    }
    handleSubmit(makeRequest, newCardPopup);
}

const newCardPopup = new PopupWithForm({
    popupSelector: popupNewCard,
    handleSubmitForm: (data) => {
        handleNewCardFormSubmit(data);
    }
})

newCardPopup.setEventListeners();

//слушатель кнопки добавления новой карточки
buttonAddNewCard.addEventListener('click', function (evt) {
    formValidators['new-card-form'].cleanErrorMessage();
    newCardPopup.open();
    formValidators['new-card-form'].disabledButton();
});

function handleProfileFormSubmit(data) {
    function makeRequest() {
        return api.editUserInfo(data)
            .then((userData) => {
                userInfo.setUserInfo(userData);
            });
    }
    handleSubmit(makeRequest, profilePopup);
}

const profilePopup = new PopupWithForm({
    popupSelector: popupProfileInfo,
    handleSubmitForm: (data) => {
        data.name = data.user;
        handleProfileFormSubmit(data);
    }
})

profilePopup.setEventListeners();


//слушатель кнопки редактирования профиля
buttonEditProfileInfo.addEventListener('click', function () {
    formValidators['profile-form'].cleanErrorMessage()
    profilePopup.open();
    profilePopup.setInputValues(userInfo.getUserInfo());
    formValidators['profile-form'].enabledButton();
});

function handleAvatarFormSubmit(data) {
    function makeRequest() {
        return api.editAvatarPhoto(data)
            .then((userData) => {
                userInfo.setUserInfo(userData);
            });
    }
    handleSubmit(makeRequest, avatarPopup);
}

const avatarPopup = new PopupWithForm({
    popupSelector: popupProfileAvatar,
    handleSubmitForm: (data) => {
        handleAvatarFormSubmit(data);
    }
})

avatarPopup.setEventListeners();

//слушатель кнопки редактирования аватара
buttonEditAvatarPhoto.addEventListener('click', () => {
    formValidators['avatar-form'].cleanErrorMessage()
    avatarPopup.open();
    avatarPopup.setInputValues(userInfo.getAvatarInfo());
    formValidators['avatar-form'].enabledButton();
})

api.getAllInfo()
    .then(([userData, cardArray]) => {
        userInfo.setUserInfo(userData);
        userId = userData._id;
        cardSection.renderItems(cardArray);
    })
    .catch((err) => {
        console.error(`${err}`);
    })