const fs = require('fs');
const { router } = require('../app');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, resp, next, val) => {
  //console.log(`Id: ${val}`);

  if (req.params.id * 1 > tours.length) {
    return resp.status(404).json({
      status: 'fail',
      message: 'Invalid id'
    });
  }
  next();
};

exports.checkBody = (req, resp, next) => {
  if (!req.body.name || !req.body.price) {
    return resp.status(400).json({
      status: 'failed',
      message: 'Missing name or price'
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'Success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours
    }
  });
};

exports.getTour = (req, res) => {
  //console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'success',

    data: {
      tour: tour
    }
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour
        }
      });
    }
  );
};

exports.updateTour = (req, resp) => {
  resp.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour here..'
    }
  });
};

exports.deleteTour = (req, resp) => {
  resp.status(204).json({
    status: 'success',
    data: null
  });
};
