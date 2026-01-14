import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    const image = this._popup.querySelector(".popup__image");
    const caption = this._popup.querySelector(".popup__caption");
    console.log(image, caption);
    image.src = link;
    image.alt = name;

    caption.textContent = name;

    super.open();
  }
}
