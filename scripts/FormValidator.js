export const configFormSelector = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-sumbit',
    inactiveButtonClass: 'popup__button-sumbit_is-invalid',
    inputErrorClass: 'popup__input_is-invalid',
    errorClass: '.error'
}

export class FormValidator {
    constructor(selectorsConfig, formElement) {
        this._formSelector = selectorsConfig.formSelector;
        this._inputSelector = selectorsConfig.inputSelector;
        this._submitButtonSelector = selectorsConfig.submitButtonSelector;
        this._inactiveButtonClass = selectorsConfig.inactiveButtonClass;
        this._inputErrorClass = selectorsConfig.inputErrorClass;
        this._errorClass = selectorsConfig.errorClass;
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

    disabledButton(buttonElement) {
        buttonElement.disabled = 'disabled';
        buttonElement.classList.add(this._inactiveButtonClass);
    };

    enabledButton(buttonElement) {
        buttonElement.disabled = false;
        buttonElement.classList.remove(this._inactiveButtonClass);
    };

    _toggleButtonStatus(buttonElement, status) {
        if (!status) {
            this.disabledButton(buttonElement);
        } else {
            this.enabledButton(buttonElement);
        }
    };

    cleanErrorMessage() {
        this._inputsList.forEach((inputItem) => {
            const errorItem = this._formElement.querySelector(`#${inputItem.name}-error`);
            this._deleteError(inputItem, errorItem);
        });
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
        this._toggleButtonStatus(this._submitButtonElement, this._formElement.checkValidity());

        this._inputsList.forEach((inputItem) => {
            inputItem.addEventListener('input', () => {
                this._toggleButtonStatus(this._submitButtonElement, this._formElement.checkValidity());
                this._checkInputValidity(inputItem);
            });
        });
    }

    enableValidation() {
        this._setEventListener();
    };
}