import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleSubmitForm }) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        
        this._formElement = this._popupSelector.querySelector('.popup__form');
        this._inputList = this._popupSelector.querySelectorAll('.popup__input');
        this._buttonSubmit = this._popupSelector.querySelector('.popup__button-sumbit');
    }

    close() {
        super.close();
        this._formElement.reset();
    }

    swapButtonSubmitText(text) {
        console.log(this._buttonSubmit)
        this._buttonSubmit.textContent = text;
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
            this.close();
        });

    }
}