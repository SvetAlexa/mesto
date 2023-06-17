export default class UserInfo {
    constructor({ userNameSelector, userAboutSelector }) {
        this._userNameSelector = document.querySelector(userNameSelector);
        this._userAboutSelector = document.querySelector(userAboutSelector);
    }

    getUserInfo() {
        return {
            user: this._userNameSelector.textContent,
            about: this._userAboutSelector.textContent
        };
    }

    setUserInfo(dataInput) {
        this._userNameSelector.textContent = dataInput.user;
        this._userAboutSelector.textContent = dataInput.about;
    }
}