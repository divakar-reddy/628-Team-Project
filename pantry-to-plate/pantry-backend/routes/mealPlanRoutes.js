const express = require('express');
const router = express.Router();
const MealPlan = require('../models/MealPlan');
const Recipe = require('../models/Recipe');

// GET current meal plan (most recent)
router.get('/', async (req, res) => {
  try {
    let plan = await MealPlan.findOne().sort({ createdAt: -1 }).populate('recipes');
    if (!plan) {
      plan = await MealPlan.create({ weekLabel: 'This Week', recipes: [] });
    }
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch meal plan', error: err.message });
  }
});

// POST add a recipe to meal plan
router.post('/add/:recipeId', async (req, res) => {
  try {
    let plan = await MealPlan.findOne().sort({ createdAt: -1 });
    if (!plan) {
      plan = await MealPlan.create({ weekLabel: 'This Week', recipes: [] });
    }

    if (!plan.recipes.includes(req.params.recipeId)) {
      plan.recipes.push(req.params.recipeId);
      await plan.save();
    }

    const populated = await plan.populate('recipes');
    res.json(populated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add to meal plan', error: err.message });
  }
});

// DELETE remove a recipe from meal plan
router.delete('/remove/:recipeId', async (req, res) => {
  try {
    const plan = await MealPlan.findOne().sort({ createdAt: -1 });
    if (!plan) return res.status(404).json({ message: 'No meal plan found' });

    plan.recipes = plan.recipes.filter(
      (id) => id.toString() !== req.params.recipeId
    );
    await plan.save();

    const populated = await plan.populate('recipes');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove from meal plan', error: err.message });
  }
});

// GET aggregated shopping list from meal plan
router.get('/shopping-list', async (req, res) => {
  try {
    const plan = await MealPlan.findOne().sort({ createdAt: -1 }).populate('recipes');
    if (!plan || plan.recipes.length === 0) {
      return res.json({ items: [] });
    }

    const aggregated = {};
    plan.recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ing) => {
        const key = ing.name.toLowerCase().trim();
        if (aggregated[key]) {
          aggregated[key].quantity += ` + ${ing.quantity}`;
        } else {
          aggregated[key] = { name: ing.name, quantity: ing.quantity, unit: ing.unit };
        }
      });
    });

    res.json({ items: Object.values(aggregated) });
  } catch (err) {
    res.status(500).json({ message: 'Failed to generate shopping list', error: err.message });
  }
});

module.exports = router;
