const editBtn = document.querySelector(".profile__edit-button");
const modal = document.querySelector("#edit-popup");
const closeBtn = modal.querySelector(".popup__close");

const modalAdd = document.querySelector("#new-card-popup");
const closeAddBtn = modalAdd.querySelector(".popup__close");

// variables de imagen
const imagePop = document.querySelector("#image-popup");
const closeImageBtn = imagePop.querySelector(".popup__close");

//agregar tarjetas
const abrirCard = document.querySelector(".profile__add-button");
const agregarCard = document.querySelector(".pop-crear");

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

abrirCard.addEventListener("click", function () {
  openModal(modalAdd);
});

agregarCard.addEventListener("click", function (evt) {
  handeCardFormSubmit(evt, cardsContainer);
});

function handleOpenEditModal() {
  fillProfileForm();
  openModal(modal);
}

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

export { openModal, closeModal, modal, modalAdd };
