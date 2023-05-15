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

const buttonsClosePopup = document.querySelectorAll('.popup__close-button');

const template = document.querySelector('#element-item-template');

const imagePopup = document.querySelector('.popup__image');
const titlePopup = document.querySelector('.popup__caption');

const createNewCard = (name, link) => {
    const li = template.content.querySelector('.element').cloneNode(true);

    const titleElement = li.querySelector('.element__title');
    const imageElement = li.querySelector('.element__image');

    titleElement.textContent = name;
    imageElement.alt = name;
    imageElement.src = link;

    li.querySelector('.element__delete').addEventListener('click', () => {
        li.remove();
    });

    const likeButton = li.querySelector('.element__likes');

    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('element__likes_is_active');
    });

    imageElement.addEventListener('click', () => {
        imagePopup.src = imageElement.src;
        imagePopup.alt = imageElement.alt;
        titlePopup.textContent = titleElement.textContent;
        openPopup(popupOpenImage);
    });

    return li;
};

const listCards = initialCards.map((card) => {
    const name = card.name;
    const link = card.link;

    const cardElement = createNewCard(name, link);

    return cardElement;
});

initialCardsContainer.append(...listCards);

const renderNewCard = (name, link) => {
    initialCardsContainer.prepend(createNewCard(name, link));
};

const openPopup = (popup) => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEsc);
    popup.addEventListener('click', closePopupByOverlay);
};

const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEsc);
    popup.removeEventListener('click', closePopupByOverlay);
};

buttonsClosePopup.forEach((item) => {
    item.addEventListener('click', (evt) => {
        const closeButton = evt.target;
        closePopup(closeButton.closest('.popup'));
    });
});

const closePopupByEsc = (evt) => {
    const key = evt.key;
    popups.forEach((item) => {
        if (key == 'Escape' && item.classList.contains('popup_is-opened')) {
            closePopup(item);
        }
    });
}

const closePopupByOverlay = (evt) => {
    popups.forEach((item) => {
        if (evt.target === evt.currentTarget && item.classList.contains('popup_is-opened')) {
            closePopup(item);
        }
    });
};

const handleFormSubmitNewCard = (evt) => {
    evt.preventDefault();
    const name = titleInput.value;
    const link = linkInput.value;
    renderNewCard(name, link);
    setValidation();
    console.log('форма отправлена');
    closePopup(popupNewCard);
};

formPopupNewCard.addEventListener('submit', handleFormSubmitNewCard);

buttonAddNewCard.addEventListener('click', function (evt) {
    openPopup(popupNewCard);
    titleInput.value = '';
    linkInput.value = '';
});

buttonEditProfileInfo.addEventListener('click', function (evt) {
    openPopup(popupProfileInfo);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    toggleButtonStatus(buttonFormSave, true);
});

function handleFormSubmitEdit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    setValidation();
    console.log('форма отправлена');
    closePopup(popupProfileInfo);
};

formPopupProfileInfo.addEventListener('submit', handleFormSubmitEdit);
