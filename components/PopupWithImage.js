import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePopup = this._popupSelector.querySelector('.popup__image');
        this._titlePopup = this._popupSelector.querySelector('.popup__caption');
    }

    open(name, link) {
        super.open();
        this._imagePopup.src = link;
        this._imagePopup.alt = name;
        this._titlePopup.textContent = name;
    }

}