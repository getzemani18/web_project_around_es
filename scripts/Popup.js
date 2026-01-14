export default class Popup {
  constructor(Popup) {
    this._popup = document.querySelector(Popup);
    console.log(this._popup);
  }
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydowm", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.addEventListener("keydowm", this._handleEscClose);
  }

  _handleEscClose(item) {
    if (item.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector(".popup__close").addEventListener("click", () => {
      this.close();
    });
  }
}
