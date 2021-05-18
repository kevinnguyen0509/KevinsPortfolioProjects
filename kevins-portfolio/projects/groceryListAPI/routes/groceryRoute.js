const express = require('express');
const groceryController = require('../Controller/groceryController');

const router = express.Router();

router.route('/').get(groceryController.getAllGrocery);

module.exports = router;
