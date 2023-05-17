
const configFormSelector = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-sumbit',
    inactiveButtonClass: 'popup__button-sumbit_is-invalid',
    inputErrorClass: 'popup__input_is-invalid',
    errorClass: '.error'
}

const addError = function (inputElement, errorElement, config) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
};

const deleteError = function (inputElement, errorElement, config) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
};

const disabledButton = function (buttonElement, config) {
    buttonElement.disabled = 'disabled';
    buttonElement.classList.add(config.inactiveButtonClass);
};

const enabledButton = function (buttonElement, config) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
};

const toggleButtonStatus = function (buttonElement, status, config) {
    if (!status) {
        disabledButton(buttonElement, config);
    } else {
        enabledButton(buttonElement, config);
    }
};

const checkInputValidity = function (inputElement, formElement, config) {
    const inputValidity = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

    if (!errorElement) return;

    if (!inputValidity) {
        addError(inputElement, errorElement, config);
    } else {
        deleteError(inputElement, errorElement, config);
    }
};

const cleanErrorMessage = function (popup, config) {
    const inputsList = popup.querySelectorAll(config.inputSelector);

    inputsList.forEach((inputItem) => {
        const errorItem = popup.querySelector(`#${inputItem.name}-error`);
        deleteError(inputItem, errorItem, config);
    });
};

const setEventListener = function (formElement, config) {
    const inputsList = formElement.querySelectorAll(config.inputSelector);
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonStatus(submitButtonElement, formElement.checkValidity(), config);

    inputsList.forEach((inputItem) => {
        inputItem.addEventListener('input', () => {
            toggleButtonStatus(submitButtonElement, formElement.checkValidity(), config);
            checkInputValidity(inputItem, formElement, config);
        });
    });

};

const enableValidation = function (config) {
    const formsList = document.querySelectorAll(config.formSelector);
    formsList.forEach((formItem) => {
        setEventListener(formItem, config)
    });
};

enableValidation(configFormSelector);