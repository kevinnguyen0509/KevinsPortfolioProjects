const express = require('express');
const groceryController = require('../Controller/groceryController');
const grocery = require('../model/groceryModel');

const router = express.Router();

router
  .route('/')
  .get(groceryController.getAllGrocery)
  .post(groceryController.createGroceryItem)
  .delete(groceryController.deleteAllGrocery);

router.route('/:id').patch(groceryController.updateGroceryItem);

module.exports = router;
