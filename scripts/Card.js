class Card {
  constructor(data, cardSelector, handleCardClick, handleConfirmDelete) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleConfirmDelete = handleConfirmDelete;
    this._id = data._id;
  }

  getCardElement() {
    const templateCard = document.querySelector(this._cardSelector);
    this._cardElement = templateCard.content
      .querySelector(".card")
      .cloneNode(true);

    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    this._likeBtn = this._cardElement.querySelector(".card__like-button");

    this._deleteBtn = this._cardElement.querySelector(".card__delete-button");

    this._setEventListeners();

    return this._cardElement;
  }
  _handleLikeButton(evt) {
    console.log("button");
    evt.target.classList.toggle("card__like-button_is-active");
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  deleteCard() {
    fetch(`https://around-api.es.tripleten-services.com/v1/cards/${this._id}`git, {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    });
  }
  _setEventListeners() {
    this._likeBtn.addEventListener("click", (evt) => {
      this._handleLikeButton(evt);
    });

    this._deleteBtn.addEventListener("click", () => {
      this._handleConfirmDelete(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

export default Card;
