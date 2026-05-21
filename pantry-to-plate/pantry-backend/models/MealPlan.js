const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema(
  {
    weekLabel: { type: String, default: 'This Week' },
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('MealPlan', mealPlanSchema);
