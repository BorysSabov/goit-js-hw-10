import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  const searchQuery = searchBox.value.trim();
  if (searchQuery === '') {
    clearMarkup();
    return;
  }
  fetchCountries(searchQuery)
    .then(countries => {
      clearMarkup();
      if (countries > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length >= 2 && countries.length <= 10) {
        renderCountriesList(countries);
      } else if (countries.length === 1) {
        renderCountryInfo(countries[0]);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      console.log(error);
    });
}

function clearMarkup() {
  countriesList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function renderCountriesList(countries) {
  const listMarkup = countries
    .map(country => {
      return `
      <li class="country-item">
        <img src="${country.flags.svg}" alt="${country.name.official} flag" class="country-flag">
        <p class="country-name">${country.name.official}</p>
      </li>
    `;
    })
    .join('');
  countriesList.innerHTML = listMarkup;
  countryInfo.innerHTML = '';
}
renderCountriesList('Ukraine');

function renderCountryInfo(country) {
  const infoMarkup = `
    <div class="country-card">
      <img src="${country.flags.svg}" alt="${
    country.name.official
  } flag" class="country-flag">
      <h2 class="country-name">${country.name.official}</h2>
      <p class="country-capital"><span>Capital:</span> ${country.capital}</p>
      <p class="country-population"><span>Population:</span> ${
        country.population
      }</p>
      <p class="country-languages"><span>Languages:</span> ${country.languages
        .map(language => language.name)
        .join(', ')}</p>
    </div>
  `;
  countryInfo.innerHTML = infoMarkup;
  countriesList.innerHTML = '';
}
