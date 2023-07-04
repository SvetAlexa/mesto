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
                    .catch(console.error)
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
            console.log(card)
            api.removeCard(card.data._id)
                .then(() => {
                    card.removeCard();
                    popupWithConfirmation.close();
                })
                .catch(console.error)
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

const formNewCard = new PopupWithForm({
    popupSelector: popupNewCard,
    handleSubmitForm: (data) => {
        formNewCard.renderLoading(true);
        api.createNewCard(data)
            .then(function (dataFromServer) {
                cardSection.addItem(createCard(dataFromServer, templateCardElement), 'prepend');
                formNewCard.close();
            })
            .catch(console.error)
            .finally(() => {
                formNewCard.renderLoading(false);
            })
    }
})

formNewCard.setEventListeners();

//слушатель кнопки добавления новой карточки
buttonAddNewCard.addEventListener('click', function (evt) {
    formValidators['new-card-form'].cleanErrorMessage();
    formNewCard.open();
    formValidators['new-card-form'].disabledButton();
});

const formProfileInfo = new PopupWithForm({
    popupSelector: popupProfileInfo,
    handleSubmitForm: (data) => {
        data.name = data.user
        formProfileInfo.renderLoading(true);
        api.editUserInfo(data)
            .then(function (dataFromServer) {
                userInfo.setUserInfo(dataFromServer);
                formProfileInfo.close();
            })
            .catch(console.error)
            .finally(() => {
                formProfileInfo.renderLoading(false);
            })
    }
})

formProfileInfo.setEventListeners();


//слушатель кнопки редактирования профиля
buttonEditProfileInfo.addEventListener('click', function (evt) {
    formValidators['profile-form'].cleanErrorMessage()
    formProfileInfo.open();
    formProfileInfo.setInputValues(userInfo.getUserInfo());
    formValidators['profile-form'].enabledButton();
});

const formUpdatedAvatar = new PopupWithForm({
    popupSelector: popupProfileAvatar,
    handleSubmitForm: (data) => {
        formUpdatedAvatar.renderLoading(true);
        api.editAvatarPhoto(data)
            .then(function (dataFromServer) {
                userInfo.setUserInfo(dataFromServer);
                formUpdatedAvatar.close();
            })
            .catch(console.error)
            .finally(() => {
                formUpdatedAvatar.renderLoading(false);
            })
    }
})

formUpdatedAvatar.setEventListeners();

//слушатель кнопки редактирования аватара
buttonEditAvatarPhoto.addEventListener('click', () => {
    formValidators['avatar-form'].cleanErrorMessage()
    formUpdatedAvatar.open();
    formUpdatedAvatar.setInputValues(userInfo.getAvatarInfo());
    formValidators['avatar-form'].enabledButton();
})

api.getAllInfo()
    .then(([userData, cardArray]) => {
        userInfo.setUserInfo(userData);
        console.log(userData);
        console.log(cardArray);
        userId = userData._id;
        cardSection.renderItems(cardArray);
    })
    .catch(console.error)