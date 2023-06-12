import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleSubmitForm }) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
    }

    close() {
        super.close();
        this._formElement.reset();
    }

    _getInputValues() {
        this._formValues = {};

        this._inputList = this._popupSelector.querySelectorAll('.popup__input');

        this._inputList.forEach((input) => {
            console.log(input.value)

            this._formValues[input.name] = input.value;

        })
        console.log(this._formValues)
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._formElement = this._popupSelector.querySelector('.popup__form')

        this._formElement.addEventListener('submit', (evt) => {
            console.log('сработало')
            evt.preventDefault();
            this._handleSubmitForm(this._getInputValues());
        });

    }
}