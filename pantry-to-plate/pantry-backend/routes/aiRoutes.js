const express = require('express');
const router = express.Router();
const axios = require('axios');

// POST generate a recipe using Google Gemini AI
router.post('/generate', async (req, res) => {
  const { leftovers } = req.body;

  if (!leftovers || leftovers.trim() === '') {
    return res.status(400).json({ message: 'Please provide a list of ingredients' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    // Fallback mock response if no API key is configured
    return res.json({
      title: 'Chef AI Mock Recipe',
      description: 'A delicious recipe created from your leftovers.',
      category: 'Dinner',
      ingredients: leftovers.split(',').map((item) => ({
        name: item.trim(),
        quantity: '1',
        unit: 'portion',
      })),
      instructions:
        'Add your API key in the .env file to get real AI-generated recipes! For now, combine all ingredients in a pan, cook until done, and season to taste.',
      prepTime: '10 mins',
      cookTime: '20 mins',
      servings: 2,
      isAIGenerated: true,
    });
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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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
    res.status(500).json({ message: 'Failed to generate AI recipe. Please try again.', error: err.message });
  }
});

module.exports = router;
