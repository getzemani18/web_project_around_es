class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  getCardElement() {
    const templateCard = document.querySelector(this._cardSelector);
    const cardElement = templateCard.content.cloneNode(true);

    const cardTitle = cardElement.querySelector(".card__title");
    const cardImage = cardElement.querySelector(".card__image");
    console.log(cardTitle, cardImage);
    cardTitle.textContent = this._name;
    cardImage.alt = this._name;
    cardImage.src = this._link;

    const likeBtn = cardElement.querySelector(".card__like-button");
    likeBtn.addEventListener("click", this._handleLikeButton);

    const deleteBtn = cardElement.querySelector(".card__delete-button");
    deleteBtn.addEventListener("click", this._handleDeleteCard);

    cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });

    return cardElement;
  }
  _handleLikeButton(evt) {
    console.log("button");
    evt.target.classList.toggle("card__like-button_is-active");
  }
  _handleDeleteCard(evt) {
    console.log("basura");
    const deleteButton = evt.target.closest(".card");
    deleteButton.remove();
  }

  _openModal(modal) {
    modal.classList.add("popup_is-opened");
  }

  _handleImageClick(name, link) {
    const imagePop = document.querySelector("#image-popup");
    const imagePopPicture = imagePop.querySelector(".popup__image");
    const imagePopCaption = imagePop.querySelector(".popup__caption");
    console.log("Imagen click");
    imagePopCaption.textContent = name;
    imagePopPicture.src = link;
    imagePopPicture.alt = name;
    this._openModal(imagePop);
  }

  generateCard() {
    this._element = this.getCardElement();
  }
}

export default Card;
