/* eslint-disable node/no-unsupported-features/es-syntax */
//const { query } = require('express');
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
    //get a shallow copy
    //1A) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach(el => delete queryObj[el]);

    //1b)Advance filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    //console.log(req.query, queryObj); //Deletes page, sort, limit, and fields from url

    let query = Tour.find(JSON.parse(queryStr));

    //2)sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');

      query = query.sort(req.query.sort);
    } else {
      query = query.sort('-_id');
    }

    //3)field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //4) pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    //ex. Limit: 10:: page:(1) 1-10, Page:(2) 11 -20 etc...
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) {
        throw new Error('This page does not exisit');
      }
    }

    const tours = await query;

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
      message: err
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
