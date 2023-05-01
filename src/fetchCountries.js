export function fetchCountries(name) {
  const BASE_URL = `https://restcountries.com/v3.1/all`;
   return fetch(
    `${BASE_URL}/?fields=name,capital,population,languages,flags`
  ).then(response => {
    if (!response.ok) {
      throw new Error('Country not found');
    }

    return response.json();
  });
}
fetchCountries()
  .then(data => console.log(data))
  .catch(err => console.log(err));
