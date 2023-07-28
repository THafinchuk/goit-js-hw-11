export default function createMarkup(images) {
    return images
        .map(
        ({
            tags,
            webformatURL,
            largeImageURL,
            likes,
            views,
            comments,
            downloads,
        }) => {
            return  `
    <a href='${largeImageURL}' class="card-link ">
    <div class="photo-card">
    <img class="photo" src="${webformatURL}" alt="${tags}"  />
    <div class="info">
        <p class="info-item">
        <b>Likes</b> ${likes}
        </p>
        <p class="info-item">
        <b>Views</b> ${views}
        </p>
        <p class="info-item">
        <b>Comments</b> ${comments}
        </p>
        <p class="info-item">
        <b>Downloads</b> ${downloads}
        </p>
    </div>
    </div>
    </a>`;
    }).join('');
    }