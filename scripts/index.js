const initialCards = [
    {
        link: 'https://images.unsplash.com/photo-1644543419167-2cc7a5738665?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8JUQwJUExJUQwJUI4JUQxJTg1JUQwJUJFJUQxJTgyJUQxJThEJTIwJUQwJTkwJUQwJUJCJUQwJUI4JUQwJUJEJUQxJThDfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        name: 'Сихотэ-Алинь Приморский край',
    },
    {
        link: 'https://images.unsplash.com/photo-1598535348425-e76a7cc312d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8JUQwJUExJUQxJTgzJUQwJUJCJUQwJUIwJUQwJUJBJUQxJTgxJUQwJUJBJUQwJUI4JUQwJUI5JTIwJUQwJUJBJUQwJUIwJUQwJUJEJUQxJThDJUQwJUJFJUQwJUJEfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        name: 'Сулакский каньон Дагестан',
    },
    {
        link: 'https://images.unsplash.com/photo-1660026671516-21658a9c2c7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8JUQwJUI0JUQwJUJFJUQwJUJCJUQwJUI4JUQwJUJEJUQwJUIwJTIwJUQwJUI0JUQxJTgzJUQxJTg1JUQwJUJFJUQwJUIyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        name: 'Чечкыш (Долина горных духов) Горный Алтай',
    },
    {
        link: 'https://images.unsplash.com/photo-1614000531402-74cca389903f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fCVEMCVCMSVEMCVCMCVEMCVCOSVEMCVCQSVEMCVCMCVEMCVCQnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        name: 'Байкал',
    },
    {
        link: 'https://images.unsplash.com/photo-1634665610480-073d92470559?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fCVEMCVCNCVEMCVCRSVEMCVCQyVEMCVCMSVEMCVCMCVEMCVCOXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        name: 'Домбай Ущелье Аманауз',
    },
    {
        link: 'https://images.unsplash.com/photo-1627329904799-607897b1eb60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fCVEMCVBRCVEMCVCQiVEMSU4QyVEMCVCMSVEMSU4MCVEMSU4MyVEMSU4MXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        name: 'Карачаево-Черкесия Сентинский храм',
    },
];

const initialCardsContainer = document.querySelector('.elements__lists');

const addNewCardForm = document.querySelector('.popup__form_type_new-card');
const editProfileInfoForm = document.querySelector('.popup__form_type_edit');

const titleInput = addNewCardForm.querySelector('.popup__input_value_title');
const linkInput = addNewCardForm.querySelector('.popup__input_value_link');
const template = document.querySelector('#element-item-template');

const popupNewCard = document.querySelector('.popup_type_new-card');

const popupOpenButtonNewCard = document.querySelector('.profile__add-button');
const popupOpenButtonEdit = document.querySelector('.profile__edit-button');

const popupCloseButton = document.querySelectorAll('.popup__close-button');

const createNewCard = (name, link) => {
    const li = template.content
        .querySelector('.element').cloneNode(true); //копируем элемент li со всем сожержимым

    const textTitleElement = li.querySelector('.element__title'); //находим заголовок карточки
    textTitleElement.textContent = name; //записываем аргумент name в заголовок карточки

    const urlLinkElement = li.querySelector('.element__image'); //находим картинку карточки
    urlLinkElement.src = link; //записываем аргумент link в адрес картинки карточки

    li.querySelector('.element__delete').addEventListener('click', () => { //"слушатель" кнопки удалить
        li.remove();                                                       //при нажатии удаляем весь элемент li
    });
    return li; //возвращаем значение функции создания новой карточки
};

const listCards = initialCards.map((card) => { //для каждого элемента массива "из коробки"  
    const name = card.name; //записываем значение заголовка из массива в аргумент name
    const link = card.link; //записываем значение ссылки из массива в аргумент link

    const cardElement = createNewCard(name, link); //создаем карточку

    return cardElement; //возвращаем значение функции - готовый элемент каждой карточки "из коробки" 
});

const renderNewCard = (name, link) => { //функция отрисовки новой карточки на странице
    initialCardsContainer.prepend(createNewCard(name, link)); //вставляем новую карточку в начало списка ul
};

initialCardsContainer.append(...listCards); //вставляем в конец списка ul каждую карточку из массива "из коробки"

const handleFormSubmitNewCard = (evt) => { //обработчик "отправки" формы создания новой карточки
    evt.preventDefault(); //отменяем стандартную отправку формы
    const name = titleInput.value; //записываем значения поля заголовка в аргумент name
    const link = linkInput.value;  //записываем значения поля ccskrb в аргумент link
    renderNewCard(name, link); //запускаем функцию создания новой карточки с полученными аргументами
    closePopup(popupNewCard); //закрываем окно формы
}

addNewCardForm.addEventListener('submit', handleFormSubmitNewCard); //слушатель события "отправки" формы addNewCardForm 

const addRemoveLike = (evt) => {
    const likeButton = evt.target;
    console.log(likeButton);
    if (likeButton.classList.contains('element__likes')) {
        likeButton.closest('.element__likes').classList.toggle('element__likes_is_active');
    };
}

initialCardsContainer.addEventListener('click', addRemoveLike);

const openPopup = (popup) => { //универсальная функция открытия popup 
    popup.classList.add('popup_is-opened');
};

const closePopup = (popup) => { //универсальная функция закрытия popup 
    popup.classList.remove('popup_is-opened');
};


popupCloseButton.forEach((item) => {  //закрытие по крестику любого popup на странице
    item.addEventListener('click', () =>
        document.querySelectorAll('.popup').forEach((item) => {
            item.classList.remove('popup_is-opened');
        }));
});

popupOpenButtonNewCard.addEventListener('click', function (evt) { //слушатель события кнопки добавления новой карточки
    openPopup(popupNewCard); //открываем popup добавления новой карточки
    titleInput.value = ''; //очищаем поля формы от ранее введенных значений
    linkInput.value = '';
});

popupOpenButtonEdit.addEventListener('click', function (evt) { //слушатель события кнопки редактирования данных профиля
    const popupEdit = document.querySelector('.popup_type_edit'); //находим popup редактирования данных профиля
    openPopup(popupEdit); //открываем popup редактирования данных профиля

    let profileName = document.querySelector('.profile__name'); //определяем переменные для заполнения данных в профиле на странице
    let profileJob = document.querySelector('.profile__activity');

    let nameInput = editProfileInfoForm.querySelector('.popup__input_value_name'); //определяем переменные для введенных значений (данных)
    let jobInput = editProfileInfoForm.querySelector('.popup__input_value_activity'); //профиля в поля формы editProfileInfoForm

    nameInput.value = profileName.textContent; //заполняем поля формы значениями из профиля
    jobInput.value = profileJob.textContent;

    function handleFormSubmitEdit(evt) { //обработчик "отправки" формы editProfileInfoForm
        evt.preventDefault(); //отменяем стандартную отправку формы
        profileName.textContent = nameInput.value; //заполняем профиль на странице новыми значениями из полей формы
        profileJob.textContent = jobInput.value;
        closePopup(popupEdit); //закрываем окно формы
    }

    editProfileInfoForm.addEventListener('submit', handleFormSubmitEdit); //слушатель события "отправки" формы editProfileInfoForm
});





















