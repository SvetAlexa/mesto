export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }


    addItem(elementNode, position) {
        switch (position) {
            case 'append':
                this._container.append(elementNode);
                // if (status) {
                //     document.querySelector('.element__delete').remove()
                //     console.log(document.querySelector('.element__delete'))
                // } else {
                //     console.log('моя карточка')
                // }
                break;
            case 'prepend':
                this._container.prepend(elementNode);
                // if (status) {
                //     this._container.querySelector('.element__delete').remove()
                // } else {
                //     console.log('моя карточка')
                // }
                break;
        }
        //return this._container
    }

    renderItems(cardsArray) {
        cardsArray.forEach(this._renderer);
    }
}
