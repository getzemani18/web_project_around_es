import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
// import Section from "./Section.js";

import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopUpWithForm.js";

const token = "dc926371-238c-4bb8-8a08-9738f937e94b";
const cardsContainer = document.querySelector(".cards__list");

// USUARIO

fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
  headers: {
    authorization: token,
  },
})
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);

    document.querySelector(".profile__title").textContent = data.name;
    document.querySelector(".profile__description").textContent = data.about;
    document.querySelector(".profile__image").src = data.avatar;
  })
  .catch((err) => console.log(err));

// TARJETAS

fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
  headers: {
    authorization: token,
  },
})
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  })
  .then((cards) => {
    console.log(cards);

    cards.forEach((cardData) => {
      renderCard(cardData.name, cardData.link, cardsContainer);
    });
  })
  .catch((err) => console.log("Eror", err));

// CONFIG VALIDACION

const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// RENDER CARD
function renderCard(name, link, container) {
  const cards = new Card(
    { name: name, link: link },
    "#cards-content",
    handleCardClick,
  );
  const card = cards.getCardElement();
  container.append(card);
}

// USER INFO

const userInfo = new UserInfo({
  userSelector: ".profile__title",
  userDescription: ".profile__description",
});

// EDITAR PERFIL

const editProfilePopup = new PopupWithForm("#edit-popup", (formData) => {
  userInfo.setUserInfo(formData);
});
editProfilePopup.setEventListeners();

const nameInputs = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const buttonEditProfile = document.querySelector(".profile__edit-button");
buttonEditProfile.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInputs.value = userData.name;

  jobInput.value = userData.description;
  editProfilePopup.open();
});

// AGREGAR CARD
const addCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  renderCard(formData["place-name"], formData.link, cardsContainer);
});
addCardPopup.setEventListeners();
const abrirCard = document.querySelector(".profile__add-button");
abrirCard.addEventListener("click", () => {
  addCardPopup.open();
});

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
