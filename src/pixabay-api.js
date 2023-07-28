import axios from "axios";
export default class PixabayService {
    constructor() {
        this.searchQuery = ``;
        this.page = 1;
        this.per_page = 40;
        this.totalPages = 0;
        this.totalHits = 0;
        
    }
async fetchArticles(searchQuery) {
const url = `https://pixabay.com/api/`
    const options = {
        params: {
            key: `38512474-065f753b6f78a80fa44ba3db6`,
            q: this.searchQuery,
            image_type: `photo`,
            orientation: `horizontal`,
            safesearch: `true`,
            per_page: this.per_page,
            page: this.page,
        }
    };
    const { data } = await axios.get(url, options);
    return data;

    }
    get query() {
        return this.searchQuery;
    };

    set query(newQuery) { 
        return this.searchQuery = newQuery;
    };
    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }

    hasMorePhotos() {
        return this.page * this.per_page;
    }

};