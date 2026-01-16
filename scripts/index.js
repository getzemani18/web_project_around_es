import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import { openModal, closeModal, modal, modalAdd } from "./utils.js";
console.log("text");
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopUpWithForm.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Luoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
  ,
];

const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

initialCards.forEach((item) => {
  // console.log(item);
});

let formElement = modal.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = modal.querySelector(".popup__input_type_name");
  let descriptionInput = modal.querySelector(".popup__input_type_description");

  let newName = nameInput.value;
  let newDescription = descriptionInput.value;

  let currentName = document.querySelector(".profile__title");
  let currentDescription = document.querySelector(".profile__description");

  currentName.textContent = newName;
  currentDescription.textContent = newDescription;

  closeModal(modal);
}
formElement.addEventListener("submit", handleProfileFormSubmit);

const cardsContainer = document.querySelector(".cards__list");
// console.log(cardsContainer);

function renderCard(name, link, container) {
  // console.log(container);
  const cards = new Card(
    { name: name, link: link },
    "#cards-content",
    handleCardClick
  );
  const card = cards.getCardElement();
  container.append(card);
}

const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, "#card-template", handleCardClick);

    const cardElements = card.getCardElement();
    cardSection.addItem(cardElements);
  },
});

const userInfo = new UserInfo({
  userSelector: ".profile__title",
  userJob: ".profile__description",
});

const editProfilePopup = new PopupWithForm("#edit-popup", (formData) => {
  userInfo.setUserInfo(formData);
});

const buttonEditProfile = document.querySelector(".profile__edit-button");
buttonEditProfile.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.vale = userData.name;
  jonInput.value = userData.job;

  editProfilePopup.open();
});

editProfilePopup.setEventListeners();
initialCards.forEach(function (cardData) {
  renderCard(cardData.name, cardData.link, cardsContainer);
});

//agregar tarjetas
const abrirCard = document.querySelector(".profile__add-button");
const agregarCard = document.querySelector(".pop-crear");

abrirCard.addEventListener("click", function () {
  openModal(modalAdd);
});

agregarCard.addEventListener("click", function (evt) {
  handeCardFormSubmit(evt, cardsContainer);
});

function handeCardFormSubmit(evt, cardsContainer) {
  evt.preventDefault();

  let nameInput = document.querySelector(".popup__input_type_card-name");
  let linkInput = document.querySelector(".popup__input_type_url");

  renderCard(nameInput.value, linkInput.value, cardsContainer);
  closeModal(modalAdd);
}

//cerrar la ventana al hacer click afuera
const popups = document.querySelectorAll(".popup");

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    popups.forEach((popup) => {
      closeModal(popup);
    });
  }
});

popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      closeModal(popup);
    }
  });
});

// iteracion de Card.js
initialCards.forEach((item) => {
  const card = new Card(
    { name: item.name, link: item.link },
    "#cards-content",
    handleCardClick
  );
  const cardElement = card.getCardElement();

  document.querySelector(".cards__list").append(cardElement);
});

//formValidator.js
const editProfileFormValidator = new FormValidator(config, formElement);

const cardFormValidator = new FormValidator(config, formElement);

editProfileFormValidator.setEventListeners();
cardFormValidator.setEventListeners();

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

function handleCardClick(name, link) {
  console.log(name, link);
  imagePopup.open(name, link);
}
