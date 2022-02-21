import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';

const refs = {
  inputName: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;

const countries = arrayCountries => {
  console.log(arrayCountries);
  const markup = arrayCountries
    .map(
      ({ name, flags }) =>
        `<li class='country_in-list'>
        <img src="${flags.svg}" alt="${name.common}" width='40px'>
        ${name.common}</li>`,
    )
    .join('');
  refs.countryList.innerHTML += markup;
};

const countryDescript = arrayCountries => {

  const markup = arrayCountries.map(({ flags, name, capital, population, languages }) => {
    let arrLanguages = [];
    for (const i in languages) arrLanguages.push(languages[i]);
    let list = `<ul class='country'>
            <li class='country_name'>
            <img src="${flags.png}" alt="${name.common}" width='40px'>
            ${name.common}</li>
            <li><span class='country_key'>Capital:</span> ${capital}</li>
            <li><span class='country_key'>Population:</span> ${population}</li>
            <li><span class='country_key'>Language:</span> ${arrLanguages.join(', ')}</li>
        </ul>`;
    return list;
  });
  refs.countryInfo.innerHTML = markup;
};

const arrayClear = () => {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
};

const handler = () => {
  const inputValue = refs.inputName.value.trim();
  if (!inputValue) {
    arrayClear();
  } else {
    fetchCountries(refs.inputName.value)
      .then(data => {
        if (data.length > 10) {
          arrayClear();
          Notiflix.Notify.success(
            'Too many matches found. Please enter a more specific name',
          );
        }
        if (data.length <= 10 && data.length > 1) {
          arrayClear();
          countries(data);
        }
        if (data.length === 1) {
          arrayClear();
          countryDescript(data);
        }
      })
      .catch(err => {
        arrayClear();
        console.log(err);
      });
  }
};
refs.inputName.addEventListener('input', debounce(handler, DEBOUNCE_DELAY));