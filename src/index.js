import axios from "axios";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from  "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import PixabayService from "./pixabay-api";
import createMarkup from "./markup";

const form = document.querySelector(`.search-form`);
const input = document.querySelector(`input`);
const button = document.querySelector(`button`);
const div = document.querySelector(`.gallery`);
const btnLoadMore = document.querySelector(`.load-more`);

const notifyInit = {
    width: '450px',
    heigh: '100px',
    position: 'center-center',
    timeout: 2000,
    fontSize: '20px',

};

const pixabayApi = new PixabayService();


let lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
});

form.addEventListener(`submit`, onSearch);
btnLoadMore.addEventListener(`click`, onLoadMore);

btnLoadMore.style.visibility = `hidden`;


async function onSearch(e) {
    e.preventDefault();
    // console.log(`submit`);
    pixabayApi.searchQuery = e.currentTarget.elements.searchQuery.value;
    pixabayApi.resetPage();
    const img = await pixabayApi.fetchArticles();
    const images = img.hits;
    // console.log(images);
    const getImages = images.length;
    const totalHits = img.totalHits;
    // console.log(totalHits);
    
        // const totalImages = pixabayApi.hasMorePhotos();
        // console.log(totalImages);
    if (totalHits === getImages) {
        btnLoadMore.style.visibility = `hidden`;
        Notify.info("We're sorry, but you've reached the end of search results.", notifyInit);
    }
    else 
    btnLoadMore.style.visibility = `visible`;
    // console.log(images);
try {
    if (images.length === 0) {
        form.reset();
        div.innerHTML = '';
        btnLoadMore.style.visibility = `hidden`;
        Notify.info('Sorry, there are no images matching your search query. Please try again.', notifyInit);
        return;
    }
    // console.log(images);
    div.innerHTML = createMarkup(images);
    lightbox.refresh();
}
    catch { Report.failure('Sorry!Something went wrong', '', 'Okay',); }
finally {
    form.reset(); 
}   
};

const per_Page = pixabayApi.per_page;
// console.log(pixabayApi.per_page);


async function onLoadMore() {
btnLoadMore.style.visibility = `hidden`;
pixabayApi.incrementPage();
const img = await pixabayApi.fetchArticles();
const images = img.hits;
const totalHits = img.totalHits;
// console.log(totalHits);
    const allImages = pixabayApi.hasMorePhotos();
    // console.log(allImages);

    if ((totalHits - allImages) < per_Page) {
    div.innerHTML += createMarkup(images);
    lightbox.refresh();
    Notify.info("We're sorry, but you've reached the end of search results.", notifyInit);
    btnLoadMore.style.visibility = `hidden`;
    return;
    }

    try {
    div.innerHTML += createMarkup(images);
    lightbox.refresh();
    btnLoadMore.style.visibility = `visible`;
    }
    catch {
        Report.failure('Sorry!Something went wrong', '', 'Okay',);
    }
    
}