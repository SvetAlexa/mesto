import { data } from "autoprefixer";

export default class UserInfo {
    constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
        this._userNameSelector = document.querySelector(userNameSelector);
        this._userAboutSelector = document.querySelector(userAboutSelector);
        this._userAvatarSelector = document.querySelector(userAvatarSelector);
    }

    // getUserInfo() {
    //     this._userName = userData.userName;
    //     this._userAbout = userData.userAbout;
    // }

    setUserInfo(dataInput) {
        this._userNameSelector.textContent = dataInput.name;
        this._userAboutSelector.textContent = dataInput.about;
    }

    setAvatarImage(data) {
        this._userAvatarSelector.src = data.avatar;
    }
}