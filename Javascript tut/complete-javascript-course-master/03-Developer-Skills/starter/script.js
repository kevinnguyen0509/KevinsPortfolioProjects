// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const arrayOne = [17, 21, 23];
const arrayTwo = [12, 5, -5, 0, 4];

//1 ) Needs to print "...17 Celsius in 1 days...21Celcius in 2 days...23Celcius 3 in days..."
//2) create a funtion called printForecast which takes an array and logs a string like above into the console.

const printForecast = function (arrayOfTemperatures) {
  for (let i = 0; i < arrayOfTemperatures.length; i++) {
    console.log(
      `...${arrayOfTemperatures[i]} Celsius in ${parseInt(i) + 1} day(s)`
    );
  }
};

printForecast(arrayTwo);

// const measureKelvin = function () {
//   const measurement = {
//     type: 'temp',
//     unit: 'celsius',
//     value: prompt('Degrees Celsius:'),
//   };
//   //console.table(measurement);
//   const kelvin = parseInt(measurement.value) + 273;
//   return kelvin;
// };

// console.log(measureKelvin());

/********************************************************* */
// const temperatureForTheDay = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
// let lowestTemp = temperatureForTheDay[0];
// let highestTemp = temperatureForTheDay[0];

// const calcTemp = (temperatureForTheDay) => {
//   for (let i = 0; i < temperatureForTheDay.length; i++) {
//     if (lowestTemp > temperatureForTheDay[i]) {
//       lowestTemp = temperatureForTheDay[i];
//     } else if (highestTemp < temperatureForTheDay[i]) {
//       highestTemp = temperatureForTheDay[i];
//     }
//   }
//   console.log('Highest: ' + highestTemp + ' Lowest: ' + lowestTemp);
//   console.log('The Amplitude is: ' + (highestTemp - lowestTemp));
// };

// calcTemp(temperatureForTheDay);
