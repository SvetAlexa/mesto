export default class UserInfo {
    constructor({ userNameSelector, userAboutSelector }) {
        this._userNameSelector = document.querySelector(userNameSelector);
        this._userAboutSelector = document.querySelector(userAboutSelector);
    }

    getUserInfo() {
        console.log(this._userNameSelector)
        this._userInfo = { name: this._userNameSelector.textContent, about: this._userAboutSelector.textContent };
        console.log(this._userInfo)
      
        return this._userInfo;

    }

    setUserInfo(dataInput) {
        this._userNameSelector.textContent = dataInput.name;
        this._userAboutSelector.textContent = dataInput.about;
    }
}