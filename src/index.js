import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_x76JxnLI3XMUem2hlw5jx67EnS5Spg9WzmVb7V5y3PneYGD3bESCqP8yUlkgIF9Q';

const ref = {
  breedSelectEl: document.querySelector('.breed-select'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
  catInfoEl: document.querySelector('.cat-info'),
};
const { breedSelectEl, loaderEl, errorEl, catInfoEl } = ref;
loaderEl.classList.add('is-hidden');
errorEl.classList.add('is-hidden');
catInfoEl.classList.add('is-hidden');

let arrBreedsId = [];
fetchBreeds()
  .then(data => {
    data.forEach(element => {
      arrBreedsId.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: breedSelectEl,
      data: arrBreedsId,
    });
  })
  .catch(onFetchError);

breedSelectEl.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
  loaderEl.classList.replace('loader', 'is-hidden');
  breedSelectEl.classList.add('is-hidden');
  catInfoEl.classList.add('is-hidden');

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      loaderEl.classList.replace('loader', 'is-hidden');
      breedSelectEl.classList.remove('is-hidden');
      const { url, breeds } = data[0];

      catInfoEl.innerHTML = `<div class="box-img"><img src="${url}" 
      alt="${breeds[0].name}" width="400"/></div>
      <div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p>
      <p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
      catInfoEl.classList.remove('is-hidden');
    })
    .catch(onFetchError);
}
function onFetchError(error) {
  breedSelectEl.classList.remove('is-hidden');
  loaderEl.classList.replace('loader', 'is-hidden');

  Notify.failure('Oops! Something went wrong! Try reloading the page!', {
    position: 'center-center',
    timeout: 5000,
    width: '400px',
    fontSize: '24px',
  });
}
