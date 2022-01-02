// Add imports above this line
import SimpleLightbox from "simplelightbox";
import { galleryItems } from './gallery-items';
import 'simplelightbox/dist/simple-lightbox.min.css'
// Change code below this line

const galleryEl = document.querySelector(".gallery");
galleryEl.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));

function createGalleryMarkup(gallery) {
    return gallery.map(({preview, original, description})=>(`
    <a class="gallery__item" href=${original}>
    <img class="gallery__image" src=${preview} alt=${description} />
    </a>`)).join('');
}


let lightbox = new SimpleLightbox('.gallery a', { 'animationSpeed': "250", "captionsData": "alt"});
