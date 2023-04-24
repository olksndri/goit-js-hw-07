// import * as basicLightbox from "basiclightbox";
import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector("ul.gallery");
const images = galleryItems.reduce((prevVal, elem) => {
  prevVal += `<li class="gallery__item">
  <a class="gallery__link" href="${elem.original}">
  <img class="gallery__image" src="${elem.preview}" alt ="${elem.description}" data-source="${elem.original}"/>
  </a></li>`;
  return prevVal;
}, "");

gallery.innerHTML = images;

//! Помилка з перевіркою області кліку виправлена
//! Закоментуйте даний код, якщо розкоментовуєте код з 56 рядка
gallery.addEventListener("click", (event) => {
  document.querySelectorAll("ul.gallery img").forEach((element) => {
    if (event.target === element) {
      imgScale(event);
    }
  });
});
gallery.addEventListener("focusout", () => {
  removeEscapeListener();
});

let instance = basicLightbox.create(``);

function imgScale(event) {
  event.preventDefault();
  const imgSrc = event.target.dataset.source;
  instance = basicLightbox.create(`
    <img class="gallery__image" src="${imgSrc}" width="800" height="600"/>`);
  instance.show();
  addEscapeListener();
}

function addEscapeListener() {
  document.addEventListener("keydown", escapeListener);
  console.log("add");
}

function removeEscapeListener() {
  document.removeEventListener("keydown", escapeListener);
  console.log("remove");
}

function escapeListener(event) {
  if (event.key.toLowerCase() === "escape") {
    instance.close();
    event.target.blur();
  }
}

//! Розкоментуйте код нижче, щоб побачити той же функціонал, але через опції бібліотеки
// gallery.addEventListener("click", (event) => {
//   document.querySelectorAll("ul.gallery img").forEach((element) => {
//     if (event.target === element) {
//       imgScale(event);
//     }
//   });
// });

// let instance = basicLightbox.create(``);

// function imgScale(event) {
//   event.preventDefault();
//   const imgSrc = event.target.dataset.source;
//   instance = basicLightbox.create(
//     `
//     <img class="gallery__image" src="${imgSrc}" width="800" height="600"/>`,
//     {
//       onShow: (instance) => {
//         document.addEventListener("keydown", escapeListener);
//         console.log("add");
//       },
//       onClose: (instance) => {
//         document.removeEventListener("keydown", escapeListener);
//         console.log("remove");
//       },
//     }
//   );
//   instance.show();
// }

// function escapeListener(event) {
//   if (event.key.toLowerCase() === "escape") {
//     instance.close();
//   }
// }

//? Methods elem.focus() and elem.blur() set element to focus/blur
