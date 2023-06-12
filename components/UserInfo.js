export default class UserInfo {
    constructor({ userNameSelector, userAboutSelector }) {
        this._userNameSelector = document.querySelector('.profile__name');
        this._userAboutSelector = document.querySelector('.profile__activity');
    }

    getUserInfo() {
        this._userInfo = { name: this._userNameSelector.textContent, about: this._userAboutSelector.textContent };
        console.log(this._userNameSelector)
        console.log(this._userInfo)
     
        return this._userInfo;

    }

    setUserInfo() {
        // this._userInfo = { name: this._userNameSelector, about: this._userAboutSelector };
        // console.log(this._userInfo)
        // return this._userInfo;
    }
}