import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


function clearMarkup() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function renderCountryList(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
    return;
  }

  const markup = countries.map(country => `
    <li class="country-item">
      <img class="country-flag" src="${country.flags.svg}" alt="${country.name.official} flag" />
      <span class="country-name">${country.name.official}</span>
    </li>
  `).join('');

  countryList.innerHTML = `<ul class="country-list">${markup}</ul>`;
}

function renderCountryInfo(country) {
  const { name, capital, population, languages, flags } = country;

  const languageList = languages.map(lang => lang.name).join(', ');

  const markup = `
    <div class="country-info">
      <img class="country-flag" src="${flags.svg}" alt="${name.official} flag" />
      <h2 class="country-name">${name.official}</h2>
      <p><span class="info-label">Capital:</span> ${capital}</p>
      <p><span class="info-label">Population:</span> ${population}</p>
      <p><span class="info-label">Languages:</span> ${languageList}</p>
    </div>
  `;

  countryInfo.innerHTML = markup;
}

function handleSearchInput() {
  const searchQuery = searchBox.value.trim();

  if (!searchQuery) {
    clearMarkup();
    return;
  }

  fetchCountries(searchQuery)
    .then(data => {
      if (data.length === 0) {
        Notiflix.Notify.warning('Oops, there is no country with that name.');
        clearMarkup();
      } else if (data.length === 1) {
        renderCountryInfo(data[0]);
      } else {
        renderCountryList(data);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(error.message);
      clearMarkup();
    });
}

searchBox.addEventListener('input', debounce(handleSearchInput, 300));