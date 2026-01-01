export default class FormValidator {
  constructor(config, elementForm) {
    this._config = config;
    this._elementForm = elementForm;
  }

  _toggleButtonState() {
    const inputs = this._elementForm.querySelectorAll(
      this._config.inputSelector
    );
    const submitButton = this._elementForm.querySelector(
      this._config.submitButtonSelector
    );

    submitButton.disabled = ![...inputs].every((input) => input.validity.valid);
    submitButton.classList.toggle(
      this._config.inactiveButtonClass,
      submitButton.disabled
    );
  }

  _showInputError(inputElement) {
    const errorElement = this._elementForm.querySelector(
      `.${inputElement.id}-input-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._elementForm.querySelector(
      `.${inputElement.id}-input-error`
    );

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";

    errorElement.classList.remove(this._config.errorClass);
  }

  _setEventListeners() {
    const inputs = this._elementForm.querySelectorAll(
      this._config.inputSelector
    );

    inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleButtonState();

        if (!inputElement.validity.valid) {
          this._showInputError(inputElement);
        } else {
          this._hideInputError(inputElement);
        }
      });
    });
  }

  setEventListeners() {
    this._setEventListeners();
    this._toggleButtonState();
  }
}
