const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
  date: { type: String, required: true, index: true },
  product: { type: String, required: true, index: true },
  category: { type: String, required: true, index: true },
  region: { type: String, required: true, index: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, min: 0 },
  revenue: { type: Number, required: true, min: 0 }
}, {
  timestamps: true
});

// Compound indexes for better query performance
SalesSchema.index({ date: 1, region: 1 });
SalesSchema.index({ category: 1, product: 1 });

module.exports = mongoose.model("Sales", SalesSchema);
