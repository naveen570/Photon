const authKey = "563492ad6f91700001000001abda545ed444452e91318f410a930637";
const searchInput = document.querySelector(".search-input");
const searchForm = document.querySelector(".search-form");
const gallerySection = document.querySelector(".gallery");
const moreBtn = document.querySelector(".more-btn");
const topBtn = document.querySelector(".top-btn");
let pageNum = 1;
let fetchLink = "";
let currentSearch = "";
//Event Listeners
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = searchInput.value;
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
document.addEventListener("DOMContentLoaded", () => {
  curatedPhotos();
});
moreBtn.addEventListener("click", () => {
  loadMorePictures();
});
topBtn.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = "0";
});
function generatePhotos(data) {
  data.photos.forEach((photo) => {
    const galleryDiv = document.createElement("div");
    galleryDiv.classList.add("gallery-photo");
    galleryDiv.innerHTML = `<div class="gallery-info">
    <p class="photographer">
      <a href="${photo.photographer_url}" target="_blank"
        >${photo.photographer}</a
      >
      <span class="tooltip author">Author's Name</span>
    </p>
    <div class="download-section">
    <a href=${photo.src.original} target="_blank"   class="download"><i class="fas fa-download"></i></a>
    <span class="tooltip download">Download</span>
    </div>
  </div >
  <div class="gallery-img"><img src=${photo.src.large} alt=${photo.alt}></img></div>
  `;
    gallerySection.appendChild(galleryDiv);
  });
}
function clear() {
  gallerySection.innerHTML = "";
  searchInput.value = "";
}

async function fetchAPI(url) {
  try {
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: authKey,
      },
    });
    const data = await dataFetch.json();
    return data;
  } catch (err) {
    console.log("value not found");
  }
}

async function curatedPhotos() {
  fetchLink = `https://api.pexels.com/v1/curated?page=1&per_page=10`;
  const data = await fetchAPI(fetchLink);
  generatePhotos(data);
}
async function searchPhotos(queryString) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${queryString}&page=1&per_page=10`;
  const data = await fetchAPI(fetchLink);
  generatePhotos(data);
}
async function loadMorePictures() {
  pageNum++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&page=${pageNum}&per_page=10`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?page=${pageNum}&per_page=10`;
  }
  const data = await fetchAPI(fetchLink);
  generatePhotos(data);
}
