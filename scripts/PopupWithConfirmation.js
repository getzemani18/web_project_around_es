import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    console.log(popupSelector);
    super(popupSelector);

    this._submitButton = this._popup.querySelector(".popup__save-button");
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButton.addEventListener("click", () => {
      if (this._handleSubmit) {
        this._handleSubmit();
      }
    });
  }
}
