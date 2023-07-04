export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
        //this._options = config.options
    }

    _onResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`${res.status}`);
    }

    _request(endpoint, options) {
        this._baseUrl = `${this._url}${endpoint}`
        return fetch(this._baseUrl, options)
            .then(this._onResponse)
    }


    getUserInfo() {
        return this._request(`/users/me`, {
            method: 'GET',
            headers: this._headers
        })
    }
    //     return fetch(`/users/me`, {
    //         method: 'GET',
    //         headers: this._headers
    //     })
    //         .then(this._onResponse)
    // }

    getInitialCards() {
        return this._request(`/cards`, {
            method: 'GET',
            headers: this._headers
        })
    }
    //     return fetch(`${this._url}/cards`, {
    //         method: 'GET',
    //                 headers: this._headers
    //     })
    //         .then(this._onResponse)
    // }


    getAllInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }

    createNewCard(dataCard) {
        return this._request(`/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(dataCard)
        })
        // return fetch(`${this._url}/cards`, {
        //     method: 'POST',
        //     headers: this._headers,
        //     body: JSON.stringify(dataCard)
        // })
        //     .then(this._onResponse)
    }

    removeCard(cardId) {
        // this._request(`/cards/${cardId}`, 'DELETE')
        return this._request(`/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        // return fetch(`${this._url}/cards/${cardId}`, {
        //     method: 'DELETE',
        //     headers: this._headers
        // })
        //     .then(this._onResponse)
    }

    swapLike(cardId, statusIsLiked) {
        return this._request(`/cards/${cardId}/likes`, {
            method: statusIsLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        })
        // return fetch(`${this._url}/cards/${cardId}/likes`, {
        //     method: statusIsLiked ? 'DELETE' : 'PUT',
        //     headers: this._headers
        // })
        //     .then(this._onResponse)
    }

    // addLike(cardId) {
        
    //     return fetch(`${this._url}/cards/${cardId}/likes`, {
    //         method: 'PUT',
    //         headers: this._headers
    //     })
    //         .then(this._onResponse)
    // }

    // removeLike(cardId) {
    //     return fetch(`${this._url}/cards/${cardId}/likes`, {
    //         method: 'DELETE',
    //         headers: this._headers
    //     })
    //         .then(this._onResponse)
    // }

    editUserInfo(data) {
        return this._request(`/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        // return fetch(`${this._url}/users/me`, {
        //     method: 'PATCH',
        //     headers: this._headers,
        //     body: JSON.stringify(data)
        // })
        //     .then(this._onResponse)
    }

    editAvatarPhoto(data) {
        return this._request(`/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        // return fetch(`${this._url}/users/me/avatar`, {
        //     method: 'PATCH',
        //     headers: this._headers,
        //     body: JSON.stringify(data)
        // })
        //     .then(this._onResponse)
    }

}