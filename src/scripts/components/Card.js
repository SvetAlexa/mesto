import defaultImage from '../../images/defaultImage.jpg'

export default class Card {
    constructor({ data, userId, handleErrorImage, handleImageClick, handleRemoveButtonClick, handleLikeClick }, templateSelector) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._userId = userId;
        this._handleErrorImage = handleErrorImage;
        this._handleImageClick = handleImageClick;
        this._handleRemoveButtonClick = handleRemoveButtonClick;
        this._handleLikeClick = handleLikeClick;
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

    // //обработчик кнопки удаления карточки
    removeCard() {
        this._element.remove();
        this._element = 'null';
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick(this);
        })
        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._handleRemoveButtonClick(this);
        })
        this._cardImage.addEventListener('error', () => {
            this._handleErrorImage();
            this._cardImage.src = defaultImage;
        })
        this._cardImage.addEventListener('click', () => {
            this._handleImageClick();
        })
    }

    isLiked() {
        return this._data.likes.some((item) => {
            return item._id === this._userId;
        })
    }

    _updateLikeCounter() {
        this._cardLikeCounter.textContent = this._data.likes.length;

        if (this.isLiked()) {
            this._likeButton.classList.add('element__likes_is_active');
        } else {
            this._likeButton.classList.remove('element__likes_is_active');
        }
    }

    setDataLikes(data) {
        this._data.likes = data.likes;
        this._updateLikeCounter();
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.element__image');
        this._cardTitle = this._element.querySelector('.element__title');
        this._cardLikeCounter = this._element.querySelector('.element__likes-counter');
        this._likeButton = this._element.querySelector('.element__likes');
        this._trashButton = this._element.querySelector('.element__delete');

        this._cardTitle.textContent = this._name;
        this._cardImage.alt = this._name;
        this._cardImage.src = this._link;

        this._setEventListeners();

        this._updateLikeCounter();

        return this._element;
    }

    getCardId() {
        return this._data._id;
    }

    checkUserId() {
        return (this._userId === this._data.owner._id)
    }

    swapTrashButton(status) {
        if (!status)
            this._trashButton.remove();
    }
}