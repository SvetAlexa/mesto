import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleSubmitForm }) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;

        this._formElement = this._popupElement.querySelector('.popup__form');
        this._inputList = this._popupElement.querySelectorAll('.popup__input');
        this._buttonSubmit = this._popupElement.querySelector('.popup__button-sumbit');
        this._buttonSubmitText = this._buttonSubmit.textContent;
    }

    close() {
        super.close();
        this._formElement.reset();
    }

    renderLoading(isLoading, loadingText) {
        if (isLoading) {
            this._buttonSubmit.textContent = loadingText;
        } else {
            this._buttonSubmit.textContent = this._buttonSubmitText;
        }
    }

    _getInputValues() {
        const formValues = {};

        this._inputList.forEach((input) => {
            formValues[input.name] = input.value;
        })
        return formValues;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        })
    }

    setEventListeners() {
        super.setEventListeners();

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitForm(this._getInputValues());
        });
    }
}