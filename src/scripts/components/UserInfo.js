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
    
    setUserInfo(dataInput) {
        this._userNameSelector.textContent = dataInput.name;
        this._userAboutSelector.textContent = dataInput.about;
    }

    setAvatarImage(data) {
        this._userAvatarSelector.src = data.avatar;
    }
}