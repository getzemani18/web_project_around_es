export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydowm", this._handleEscClose).blind(this);
  }

  close() {
    this._popup.classList.add("popup_opened");
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
