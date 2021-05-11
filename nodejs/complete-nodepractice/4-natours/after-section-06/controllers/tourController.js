/* eslint-disable node/no-unsupported-features/es-syntax */
const Tour = require('./../models/tourModel');

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tours: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'Message failed',
      message: err
    });
  }
};

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find(req.query);

    // const tours = await Tour.find()
    //   .where('duration')
    //   .lt(10)
    //   .where('difficulty')
    //   .equals('easy');

    res.status(200).json({
      status: 'Success',
      results: tours.length,
      data: {
        tours: tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: 'Oops nothing to bring back'
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: 'Tour not found'
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour: tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err
    });
  }
};
