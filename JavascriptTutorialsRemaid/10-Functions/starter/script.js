'use strict';

// const bookings = [];

// const createBooking = function (flightNum, numPassengers = 1, price = 199) {
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 800);

const flight = 'LH234';
const kevin = {
  name: 'Kevin Nguyen',
  passport: 321468745132,
};

const checkin = function (flightNum, passenger) {
  flightNum = 64546;
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport === 654654) alert('Checked in');
  else {
    alert('Wrong passport');
  }
};
checkin(flight, kevin);
console.log(flight);
console.log(kevin);
