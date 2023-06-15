export default class UserInfo {
    constructor({ userNameSelector, userAboutSelector }) {
        this._userNameSelector = document.querySelector(userNameSelector);
        this._userAboutSelector = document.querySelector(userAboutSelector);
    }

    getUserInfo() {
        this._userInfo = { user: this._userNameSelector.textContent, about: this._userAboutSelector.textContent };
      
        return this._userInfo;
    }

    setUserInfo(dataInput) {
        this._userNameSelector.textContent = dataInput.user;
        this._userAboutSelector.textContent = dataInput.about;
    }
}