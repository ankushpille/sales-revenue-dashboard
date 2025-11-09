const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
  date: String,
  product: String,
  category: String,
  region: String,
  quantity: Number,
  revenue: Number
});

module.exports = mongoose.model("Sales", SalesSchema);
