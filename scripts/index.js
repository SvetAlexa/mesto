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

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupProfileInfo = document.querySelector('.popup_type_edit');
const popupOpenImage = document.querySelector('.popup_type_image');

const formPopupNewCard = document.querySelector('.popup__form_type_new-card');
const formPopupProfileInfo = document.querySelector('.popup__form_type_edit');

const titleInput = formPopupNewCard.querySelector('.popup__input_value_title');
const linkInput = formPopupNewCard.querySelector('.popup__input_value_link');

const buttonAddNewCard = document.querySelector('.profile__add-button');
const buttonEditProfileInfo = document.querySelector('.profile__edit-button');

const buttonsClosePopup = document.querySelectorAll('.popup__close-button');

const createNewCard = (name, link) => {
    const template = document.querySelector('#element-item-template');
    const li = template.content
        .querySelector('.element').cloneNode(true);

    const titleElement = li.querySelector('.element__title');
    const imageElement = li.querySelector('.element__image');
    
    titleElement.textContent = name;
    imageElement.alt = name;
    imageElement.src = link;

    li.querySelector('.element__delete').addEventListener('click', () => {
        li.remove();                                                      
    });

    imageElement.addEventListener('click', () => {
        document.querySelector('.popup__image').src = imageElement.src;  
        document.querySelector('.popup__caption').textContent = titleElement.textContent;
        openPopup(popupOpenImage);
    });

    return li;
};

const listCards = initialCards.map((card) => {  
    const name = card.name;
    const link = card.link;

    const cardElement = createNewCard(name, link);

    return cardElement;
});

initialCardsContainer.append(...listCards);

const renderNewCard = (name, link) => { 
    initialCardsContainer.prepend(createNewCard(name, link));
};

const openPopup = (popup) => {
    popup.classList.add('popup_is-opened');
};

const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened');
};

buttonsClosePopup.forEach((item) => {
    item.addEventListener('click', () =>
        document.querySelectorAll('.popup').forEach((item) => {
            item.classList.remove('popup_is-opened');
        }));
});

const addRemoveLike = (evt) => {
    const likeButton = evt.target;
    if (likeButton.classList.contains('element__likes')) {
        likeButton.closest('.element__likes').classList.toggle('element__likes_is_active');
    };
};

initialCardsContainer.addEventListener('click', addRemoveLike);

const handleFormSubmitNewCard = (evt) => {
    evt.preventDefault();
    const name = titleInput.value;
    const link = linkInput.value;
    renderNewCard(name, link);
    closePopup(popupNewCard);
};

formPopupNewCard.addEventListener('submit', handleFormSubmitNewCard);

buttonAddNewCard.addEventListener('click', function (evt) {
    openPopup(popupNewCard);
    titleInput.value = '';
    linkInput.value = '';
});

buttonEditProfileInfo.addEventListener('click', function (evt) {
    openPopup(popupProfileInfo);

    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__activity');

    let nameInput = formPopupProfileInfo.querySelector('.popup__input_value_name');
    let jobInput = formPopupProfileInfo.querySelector('.popup__input_value_activity');

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    function handleFormSubmitEdit(evt) {
        evt.preventDefault();
        profileName.textContent = nameInput.value;
        profileJob.textContent = jobInput.value;
        closePopup(popupProfileInfo);
    };

    formPopupProfileInfo.addEventListener('submit', handleFormSubmitEdit);
});



















