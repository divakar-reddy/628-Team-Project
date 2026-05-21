const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  unit: { type: String, default: '' },
});

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    category: {
      type: String,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Vegan', 'Quick Meals'],
      default: 'Dinner',
    },
    ingredients: { type: [ingredientSchema], default: [] },
    instructions: { type: String, required: true },
    prepTime: { type: String, default: '' },
    cookTime: { type: String, default: '' },
    servings: { type: Number, default: 2 },
    imageUrl: { type: String, default: '' },
    isAIGenerated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeSchema);
