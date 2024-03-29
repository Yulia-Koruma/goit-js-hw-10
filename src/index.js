import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const selector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
catInfo.classList.add('is-hidden');

let arrBreedsId = [];
fetchBreeds()
.then(data => {
    data.forEach(element => {
        arrBreedsId.push({text: element.name, value: element.id});
    });
    new SlimSelect({
        select: selector,
        data: arrBreedsId
    });
    })
.catch(onFetchError);

selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
    loader.classList.replace('is-hidden', 'loader');
    selector.classList.add('is-hidden');
    catInfo.classList.add('is-hidden');

    const breedId = event.currentTarget.value;
    fetchCatByBreed(breedId)
    .then(data => {
        loader.classList.replace('loader', 'is-hidden');
        selector.classList.remove('is-hidden');
        const { url, breeds } = data[0];
        
        catInfo.innerHTML = `<div class="img-container"><img src="${url}" alt="${breeds[0].name}" width="400" height="auto"/></div>
        <div class="text-container">
        <h1>${breeds[0].name}</h1>
        <p>${breeds[0].description}</p>
        <p class="temperament">Temperament: ${breeds[0].temperament}</p>
        </div>`
        catInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
};

function onFetchError() {
    selector.classList.remove('is-hidden');
    loader.classList.replace('loader', 'is-hidden');

    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 4000,
        width: '400px',
        fontSize: '24px'
    });
};
   




    