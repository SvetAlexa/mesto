export default class UserInfo {
    constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userAboutElement = document.querySelector(userAboutSelector);
        this._userAvatarElement = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
        return {
            user: this._userNameElement.textContent,
            about: this._userAboutElement.textContent
        }
    }

    setUserInfo(data) {
        this._userNameElement.textContent = data.name;
        this._userAboutElement.textContent = data.about;
        this._userAvatarElement.src = data.avatar;
    }

    getAvatarInfo() {
        return {
            avatar: this._userAvatarElement.src
        }
    }
}