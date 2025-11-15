const initialCards = [
  [
    "name",
    "Valle de Yosemite",
    "link",
    "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    "name",
    "Lago Luoise",
    "link",
    "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    "name",
    "Montañas Calvas",
    "link",
    "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
    "name",
    "Latemar",
    "link",
    "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
    "name",
    "Parque Nacional de la Vanoise",
    "link",
    "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
    "name",
    "Lago di Braies",
    "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  ],
];

initialCards.forEach((item) => {
  console.log(item);
});

//Parte 1
const editBtn = document.querySelector(".profile__edit-button");
const modal = document.querySelector("#edit-popup");
const closeBtn = modal.querySelector(".popup__close");

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
