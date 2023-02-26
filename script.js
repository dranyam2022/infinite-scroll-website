const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
/* declare api config contants */
const apiKey = "LsP5ThqFtvfQc4iRZTSX0PAb6y2azrHIiEv1Kp2kFps";
let count = 5;
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&orientation=landscape`;

//href=photo.links.html src=photo.urls.regular alt=photo.alt_description title=photo.alt_description
/* Gett photos unsplash API */
async function getPhotos() {
  try {
    const res = await fetch(apiUrl);
    photosArray = await res.json();
    displayPhotos();
  } catch (error) {
    console.error(error);
  }
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&orientation=landscape`;
  }
}
/* display photos method */
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const img = createElem("img", {
      src: photo.urls.regular,
      title: photo.alt_description,
      alt: photo.alt_description,
      loading: "lazy",
    });
    const anchor = createElem("a", {
      href: photo.links.html,
      target: "_blank",
    });
    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    anchor.appendChild(img);
    imageContainer.appendChild(anchor);
  });
}

/* create element helper function */
function createElem(elem = "", attributes = {}) {
  const element = document.createElement(elem);
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  return element;
}

/* init scrollHandler function */
function scrollHandler() {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
    ready = false;
  }
}

/* scroll event to make the infinite scroll */
window.addEventListener("scroll", scrollHandler);

getPhotos();
