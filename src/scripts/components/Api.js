export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers
    }

    _onResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._onResponse)
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._onResponse)
    }


    getAllInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }

    createNewCard(dataCard) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(dataCard)
        })
        .then(this._onResponse)
    }

    removeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._onResponse)
    }
}