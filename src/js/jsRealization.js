import galleryImg from './gallery-items.js';

const refs = {
    jsGallery: document.querySelector('ul.js-gallery'),
    jsLightbox: document.querySelector('.js-lightbox'),
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
    jsLightboxImage: document.querySelector('.lightbox__image'),
    closeLightbox: document.querySelector('button[data-action="close-lightbox"]'),
}

refs.jsGallery.insertAdjacentHTML('beforeend', galleryImg.map(({ preview, original, description }, i) =>
    `<li class="gallery__item">
     <a class="gallery__link" href="${original}">
     <img class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      data-index="${i}">
    </a>
    </li>`)
    .join(''));

function addModalSrc(event) {
    refs.jsLightboxImage.src = event.target.dataset.source;
    refs.jsLightboxImage.alt = event.target.alt;
    refs.jsLightboxImage.setAttribute('data-index', `${event.target.dataset.index}`);
}; 

function cleanModalSrc() {
    refs.jsLightboxImage.src = '#';
    refs.jsLightboxImage.alt = '';
    refs.jsLightboxImage.removeAttribute('data-index');
};

function modalIsOpen(event) {
    event.preventDefault();

    if (event.target.nodeName !== 'IMG') {
        return;   
    };

    refs.jsLightbox.classList.add('is-open');
    addModalSrc(event);

} 

function modalIsClose() {

    refs.jsLightbox.classList.remove('is-open');
    cleanModalSrc();
} 

function keyModalIsClose(event) {

    if (refs.jsLightbox.classList.contains('is-open') && event.code === 'Escape') {
        modalIsClose();
    }
    
}; 

function keyPressNextPrev(event) {
    const jsGalleryImg = document.querySelectorAll('.gallery__image');
    let currentIndex = Number(refs.jsLightboxImage.dataset.index);
    
    if (refs.jsLightbox.classList.contains('is-open') && event.code === 'ArrowRight') {

        if (currentIndex === galleryImg.length - 1) {
            currentIndex = -1;
        };
        
        refs.jsLightboxImage.src = jsGalleryImg[currentIndex + 1].dataset.source;
        refs.jsLightboxImage.dataset.index = jsGalleryImg[currentIndex + 1].dataset.index;
        refs.jsLightboxImage.alt = jsGalleryImg[currentIndex + 1].alt;
        
    } else if (refs.jsLightbox.classList.contains('is-open') && event.code === 'ArrowLeft') {

        if (currentIndex === 0) {
            currentIndex = galleryImg.length;
        };

        refs.jsLightboxImage.src = jsGalleryImg[currentIndex - 1].dataset.source;
        refs.jsLightboxImage.dataset.index = jsGalleryImg[currentIndex - 1].dataset.index;
        refs.jsLightboxImage.alt = jsGalleryImg[currentIndex - 1].alt;
    };
     
};

refs.jsGallery.addEventListener('click', modalIsOpen);

refs.lightboxOverlay.addEventListener('click', modalIsClose);

refs.closeLightbox.addEventListener('click', modalIsClose);

window.addEventListener('keydown', keyModalIsClose);

window.addEventListener('keydown', keyPressNextPrev);

window.addEventListener('keydown', keyPressNextPrev);
