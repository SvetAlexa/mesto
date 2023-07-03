export default class UserInfo {
    constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
        this._userNameSelector = document.querySelector(userNameSelector);
        this._userAboutSelector = document.querySelector(userAboutSelector);
        this._userAvatarSelector = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
        return {
            name: this._userNameSelector.textContent,
            about: this._userAboutSelector.textContent
        }
    }

    setUserInfo(data) {
        this._userNameSelector.textContent = data.name;
        this._userAboutSelector.textContent = data.about;
        this._userAvatarSelector.src = data.avatar;
    }

    getAvatarInfo() {
        return {
            avatar: this._userAvatarSelector.src
        }
    }

    setAvatarImage(data) {
        this._userAvatarSelector.src = data.avatar;
    }
}