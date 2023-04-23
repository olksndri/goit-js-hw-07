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

gallery.addEventListener("click", imgScale);
gallery.addEventListener("focusout", (event) => {
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
  // console.log("add");
}

function removeEscapeListener() {
  document.removeEventListener("keydown", escapeListener);
  // console.log("removing");
}

function escapeListener(event) {
  if (event.key.toLowerCase() === "escape") {
    instance.close();
    // console.log("listening...");
  }
}

// const imgAlt = event.target.getAttribute("alt"); (function imgScale)
