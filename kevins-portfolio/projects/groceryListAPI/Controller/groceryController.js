const grocery = require('../model/groceryModel');
const Grocery = require('../model/groceryModel');

//Routes
/*
  Creates a document on Mongo DB
*/
exports.createGroceryItem = async (req, res) => {
  try {
    const newGroceryItem = await Grocery.create(req.body);
    console.log(req.body);
    res.status(201).json({
      status: 'success',
      data: { data: newGroceryItem },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

/*
  Requests All documents on Mongo DB
*/
exports.getAllGrocery = async (req, res) => {
  try {
    const groceryList = await Grocery.find();
    res.status(200).json({
      message: 'hello from server',
      groceryList: groceryList,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

/*
  Updates One documents on Mongo DB
*/
exports.updateGroceryItem = async (req, res) => {
  const updatedItem = await grocery.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  try {
    res.status(200).json({
      status: 'Success',
      data: {
        groceryListItem: updatedItem,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

/*
  Deletes all documents on Mongo DB
*/
exports.deleteAllGrocery = async (req, res) => {
  try {
    await Grocery.deleteMany({});
    res.status(200).json({
      message: 'Success',
      groceryList: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'List is already empty',
      message: err,
    });
  }
};
