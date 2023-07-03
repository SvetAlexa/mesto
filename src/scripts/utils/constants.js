export const initialCardsContainer = '.elements__lists';
export const templateCardElement = '#element-item-template';

export const popupNewCard = '.popup_type_new-card';
export const popupProfileInfo = '.popup_type_edit';
export const popupOpenImage = '.popup_type_image';
export const popupConfirmationDelete = '.popup_type_delete';
export const popupProfileAvatar = '.popup_type_edit-avatar';

export const configFormSelector = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-sumbit',
    inactiveButtonClass: 'popup__button-sumbit_is-invalid',
    inputErrorClass: 'popup__input_is-invalid'
}

export const config = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-70',
    headers: {
        "content-type": "application/json",
        "authorization": "e120ef7b-11b8-4832-a4ab-a0449fb1174c"
    }
}