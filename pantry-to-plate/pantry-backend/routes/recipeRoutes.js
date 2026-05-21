const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// GET all recipes with optional search & category filter
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { 'ingredients.name': { $regex: search, $options: 'i' } },
      ];
    }
    if (category) {
      query.category = category;
    }

    const recipes = await Recipe.find(query).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch recipes', error: err.message });
  }
});

// GET single recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch recipe', error: err.message });
  }
});

// POST create a new recipe
router.post('/', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    const saved = await recipe.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create recipe', error: err.message });
  }
});

// PUT update a recipe
router.put('/:id', async (req, res) => {
  try {
    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Recipe not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update recipe', error: err.message });
  }
});

// DELETE a recipe
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete recipe', error: err.message });
  }
});

module.exports = router;
