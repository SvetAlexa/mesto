import Popup from "./Popup.js"

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, { handleConfirmationDelete }) {
        super(popupSelector);
        this._handleConfirmationDelete = handleConfirmationDelete;
    }

    open(data) {
        super.open();
        this._data = data;
    }

    setEventListeners() {
        super.setEventListeners();

        this._buttonConfirmation = this._popupSelector.querySelector('.popup__button-confirmation');
        this._buttonConfirmation.addEventListener('click', () => {
            this._handleConfirmationDelete(this._data);
            this.close()
        })
    }
}
