
import getImgs from './components/imgFetch';
import Notiflix from 'notiflix';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('[name="searchQuery"]');
const galleryRef = document.querySelector('.gallery');
const loadMoreRef = document.querySelector('.load-more');


let searchReq = '';
let page = 1;

inputRef.addEventListener('input', createReq);
formRef.addEventListener('submit', onFormSubmit);
loadMoreRef.addEventListener('click', loadMoreImg);

function createReq(e) {
    searchReq = e.target.value.trim();
    // console.log(searchReq);
}

function onFormSubmit(e) {
    e.preventDefault();
    clearMarkup();
    resetPage();
    hideLoadBtn();

    getImgs(searchReq, page).then(result => {
        if (result.hits.length === 0) {
            onFormError();
            return;
        };
        buildMarkup(result.hits);
        showLoadBtn();
    });
  
};

function loadMoreImg() {
    incrementPage();
    getImgs(searchReq, page).then(result => {
        if (result.hits.length === 0) {
            hideLoadBtn();
            onLoadError();
            return;
        };
        buildMarkup(result.hits);
    }).catch(() => {
        onLoadError();
        hideLoadBtn();
    });

}

function buildMarkup(arr) {
    const markup = arr.map(el => {
        return `<div class="photo-card">
            <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" width="348px" height="232px"/>
            <div class="info">
            <p class="info-item">
                <b>Likes</b>${el.likes}
                </p>
                <p class="info-item">
                <b>Views</b>${el.views}
                </p>
                <p class="info-item">
                <b>Comments</b>${el.comments}
                </p>
                <p class="info-item">
                <b>Downloads</b>${el.downloads}
                </p>
            </div>
            </div>`
    }).join('');
    // console.log(markup);
    galleryRef.insertAdjacentHTML('beforeend', markup);
};


function onFormError() {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
};

function onLoadError() {
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
}

function clearMarkup() {
    galleryRef.innerHTML = '';
};

function resetPage() {
    page = 1;
};
function incrementPage() {
    page += 1;
};

function showLoadBtn() {
    loadMoreRef.classList.remove('is-hidden');
}

function hideLoadBtn() {
    loadMoreRef.classList.add('is-hidden');
}
// const lightbox = new SimpleLightbox('.gallery a');

