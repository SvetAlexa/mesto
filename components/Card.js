export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._title = data.title;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
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
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._title, this._link);
        })
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.element__image');
        this._cardTitle = this._element.querySelector('.element__title');

        this._setEventListeners();

        this._cardTitle.textContent = this._title;
        this._cardImage.alt = this._title;
        this._cardImage.src = this._link;

        return this._element;
    }
}