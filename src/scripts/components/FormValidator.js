export default class FormValidator {
    constructor(selectorsConfig, formElement) {
        this._inputSelector = selectorsConfig.inputSelector;
        this._submitButtonSelector = selectorsConfig.submitButtonSelector;
        this._inactiveButtonClass = selectorsConfig.inactiveButtonClass;
        this._inputErrorClass = selectorsConfig.inputErrorClass;
        this._formElement = formElement;

        this._inputsList = this._formElement.querySelectorAll(this._inputSelector);
        this._submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    _addError(inputElement, errorElement) {
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    _deleteError(inputElement, errorElement) {
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
    };

    disabledButton() {
        this._submitButtonElement.disabled = true;
        this._submitButtonElement.classList.add(this._inactiveButtonClass);
    };

    enabledButton() {
        this._submitButtonElement.disabled = false;
        this._submitButtonElement.classList.remove(this._inactiveButtonClass);
    };

    _toggleButtonStatus() {
        if (!this._formElement.checkValidity()) {
            this.disabledButton();
        } else {
            this.enabledButton();
        }
    };

    _checkInputValidity(inputElement) {
        const inputValidity = inputElement.validity.valid;
        const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);

        if (!errorElement) return;

        if (!inputValidity) {
            this._addError(inputElement, errorElement);
        } else {
            this._deleteError(inputElement, errorElement);
        }
    };


    _setEventListener() {
        this._toggleButtonStatus();

        this._inputsList.forEach((inputItem) => {
            inputItem.addEventListener('input', () => {
                this._toggleButtonStatus();
                this._checkInputValidity(inputItem);
            });
        });
    }

    cleanErrorMessage() {
        this._inputsList.forEach((inputItem) => {
            const errorItem = this._formElement.querySelector(`#${inputItem.name}-error`);
            this._deleteError(inputItem, errorItem);
        });
    };

    enableValidation() {
        this._setEventListener();
    };
}