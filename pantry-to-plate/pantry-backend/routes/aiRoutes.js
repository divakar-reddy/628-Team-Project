const express = require('express');
const router = express.Router();
const axios = require('axios');

// Ingredient knowledge base for smart recipe generation
const PROTEINS = ['chicken', 'lamb', 'beef', 'paneer', 'tofu', 'eggs', 'fish', 'shrimp', 'prawn', 'mutton', 'pork', 'tuna', 'salmon', 'lentils', 'chickpeas', 'dal'];
const VEGETABLES = ['spinach', 'tomato', 'onion', 'garlic', 'ginger', 'potato', 'cauliflower', 'broccoli', 'carrot', 'peas', 'mushroom', 'pepper', 'zucchini', 'eggplant', 'capsicum', 'corn', 'beans'];
const DAIRY = ['cream', 'yogurt', 'milk', 'butter', 'ghee', 'cheese', 'paneer'];
const SPICES = ['cumin', 'coriander', 'turmeric', 'garam masala', 'chili', 'cardamom', 'cinnamon', 'pepper', 'paprika', 'masala', 'saffron', 'cloves', 'bay leaf', 'mustard', 'fenugreek'];
const GRAINS = ['rice', 'pasta', 'noodles', 'bread', 'flour', 'quinoa', 'oats', 'barley'];

const RECIPE_STYLES = {
  indian: {
    keywords: ['paneer', 'ghee', 'masala', 'turmeric', 'cumin', 'cardamom', 'dal', 'naan', 'roti', 'biryani', 'tikka', 'curry', 'garam', 'fenugreek', 'mustard seeds'],
    cookingMethods: ['temper whole spices in ghee', 'make a bhuna masala base', 'slow cook to develop deep flavors', 'finish with garam masala'],
    titlePrefixes: ['Spiced', 'Masala', 'Tadka', 'Tikka', 'Achari'],
    category: 'Dinner',
  },
  italian: {
    keywords: ['pasta', 'tomato', 'basil', 'oregano', 'parmesan', 'olive oil', 'mozzarella', 'garlic'],
    cookingMethods: ['sauté garlic in olive oil', 'build a rich tomato base', 'finish with fresh herbs'],
    titlePrefixes: ['Rustic', 'Classic', 'Homemade', 'Creamy'],
    category: 'Dinner',
  },
  asian: {
    keywords: ['soy sauce', 'sesame', 'ginger', 'noodles', 'rice', 'tofu', 'bok choy', 'spring onion', 'hoisin'],
    cookingMethods: ['stir-fry on high heat', 'add sauces and toss quickly', 'garnish with sesame seeds'],
    titlePrefixes: ['Wok-Tossed', 'Stir-Fried', 'Quick', 'Glazed'],
    category: 'Quick Meals',
  },
};

function detectStyle(items) {
  const text = items.join(' ').toLowerCase();
  let bestMatch = null;
  let bestScore = 0;
  for (const [style, config] of Object.entries(RECIPE_STYLES)) {
    const score = config.keywords.filter(k => text.includes(k)).length;
    if (score > bestScore) { bestScore = score; bestMatch = style; }
  }
  return bestMatch || 'default';
}

function categorize(items) {
  const text = items.join(' ').toLowerCase();
  return {
    proteins: PROTEINS.filter(p => text.includes(p)),
    vegetables: VEGETABLES.filter(v => text.includes(v)),
    dairy: DAIRY.filter(d => text.includes(d)),
    spices: SPICES.filter(s => text.includes(s)),
    grains: GRAINS.filter(g => text.includes(g)),
  };
}

function buildRecipe(items) {
  const style = detectStyle(items);
  const groups = categorize(items);
  const styleConfig = RECIPE_STYLES[style];

  const mainProtein = groups.proteins[0] || items[0];
  const mainVeg = groups.vegetables[0];
  const hasCreamy = groups.dairy.some(d => ['cream', 'yogurt', 'milk'].includes(d));
  const hasSauce = groups.dairy.length > 0;

  // Build a title that reflects actual ingredients
  const titleAdjective = styleConfig
    ? styleConfig.titlePrefixes[Math.floor(items.length % styleConfig.titlePrefixes.length)]
    : (hasCreamy ? 'Creamy' : 'Pan-Seared');
  const titleMain = mainProtein.charAt(0).toUpperCase() + mainProtein.slice(1);
  const titleSub = mainVeg ? ` & ${mainVeg.charAt(0).toUpperCase() + mainVeg.slice(1)}` : '';
  const title = `${titleAdjective} ${titleMain}${titleSub}`;

  // Build dynamic description
  const flavors = groups.spices.length > 0
    ? `seasoned with ${groups.spices.slice(0, 2).join(' and ')}`
    : 'with aromatic pantry staples';
  const texture = hasCreamy ? 'rich and creamy' : 'bold and flavourful';
  const description = `A ${texture} dish featuring ${mainProtein}${mainVeg ? ` and ${mainVeg}` : ''}, ${flavors}.`;

  // Determine category
  const category = groups.grains.includes('rice') || groups.grains.includes('pasta')
    ? 'Dinner'
    : (styleConfig?.category || 'Quick Meals');

  // Build smart ingredient list with sensible quantities
  const ingredientList = items.map((item) => {
    const lower = item.toLowerCase();
    if (PROTEINS.some(p => lower.includes(p))) return { name: item, quantity: '300', unit: 'g' };
    if (SPICES.some(s => lower.includes(s))) return { name: item, quantity: '1', unit: 'tsp' };
    if (['cream', 'yogurt', 'milk'].some(d => lower.includes(d))) return { name: item, quantity: '1/2', unit: 'cup' };
    if (['butter', 'ghee', 'oil'].some(d => lower.includes(d))) return { name: item, quantity: '2', unit: 'tbsp' };
    if (VEGETABLES.some(v => lower.includes(v))) return { name: item, quantity: '2', unit: 'medium' };
    if (lower.includes('garlic')) return { name: item, quantity: '4', unit: 'cloves' };
    if (lower.includes('ginger')) return { name: item, quantity: '1', unit: 'inch' };
    return { name: item, quantity: '1', unit: 'cup' };
  });
  ingredientList.push({ name: 'Salt', quantity: 'to taste', unit: '' });
  ingredientList.push({ name: 'Oil', quantity: '2', unit: 'tbsp' });

  // Build step-by-step instructions specific to the ingredients
  const steps = [];
  steps.push(`1. Prepare all ingredients: chop ${items.slice(0, 3).join(', ')} into even pieces and set aside.`);

  if (groups.spices.length > 0 || style === 'indian') {
    steps.push(`2. Heat oil or ghee in a heavy pan over medium heat. ${styleConfig?.cookingMethods[0] || 'Add aromatics'} — add ${groups.spices.slice(0, 2).join(', ') || 'cumin seeds'} and let sizzle for 30 seconds.`);
  } else {
    steps.push(`2. Heat oil in a pan over medium heat until shimmering.`);
  }

  if (groups.proteins.length > 0) {
    steps.push(`3. Add the ${groups.proteins[0]} and sear on medium-high heat for 4-5 minutes until lightly browned on all sides.`);
  }

  if (groups.vegetables.length > 0) {
    steps.push(`4. Add ${groups.vegetables.slice(0, 3).join(', ')} and sauté for 3-4 minutes until softened.`);
  } else {
    steps.push(`4. Add the remaining ingredients and cook for 3-4 minutes, stirring frequently.`);
  }

  if (hasCreamy) {
    const creamyIngredient = groups.dairy.find(d => ['cream', 'yogurt', 'milk'].includes(d)) || 'cream';
    steps.push(`5. Reduce heat to low. Add the ${creamyIngredient} and stir gently to combine. ${style === 'indian' ? 'Add 1 tsp garam masala.' : 'Simmer until sauce coats the back of a spoon.'}`);
  } else {
    steps.push(`5. Season generously with salt and any remaining spices. Stir well to coat all ingredients evenly.`);
  }

  steps.push(`6. Cover and cook on low heat for ${groups.proteins.length > 0 ? '10-12' : '6-8'} minutes until everything is cooked through.`);

  if (groups.grains.length > 0) {
    steps.push(`7. Serve over cooked ${groups.grains[0]} or alongside warm bread.`);
  } else if (style === 'indian') {
    steps.push(`7. Garnish with fresh coriander leaves. Serve hot with naan or steamed basmati rice.`);
  } else {
    steps.push(`7. Taste and adjust seasoning. Garnish as desired and serve immediately.`);
  }

  const prepTime = `${10 + items.length * 2} mins`;
  const cookTime = groups.proteins.length > 0 ? '25 mins' : '15 mins';

  return { title, description, category, ingredients: ingredientList, instructions: steps.join('\n'), prepTime, cookTime, servings: 2, isAIGenerated: true };
}

// POST generate a recipe using Google Gemini AI
router.post('/generate', async (req, res) => {
  const { leftovers } = req.body;

  if (!leftovers || leftovers.trim() === '') {
    return res.status(400).json({ message: 'Please provide a list of ingredients' });
  }

  const items = leftovers.split(',').map((i) => i.trim()).filter(Boolean);
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return res.json(buildRecipe(items));
  }

  try {
    const prompt = `You are a professional chef. Create a complete recipe using ONLY these ingredients (plus basic pantry staples like salt, pepper, oil, water): ${leftovers}.

Respond ONLY with a valid JSON object in this exact format:
{
  "title": "Recipe Name",
  "description": "Brief one-sentence description",
  "category": "Dinner",
  "ingredients": [
    { "name": "ingredient name", "quantity": "amount", "unit": "unit" }
  ],
  "instructions": "Step by step instructions as a single string with numbered steps.",
  "prepTime": "X mins",
  "cookTime": "X mins",
  "servings": 2
}`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
      }
    );

    const rawText = response.data.candidates[0].content.parts[0].text;
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Could not parse AI response');

    const recipeData = JSON.parse(jsonMatch[0]);
    recipeData.isAIGenerated = true;
    res.json(recipeData);
  } catch (err) {
    console.error('AI generation error:', err.message);
    res.json(buildRecipe(items));
  }
});

module.exports = router;
