export const initialCards = [
    {
        link: 'https://images.unsplash.com/photo-1644543419167-2cc7a5738665?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8JUQwJUExJUQwJUI4JUQxJTg1JUQwJUJFJUQxJTgyJUQxJThEJTIwJUQwJTkwJUQwJUJCJUQwJUI4JUQwJUJEJUQxJThDfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        name: 'Сихотэ-Алинь Приморский край',
    },
    {
        link: 'https://images.unsplash.com/photo-1598535348425-e76a7cc312d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8JUQwJUExJUQxJTgzJUQwJUJCJUQwJUIwJUQwJUJBJUQxJTgxJUQwJUJBJUQwJUI4JUQwJUI5JTIwJUQwJUJBJUQwJUIwJUQwJUJEJUQxJThDJUQwJUJFJUQwJUJEfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        name: 'Сулакский каньон Дагестан',
    },
    {
        link: 'https://images.unsplash.com/photo-1660026671516-21658a9c2c7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8JUQwJUI0JUQwJUJFJUQwJUJCJUQwJUI4JUQwJUJEJUQwJUIwJTIwJUQwJUI0JUQxJTgzJUQxJTg1JUQwJUJFJUQwJUIyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        name: 'Чечкыш (Долина горных духов) Горный Алтай',
    },
    {
        link: 'https://images.unsplash.com/photo-1614000531402-74cca389903f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fCVEMCVCMSVEMCVCMCVEMCVCOSVEMCVCQSVEMCVCMCVEMCVCQnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        name: 'Байкал',
    },
    {
        link: 'https://images.unsplash.com/photo-1634665610480-073d92470559?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fCVEMCVCNCVEMCVCRSVEMCVCQyVEMCVCMSVEMCVCMCVEMCVCOXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        name: 'Домбай Ущелье Аманауз',
    },
    {
        link: 'https://images.unsplash.com/photo-1627329904799-607897b1eb60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fCVEMCVBRCVEMCVCQiVEMSU4QyVEMCVCMSVEMSU4MCVEMSU4MyVEMSU4MXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        name: 'Карачаево-Черкесия Сентинский храм',
    },
];

export class Card {
    constructor(data, templateSelector, handleImageClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleImageClick = handleImageClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

        return cardElement;
    }

    //обработчик лайка карточки
    _handleLikeClick() {
        this._element.querySelector('.element__likes').classList.toggle('element__likes_is_active');
    }

    //обработчик кнопки удаления карточки
    _handleRemoveButtonClick() {
        this._element.remove();
    }

    _setEventListeners() {
        this._element.querySelector('.element__likes').addEventListener('click', () => {
            this._handleLikeClick();
        })
        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._handleRemoveButtonClick();
        })
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleImageClick(this._name, this._link);
        })
    }

    generateCard() {
        this._element = this._getTemplate();

        this._setEventListeners();

        const titleElement = this._element.querySelector('.element__title');
        const imageElement = this._element.querySelector('.element__image');

        titleElement.textContent = this._name;
        imageElement.alt = this._name;
        imageElement.src = this._link;

        return this._element;
    }
}