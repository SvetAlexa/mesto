import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePopup = this._popupSelector.querySelector('.popup__image');
        this._titlePopup = this._popupSelector.querySelector('.popup__caption');
    }

    open(title, link) {
        super.open();
        this._imagePopup.src = link;
        this._imagePopup.alt = title;
        this._titlePopup.textContent = title;
    }

}