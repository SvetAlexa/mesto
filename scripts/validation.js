


const addError = function (inputElement, errorElement) {
    inputElement.classList.add('popup__input_is-invalid');
    errorElement.textContent = inputElement.validationMessage;
};

const deleteError = function (inputElement, errorElement) {
    inputElement.classList.remove('popup__input_is-invalid');
    errorElement.textContent = inputElement.validationMessage;
};

const disabledButton = function (buttonElement) {
    buttonElement.disabled = 'disabled';
    buttonElement.classList.add('popup__button-sumbit_is-invalid');
};

const enabledButton = function (buttonElement) {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button-sumbit_is-invalid');
};

const toggleButtonStatus = function (buttonElement, status) {
    if (!status) {
        disabledButton(buttonElement);
    } else {
        enabledButton(buttonElement);
    }
};

const checkInputValidity = function (inputElement, formElement) {
    console.log(inputElement.validity);
    console.log(inputElement.validationMessage);
    const inputValidity = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    console.log(errorElement);

    if (!errorElement) return;

    if (!inputValidity) {
        addError(inputElement, errorElement);
    } else {
        deleteError(inputElement, errorElement);
    }


}

const setEventListener = function (formElement) {
    const inputsList = formElement.querySelectorAll('.popup__input');
    const submitButtonElement = formElement.querySelector('.popup__button-sumbit');

    toggleButtonStatus(submitButtonElement, formElement.checkValidity());
    console.log(formElement.checkValidity());

    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        console.log('отправлено');
    });

    inputsList.forEach((inputItem) => {
        inputItem.addEventListener('input', () => {
            checkInputValidity(inputItem, formElement);
            toggleButtonStatus(submitButtonElement, formElement.checkValidity());
        })
    });

};

const setValidation = function () {
    const formsList = document.querySelectorAll('.popup__form');
    formsList.forEach((formItem) => {
        setEventListener(formItem)
    });
};

setValidation();