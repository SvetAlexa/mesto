export const initialCards = [
    {
        link: 'https://images.unsplash.com/photo-1644543419167-2cc7a5738665?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8JUQwJUExJUQwJUI4JUQxJTg1JUQwJUJFJUQxJTgyJUQxJThEJTIwJUQwJTkwJUQwJUJCJUQwJUI4JUQwJUJEJUQxJThDfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        title: 'Сихотэ-Алинь Приморский край',
    },
    {
        link: 'https://images.unsplash.com/photo-1624719961119-ca670af4a20b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
        title: 'Сулакский каньон Дагестан',
    },
    {
        link: 'https://images.unsplash.com/photo-1660026671516-21658a9c2c7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8JUQwJUI0JUQwJUJFJUQwJUJCJUQwJUI4JUQwJUJEJUQwJUIwJTIwJUQwJUI0JUQxJTgzJUQxJTg1JUQwJUJFJUQwJUIyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        title: 'Чечкыш (Долина горных духов) Горный Алтай',
    },
    {
        link: 'https://images.unsplash.com/photo-1614000531402-74cca389903f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fCVEMCVCMSVEMCVCMCVEMCVCOSVEMCVCQSVEMCVCMCVEMCVCQnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        title: 'Байкал',
    },
    {
        link: 'https://images.unsplash.com/photo-1634665610480-073d92470559?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fCVEMCVCNCVEMCVCRSVEMCVCQyVEMCVCMSVEMCVCMCVEMCVCOXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        title: 'Домбай Ущелье Аманауз',
    },
    {
        link: 'https://images.unsplash.com/photo-1627329904799-607897b1eb60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fCVEMCVBRCVEMCVCQiVEMSU4QyVEMCVCMSVEMSU4MCVEMSU4MyVEMSU4MXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        title: 'Карачаево-Черкесия Северный Зеленчукский храм',
    }
];

export const initialCardsContainer = '.elements__lists';
export const templateCardElement = '#element-item-template';

export const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupProfileInfo = document.querySelector('.popup_type_edit');
export const popupOpenImage = document.querySelector('.popup_type_image');

export const formPopupNewCard = document.querySelector('.popup__form_type_new-card');
export const formPopupProfileInfo = document.querySelector('.popup__form_type_edit');

export const nameInput = formPopupProfileInfo.querySelector('.popup__input_value_name');
export const aboutInput = formPopupProfileInfo.querySelector('.popup__input_value_activity');

export const buttonAddNewCard = document.querySelector('.profile__add-button');
export const buttonEditProfileInfo = document.querySelector('.profile__edit-button');

export const buttonFormSave = document.querySelector('.popup__button-sumbit_save');
export const buttonFormAddCard = document.querySelector('.popup__button-sumbit_create');

export const configFormSelector = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-sumbit',
    inactiveButtonClass: 'popup__button-sumbit_is-invalid',
    inputErrorClass: 'popup__input_is-invalid',
    errorClass: '.error'
}
