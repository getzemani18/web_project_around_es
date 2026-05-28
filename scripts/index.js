import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
// import Section from "./Section.js";
import api from "./Api.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopUpWithForm.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

const cardsContainer = document.querySelector(".cards__list");

// USUARIO

let currentUserId;
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, cards]) => {
    currentUserId = data._id;
    document.querySelector(".profile__title").textContent = data.name;
    document.querySelector(".profile__description").textContent = data.about;
    document.querySelector(".profile__image").src = data.avatar;

    cards.forEach((cardData) => {
      renderCard(cardData, cardsContainer);
      // addCardPopup.close();
    });
  })
  .catch((err) => console.log(err));

// perfil

//Editar Perfil

const editProfilePopup = new PopupWithForm("#edit-popup", (formData, evt) => {
  const buttonElement = evt.submitter;
  renderLoading(true, buttonElement);
  api
    .editUserInfo(formData)
    .then((data) => {
      console.log(data);
      userInfo.setUserInfo({
        name: data.name,
        description: data.about,
      });
      editProfilePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, buttonElement);
    });
});
editProfilePopup.setEventListeners();

const nameInputs = document.querySelector("#name");
const jobInput = document.querySelector("#description");

const buttonEditProfile = document.querySelector(".profile__edit-button");
buttonEditProfile.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInputs.value = userData.name;
  jobInput.value = userData.description;

  editProfilePopup.open();
});

// actualizar foto de perfil

const avatar = document.querySelector(".profile__avatar-edit");

const updateAvatar = new PopupWithForm("#avatar-popup", (avatarData, evt) => {
  const buttonElement = evt.submitter;

  renderLoading(true, buttonElement);
  api
    .updateAvatar(avatarData)
    .then((userAvatarData) => {
      document.querySelector(".profile__avatar-img").src =
        userAvatarData.avatar;
      updateAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, buttonElement);
    });
});

updateAvatar.setEventListeners();

avatar.addEventListener("click", () => {
  updateAvatar.open();
});

//Añadir nueva tarjeta
const addCardPopup = new PopupWithForm("#new-card-popup", (formData, evt) => {
  const buttonElement = evt.submitter;
  renderLoading(true, buttonElement);
  console.log(formData);
  api
    .addCard(formData)
    .then((cardData) => {
      renderCard(cardData, cardsContainer);
      addCardPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, buttonElement);
    });
});

addCardPopup.setEventListeners();

const abrirCard = document.querySelector(".profile__add-button");
abrirCard.addEventListener("click", () => {
  addCardPopup.open();
});

// CONFIG VALIDACION

const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// RENDER CARD
function renderCard(cardData, container) {
  const cards = new Card(
    cardData,
    "#cards-content",
    handleCardClick,
    handleConfirmDelete,
    handleLikeClick,
    currentUserId,
  );
  const card = cards.getCardElement();
  container.append(card);
}

// USER INFO

const userInfo = new UserInfo({
  userSelector: ".profile__title",
  userDescription: ".profile__description",
});
//Confirmar borrar
const confirmPopup = new PopupWithConfirmation("#confirm-popup");

confirmPopup.setEventListeners();

function handleConfirmDelete(card) {
  console.log(card);
  confirmPopup.open();
  confirmPopup.setSubmitAction(() => {
    api
      .deleteCard(card.getId())
      .then(() => {
        card.deleteCard();
        confirmPopup.close();
      })

      .catch((err) => console.log(err));
  });
}

// Añadir y eliminar "me gusta"

function handleLikeClick(card) {
  console.log("hola", card);

  api
    .likeCard(card.getId(), card.likes)

    .then((updateCard) => {
      card.setLikes(updateCard.isLiked);
    })

    .catch((err) => console.log(err));
}

//Guardando ...
function renderLoading(isLoading, buttonElement) {
  if (isLoading) {
    buttonElement.textContent = "Guardando...";
  } else {
    buttonElement.textContent = "Guardar";
  }
}

//formValidator.js ----- VALIDACION

const editProfileForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");
const editProfileFormValidator = new FormValidator(config, editProfileForm);

const cardFormValidator = new FormValidator(config, newCardForm);

editProfileFormValidator.setEventListeners();
cardFormValidator.setEventListeners();

// IMAGEN
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

function handleCardClick(name, link) {
  console.log(name, link);
  imagePopup.open(name, link);
}
