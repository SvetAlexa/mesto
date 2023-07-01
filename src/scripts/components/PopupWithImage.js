import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePopup = this._popupSelector.querySelector('.popup__image');
        this._titlePopup = this._popupSelector.querySelector('.popup__caption');
    }

    open(data) {
        super.open();
        this._imagePopup.src = data.link;
        console.log(data.link)
        this._imagePopup.alt = data.name;
        this._titlePopup.textContent = data.name;
    }
}