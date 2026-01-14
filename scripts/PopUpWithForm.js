import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupForm, handleFormSubmit) {
    super(popupForm);

    this._form = document.querySelector(popupForm);
    this._forms = this._form.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._forms.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const inputValues = {};

    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._forms.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._forms.reset();
  }
}
