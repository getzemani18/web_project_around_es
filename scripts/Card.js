class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  getCardElement() {
    const templateCard = document.querySelector(this._cardSelector);
    const cardElement = templateCard.content.cloneNode(true);

    this._cardTitle = cardElement.querySelector(".card__title");
    this._cardImage = cardElement.querySelector(".card__image");
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    this._likeBtn = cardElement.querySelector(".card__like-button");

    this._deleteBtn = cardElement.querySelector(".card__delete-button");

    this._setEventListeners();

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

  generateCard() {
    this._element = this.getCardElement();
  }

  _setEventListeners() {
    this._likeBtn.addEventListener("click", (evt) => {
      this._handleLikeButton(evt);
    });

    this._deleteBtn.addEventListener("click", (evt) => {
      this._handleDeleteCard(evt);
    });

    this._cardImage.addEventListener("click", () => {
      console.log("h");
      this._handleCardClick(this._name, this._link);
    });
  }
}

export default Card;
