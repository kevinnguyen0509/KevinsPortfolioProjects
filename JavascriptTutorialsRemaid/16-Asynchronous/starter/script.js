'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// ///////////////////////////////////////
const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${data.population}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].code}</p>
    </div>
    </article>
    `;

  //countriesContainer.innerHTML = html;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   countriesContainer.style.opacity = 1;
// };

// const request = fetch('https://restcountries.eu/rest/v2/name/portugal');

// const getJSON = function (url, errorMessage = 'Something went wrong') {
//   return fetch(url).then(response => {
//     console.log(response);
//     if (!response.ok) {
//       throw new Error(`Country not found ${response.status}`);
//     }
//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   getJSON(
//     `https://restcountries.eu/rest/v2/name/${country}`,
//     'Country not found'
//   )
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbor = data[0].borders[0];

//       if (!neighbor) throw new Error('No neighbour found!');

//       //country 2
//       return getJSON(
//         `https://restcountries.eu/rest/v2/alpha/${neighbor}`,
//         'Country not found '
//       );
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥`);
//       renderError(`Something went wrong: ${err.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('australia');
// });

// const lotteryPromise = new Promise(function (resolve, reject) {
//   if (Math.random() >= 0.5) {
//     resolve('You WIN! 💰');
//   } else {
//     reject('You lost. 💩');
//   }
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(position => console.log(position));

const whereAmI = async function (country) {
  const pos = await getPosition();
  const { latitude: lat, Longitude: lng } = pos.coords;

  const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  const dataGeo = await resGeo.json();
  console.log(dataGeo);

  const res = await fetch(
    `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
  );
  //console.log(res);
  const data = await res.json();
  //console.log(data);

  renderCountry(data[0]);
};

whereAmI('portugal');
