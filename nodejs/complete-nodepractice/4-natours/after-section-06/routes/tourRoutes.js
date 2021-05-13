const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

// router.param('id', tourController.checkID); //Checks if the Id is valid and if it's in the database. Id's over the length are the array are not valid

router
  .route('/top-5-tours')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
