const inputSearch = document.querySelector('#search-input')
const buttonSearch = document.querySelector('#button')
const resultSearch = document.querySelector('#result-search') 
const prevPageBtn = document.querySelector('#prev-page');
const nextPageBtn = document.querySelector('#next-page');
const currentPageSpan = document.querySelector('#current-page')

let currentPage = 1;
let maxPages = 1;
const imagesPerPage = 20;

async function searchImages(query, page) {   
    const apiKey = '16b2c0273e35ae2b8d6110cd7ac4a62c'
    const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&page=${page}&per_page=${imagesPerPage}&format=json&nojsoncallback=1`;
    
    try {
        const resp = await fetch(apiUrl)
        const data = await resp.json()
        const photos = await data.photos.photo;
        maxPages = data.photos.pages;

        resultSearch.innerHTML = '';

        photos.forEach(photo => {
            const imageCard = document.createElement('div');
            imageCard.classList.add('image-card');

            const image = document.createElement('img');
            image.src = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
    
            imageCard.appendChild(image);
            resultSearch.appendChild(imageCard)
            
        })
      
        currentPageSpan.textContent = `Страница ${currentPage}`;
       
            
    } catch (err) {
     console.error('Ошибк@', err)
    }
}

buttonSearch.addEventListener('click', () => {

    currentPage = 1;
    resultSearch.innerHTML = '';
    resultSearch.style.display = 'block'
    const query = inputSearch.value;
    searchImages(query);
    
})

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        searchImages(inputSearch.value, currentPage);
    }
});

nextPageBtn.addEventListener('click', () => {
    if (currentPage < maxPages) {
        currentPage++;
        searchImages(inputSearch.value, currentPage);
    }
});

searchImages('', currentPage);

