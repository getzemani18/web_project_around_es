export default class UserInfo {
  constructor({ userSelector, userDescription }) {
    this._userSelector = document.querySelector(userSelector);
    this._userDescription = document.querySelector(userDescription);
  }

  getUserInfo() {
    return {
      name: this._userSelector.textContent,
      description: this._userDescription.textContent,
    };
  }

  setUserInfo({ name, description }) {
    this._userSelector.textContent = name;
    this._userDescription.textContent = description;
  }
}
