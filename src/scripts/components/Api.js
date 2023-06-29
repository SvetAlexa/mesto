export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
            })
        }
}

