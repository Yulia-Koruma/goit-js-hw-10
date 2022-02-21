import config from './configuration.json';
import Notiflix from 'notiflix';

export const fetchCountries = name => {
  return fetch(`${config.searchAPI}${name}${config.filterAPI}`).then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    }
    Notiflix.Notify.failure('Oops, there is no country with that name');
    return Promise.reject('Trouble');
  });

};

