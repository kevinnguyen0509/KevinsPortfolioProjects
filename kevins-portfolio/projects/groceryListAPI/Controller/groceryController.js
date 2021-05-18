//Routes
exports.getAllGrocery = (req, res) => {
  res.status(200).json({
    message: 'hello from server',
    app: 'Grocery List',
  });
};
