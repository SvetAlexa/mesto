export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers
    }

    _onResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Произошла ошибка ${res.status}`);
    }

    // _request(url, options) {
    //     return fetch(`${this._url}${url}`, {
    //         method: options,
    //         headers: this._headers
    //     })
    //     .then(this._onResponse)
    // }

    getUserInfo() {
        // this._request(`/users/me`, 'GET')
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
        // this._request(`/cards/${cardId}`, 'DELETE')
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._onResponse)
    }

    swapLike(cardId, statusIsLiked) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: statusIsLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        })
            .then(this._onResponse)
    }

    addLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._onResponse)
    }

    removeLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._onResponse)
    }

    editUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._onResponse)
    }

    editAvatarPhoto(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._onResponse)
    }

}