class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleConfirmDelete,
    handleLikeClick,
    userId,
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleConfirmDelete = handleConfirmDelete;
    this._id = data._id;
    this._handlelikeClick = handleLikeClick;
    this._likes = data.likes;
    this._ownerId = data.owner?._id || data.owner;
    this._userId = userId;

    // console.log(data, "constructor");
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

    this.setLikes(this._likes);

    if (this._ownerId !== this._userId) {
      this._deleteBtn.remove();
    }

    return this._cardElement;
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  setLikes(likes) {
    this._likes = !likes;

    this._likeBtn.classList.toggle("card__like-button_is-active");
  }

  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      this._handlelikeClick(this);

      console.log("click like");
    });

    this._deleteBtn.addEventListener("click", () => {
      console.log(this, "delete");
      this._handleConfirmDelete(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  getId() {
    return this._id;
  }
}

export default Card;
