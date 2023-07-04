import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePopup = this._popupElement.querySelector('.popup__image');
        this._titlePopup = this._popupElement.querySelector('.popup__caption');
    }

    open(data) {
        super.open();
        this._imagePopup.src = data.link;
        this._imagePopup.alt = data.name;
        this._titlePopup.textContent = data.name;
    }
}