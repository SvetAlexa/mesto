export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;

        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupSelector.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupSelector.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        const key = evt.key;
        if (key === 'Escape') {
            this.close();
            console.log('попап закрыт по кнопке Escape')
        }
    }

    _handleEscButtonClick(evt) {
        if (evt.target === this._buttonClosePopup) {
            this.close();
            console.log('попап закрыт по крестику')
        }
    }

    _handleOverlayClick(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
            console.log('попап закрыт по оверлею')
        }
    }

    setEventListeners() {
        this._buttonClosePopup = this._popupSelector.querySelector('.popup__close-button');

        this._buttonClosePopup.addEventListener('click', this._handleEscButtonClick.bind(this));

        this._popupSelector.addEventListener('mousedown', this._handleOverlayClick.bind(this));
    }

}