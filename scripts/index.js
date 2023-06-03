import { initialCards, Card } from './Card.js';
import { configFormSelector, FormValidator } from './FormValidator.js';

const initialCardsContainer = document.querySelector('.elements__lists');

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

//обработчик открытия попапа по картинке
function handleImageClick(name, link) {
    imagePopup.src = link;
    imagePopup.alt = name;
    titlePopup.textContent = name;
    openPopup(popupOpenImage);
}

//отрисовка карточек "из коробки"
initialCards.forEach((item) => {
    const card = new Card(item, '#element-item-template', handleImageClick);
    const cardElement = card.generateCard();
    initialCardsContainer.append(cardElement);
});

function renderNewCard(dataCard) {
    const card = new Card(dataCard, '#element-item-template', handleImageClick);
    const cardElement = card.generateCard();
    initialCardsContainer.prepend(cardElement);
};

const openPopup = (popup) => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEsc);
};

const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEsc);
};

//закрытие попапов по нажатию на крестик
buttonsClosePopup.forEach((item) => {
    item.addEventListener('click', (evt) => {
        const closeButton = evt.target;
        closePopup(closeButton.closest('.popup'));
    });
});

const closePopupByEsc = (evt) => {
    const key = evt.key;
    if (key === 'Escape') {
        const activePopup = document.querySelector('.popup_is-opened');
        closePopup(activePopup);
    }
};

//закрытие попапов по overlay
popups.forEach((item) => {
    item.addEventListener('mousedown', (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(evt.currentTarget);
        }
    });
});

const formNewCardValidation = new FormValidator(configFormSelector, formPopupNewCard);
const formProfileInfoValidation = new FormValidator(configFormSelector, formPopupProfileInfo);

formNewCardValidation.enableValidation();
formProfileInfoValidation.enableValidation();

const handleFormSubmitNewCard = (evt) => {
    evt.preventDefault();
    const dataCard = {
        name: titleInput.value,
        link: linkInput.value
    }
    renderNewCard(dataCard);
    closePopup(popupNewCard);
};

formPopupNewCard.addEventListener('submit', handleFormSubmitNewCard);

//слушатель кнопки добавления новой карточки
buttonAddNewCard.addEventListener('click', function (evt) {
    formNewCardValidation.cleanErrorMessage();
    openPopup(popupNewCard);
    titleInput.value = '';
    linkInput.value = '';
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

function handleFormSubmitEdit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfileInfo);
};

formPopupProfileInfo.addEventListener('submit', handleFormSubmitEdit);