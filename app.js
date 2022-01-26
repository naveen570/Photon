const pixelUrl = "https://api.pexels.com/v1/curated?page=1&per_page=10";
const authKey = "563492ad6f91700001000001abda545ed444452e91318f410a930637";
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const gallerySection = document.querySelector(".gallery");

async function curatedPhotos(pixelUrl, authKey) {
  const response = await fetch(pixelUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: authKey,
    },
  });
  const data = await response.json();
  data.photos.forEach((photo) => {
    console.log(photo);
    const galleryDiv = document.createElement("div");
    galleryDiv.classList.add("gallery-photo");
    galleryDiv.innerHTML = `<img src=${photo.src.large} alt=${photo.alt}></img>
    <p><a href=${photo.photographer_url} target="_blank">${photo.photographer}</a></p>`;
    gallerySection.appendChild(galleryDiv);
  });
}
curatedPhotos(pixelUrl, authKey);
