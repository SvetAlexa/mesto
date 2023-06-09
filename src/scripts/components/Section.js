export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }


    addItem(elementNode, position) {
        switch (position) {
            case 'append':
                this._container.append(elementNode);
                break;
            case 'prepend':
                this._container.prepend(elementNode);
                break;
        }
    }

    renderItems(cardsArray) {
        cardsArray.forEach(this._renderer);
    }
}
