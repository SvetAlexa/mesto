import defaultImage from '../../images/defaultImage.jpg'
import defaultPhoto from '../../images/defaultPhoto.jpg'

export default class Card {
    constructor({ data, handleErrorImage, handleImageClick, }, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        //this._handleLikeClick = handleLikeClick;
        this._handleErrorImage = handleErrorImage;
        this._handleImageClick = handleImageClick;
        //this._handleRemoveButtonClick = handleRemoveButtonClick;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

        return cardElement;
    }

    //обработчик лайка карточки
    _handleLikeClick() {
        this._likeButton.classList.toggle('element__likes_is_active');
    }

    //обработчик кнопки удаления карточки
    _handleRemoveButtonClick() {
        this._element.remove();
    }

    _setEventListeners() {
        this._likeButton = this._element.querySelector('.element__likes');

        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick();
        })
        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._handleRemoveButtonClick();
        })
        this._cardImage.addEventListener('error', () => {
            this._handleErrorImage();
            this._cardImage.src = defaultImage;
            console.log('ошибка при загрузки картинки', this._link)
        })
        this._cardImage.addEventListener('click', () => {
            this._handleImageClick();
        })
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.element__image');
        this._cardTitle = this._element.querySelector('.element__title');

        this._cardTitle.textContent = this._name;
        this._cardImage.alt = this._name;
        this._cardImage.src = this._link;





        this._setEventListeners();

        return this._element;
    }
}