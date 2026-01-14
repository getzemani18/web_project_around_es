export default class UserInfo {
  constructor({ userSelector, userJob }) {
    this._userSelector = document.querySelector(userSelector);
    this._userJob = document.querySelector(userJob);
  }

  getUserInfo() {
    return {
      name: this._userSelector.textContent,
      job: this._userJob.textContent,
    };
  }

  setUserInfo({ user, job }) {
    this.userElement.textContent = user;
    this.userElement.textContent = job;
  }
}
