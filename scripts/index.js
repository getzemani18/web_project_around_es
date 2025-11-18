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

initialCards.forEach((item) => {
  console.log(item);
});

//Parte 1
const editBtn = document.querySelector(".profile__edit-button");
const modal = document.querySelector("#edit-popup");
const closeBtn = modal.querySelector(".popup__close");

const modalAdd = document.querySelector("#new-card-popup");
const closeAddBtn = modalAdd.querySelector(".popup__close");

// variables de imagen
const imagePop = document.querySelector("#image-popup");
const imagePopPicture = document.querySelector(".popup__image");
const imagePopCaption = document.querySelector(".popup__caption");
const closeImageBtn = imagePop.querySelector(".popup__close");

//FUNCIONES
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

editBtn.addEventListener("click", function () {
  handleOpenEditModal();
});

closeBtn.addEventListener("click", function () {
  closeModal(modal);
});

closeAddBtn.addEventListener("click", function () {
  closeModal(modalAdd);
});

closeImageBtn.addEventListener("click", function () {
  closeModal(imagePop);
});

//parte 2
function fillProfileForm() {
  const currentName = document.querySelector(".profile__title").textContent;
  const currentDescription = document.querySelector(
    ".profile__description"
  ).textContent;

  const nameInput = modal.querySelector(".popup__input_type_name");
  const descriptionInput = modal.querySelector(
    ".popup__input_type_description"
  );

  nameInput.value = currentName;
  descriptionInput.value = currentDescription;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(modal);
}

//parte 3
let formElement = modal.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = modal.querySelector(".popup__input_type_name");
  let descriptionInput = modal.querySelector(".popup__input_type_description");

  let newName = nameInput.value;
  let newDescription = descriptionInput.value;

  let currentName = document.querySelector(".profile__title").textContent;
  let currentDescription = document.querySelector(
    ".profile__description"
  ).textContent;

  currentName.textContent = newName;
  currentDescription.textContent = newDescription;

  closeModal(modal);
}
formElement.addEventListener("submit", handleProfileFormSubmit);

const templateCard = document.querySelector("#cards-content");
const cardsContainer = document.querySelector(".cards__list");
// console.log(cardsContainer);

function getCardElement(name, link) {
  const cardElement = templateCard.content.cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  console.log(cardTitle, cardImage);
  cardTitle.textContent = name;
  cardImage.alt = name;
  cardImage.src = link;

  const likeBtn = cardElement.querySelector(".card__like-button");
  likeBtn.addEventListener("click", handleLikeButton);

  const deleteBtn = cardElement.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", handleDeleteCard);

  cardImage.addEventListener("click", function () {
    handleImageClick(name, link);
  });

  return cardElement;
}

function handleLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleDeleteCard(evt) {
  const deleteButton = evt.target.closest(".card");
  deleteButton.remove();
}

function handleImageClick(name, link) {
  imagePopCaption.textContent = name;
  imagePopPicture.src = link;
  imagePopPicture.alt = name;
  openModal(imagePop);
}

function renderCard(name, link, container) {
  console.log(container);
  const card = getCardElement(name, link);
  container.append(card);
}

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
