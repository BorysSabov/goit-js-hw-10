function fetchCountries(name) {
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
// fetchCountries()
//   .then(data => console.log(data))
//   .catch(err => console.log(err));
// function fetchCountries(name) {
//   const BASE_URL = 'https://restcountries.com/v3.1/all';
//   const fields = 'name,capital,population,languages,flags';
//   const url = `${BASE_URL}/?fields=${fields}`;

//   return fetch(url)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Country not found');
//       }

//       return response.json();
//     });
// }

export { fetchCountries };