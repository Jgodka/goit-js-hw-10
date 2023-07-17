import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const ref = {
  breedSelectEl: document.querySelector('.breed-select'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
  catInfoEl: document.querySelector('.cat-info'),
};

const { breedSelectEl, loaderEl, errorEl, catInfoEl } = ref;

hiddenEl(errorEl);

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
    hiddenEl(loaderEl);
    catInfoEl.hidden = true;
  })
  .catch(onFetchError);

breedSelectEl.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
  catInfoEl.hidden = false;
  hiddenEl(loaderEl);
  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      const { url, breeds } = data[0];
      createMarkup(url, breeds);

      hiddenEl(loaderEl);
    })
    .catch(onFetchError);
}

function createMarkup(url, breeds) {
  return (catInfoEl.innerHTML = `<div class="box-img"><img src="${url}" 
      alt="${breeds[0].name}" width="400"/></div>
      <div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p>
      <p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`);
}

function onFetchError(error) {
  hiddenEl(loaderEl);
  hiddenEl(breedSelectEl);
  Notify.failure('Oops! Something went wrong! Try reloading the page!', {
    position: 'center-center',
    timeout: 5000,
    width: '400px',
    fontSize: '24px',
  });
}

function hiddenEl(el) {
  el.classList.toggle('hidden-el');
}
