const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
require('dotenv').config();

// Paste the JSON array from above here:
const recipeData = [
  [
  {
    "title": "Lemon Herb Roast Chicken",
    "description": "A classic, juicy roast chicken with bright lemon and earthy rosemary.",
    "category": "Dinner",
    "ingredients": [
      { "name": "Chicken Breast", "quantity": "2 lbs" },
      { "name": "Lemon", "quantity": "2 whole" },
      { "name": "Garlic", "quantity": "4 cloves" },
      { "name": "Olive Oil", "quantity": "3 tbsp" },
      { "name": "Fresh Rosemary", "quantity": "2 sprigs" }
    ],
    "instructions": "Preheat oven to 400°F. Rub chicken with olive oil, minced garlic, chopped rosemary, and lemon juice. Roast for 25-30 minutes until cooked through."
  },
  {
    "title": "Vegan Coconut Chickpea Curry",
    "description": "A rich, creamy, and entirely plant-based curry that comes together in 30 minutes.",
    "category": "Vegan",
    "ingredients": [
      { "name": "Canned Chickpeas", "quantity": "1 can (15oz)" },
      { "name": "Coconut Milk", "quantity": "1 can (13oz)" },
      { "name": "Curry Powder", "quantity": "2 tbsp" },
      { "name": "Spinach", "quantity": "2 cups" },
      { "name": "Onion", "quantity": "1 medium" },
      { "name": "Garlic", "quantity": "2 cloves" }
    ],
    "instructions": "Sauté diced onion and garlic until soft. Add curry powder and stir. Pour in chickpeas and coconut milk. Simmer for 15 minutes, then stir in spinach until wilted."
  },
  {
    "title": "Classic Fluffy Pancakes",
    "description": "The ultimate weekend breakfast staple.",
    "category": "Breakfast",
    "ingredients": [
      { "name": "All-Purpose Flour", "quantity": "1.5 cups" },
      { "name": "Milk", "quantity": "1.25 cups" },
      { "name": "Egg", "quantity": "1 large" },
      { "name": "Butter", "quantity": "3 tbsp" },
      { "name": "Sugar", "quantity": "2 tbsp" }
    ],
    "instructions": "Whisk dry ingredients in one bowl and wet ingredients in another. Combine gently. Cook on a buttered skillet over medium heat until bubbles form, then flip."
  },
  {
    "title": "Garlic Parmesan Pasta",
    "description": "A quick, comforting, 4-ingredient weeknight dinner.",
    "category": "Dinner",
    "ingredients": [
      { "name": "Spaghetti", "quantity": "1 lb" },
      { "name": "Butter", "quantity": "4 tbsp" },
      { "name": "Garlic", "quantity": "4 cloves" },
      { "name": "Parmesan Cheese", "quantity": "1 cup grated" }
    ],
    "instructions": "Boil pasta in salted water. In a pan, melt butter and gently fry minced garlic. Toss cooked pasta into the garlic butter, remove from heat, and stir in parmesan."
  },
  {
    "title": "Berry Power Oatmeal",
    "description": "A hearty, vegan-friendly start to your day.",
    "category": "Breakfast",
    "ingredients": [
      { "name": "Rolled Oats", "quantity": "1 cup" },
      { "name": "Almond Milk", "quantity": "2 cups" },
      { "name": "Mixed Berries", "quantity": "1 cup" },
      { "name": "Maple Syrup", "quantity": "2 tbsp" }
    ],
    "instructions": "Bring almond milk to a boil. Stir in oats and reduce heat to low. Simmer for 5 minutes. Top with berries and a drizzle of maple syrup."
  },
  {
    "title": "Crispy Tofu Stir Fry",
    "description": "A high-protein, veggie-packed meal that beats takeout.",
    "category": "Vegan",
    "ingredients": [
      { "name": "Firm Tofu", "quantity": "1 block" },
      { "name": "Broccoli", "quantity": "1 head" },
      { "name": "Soy Sauce", "quantity": "3 tbsp" },
      { "name": "Olive Oil", "quantity": "2 tbsp" },
      { "name": "Onion", "quantity": "1 medium" }
    ],
    "instructions": "Press and cube tofu, then pan-fry in oil until crispy. Remove tofu, add chopped onions and broccoli to the pan. Cook until tender, return tofu, and toss with soy sauce."
  }
]
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://diva:divareddy31@panda.tcdvs4o.mongodb.net/')
  .then(async () => {
    console.log('MongoDB connected. Clearing old recipes...');
    await Recipe.deleteMany({}); // Clears the database to prevent duplicates
    
    console.log('Inserting new recipes...');
    await Recipe.insertMany(recipeData);
    
    console.log('Database successfully seeded!');
    process.exit();
  })
  .catch(err => {
    console.error('Error seeding data:', err);
    process.exit(1);
  });