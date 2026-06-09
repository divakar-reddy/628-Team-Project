const mongoose = require('mongoose');
require('dotenv').config();

const Recipe = require('./models/Recipe');

const recipes = [
  {
    title: 'Chicken Tikka Masala',
    description: 'Creamy, spiced tomato-based curry with tender grilled chicken pieces.',
    category: 'Dinner',
    prepTime: '20 mins',
    cookTime: '35 mins',
    servings: 4,
    isAIGenerated: false,
    ingredients: [
      { name: 'Chicken breast', quantity: '500', unit: 'g' },
      { name: 'Yogurt', quantity: '1/2', unit: 'cup' },
      { name: 'Garam masala', quantity: '2', unit: 'tsp' },
      { name: 'Cumin powder', quantity: '1', unit: 'tsp' },
      { name: 'Coriander powder', quantity: '1', unit: 'tsp' },
      { name: 'Turmeric powder', quantity: '1/2', unit: 'tsp' },
      { name: 'Kashmiri red chili powder', quantity: '2', unit: 'tsp' },
      { name: 'Tomato puree', quantity: '1', unit: 'cup' },
      { name: 'Heavy cream', quantity: '1/2', unit: 'cup' },
      { name: 'Garlic', quantity: '5', unit: 'cloves' },
      { name: 'Fresh ginger', quantity: '1', unit: 'inch' },
      { name: 'Onion', quantity: '2', unit: 'medium' },
      { name: 'Butter', quantity: '2', unit: 'tbsp' },
      { name: 'Salt', quantity: '1', unit: 'tsp' },
    ],
    instructions: `1. Marinate chicken in yogurt, 1 tsp garam masala, cumin, turmeric, chili powder, and salt for at least 1 hour.
2. Grill or pan-fry the marinated chicken until charred. Set aside.
3. In a pan, melt butter and sauté finely chopped onions until golden brown.
4. Add minced garlic and ginger, cook for 2 minutes.
5. Add tomato puree, remaining garam masala, coriander powder, and chili powder. Cook for 10 minutes.
6. Add heavy cream and stir well. Simmer for 5 minutes.
7. Add grilled chicken pieces to the sauce and cook for another 5 minutes.
8. Garnish with fresh coriander and serve with naan or basmati rice.`,
  },
  {
    title: 'Dal Tadka',
    description: 'Comforting yellow lentil soup tempered with aromatic whole spices and ghee.',
    category: 'Vegan',
    prepTime: '10 mins',
    cookTime: '30 mins',
    servings: 4,
    isAIGenerated: false,
    ingredients: [
      { name: 'Yellow toor dal (split pigeon peas)', quantity: '1', unit: 'cup' },
      { name: 'Ghee', quantity: '2', unit: 'tbsp' },
      { name: 'Cumin seeds', quantity: '1', unit: 'tsp' },
      { name: 'Mustard seeds', quantity: '1/2', unit: 'tsp' },
      { name: 'Asafoetida (hing)', quantity: '1/4', unit: 'tsp' },
      { name: 'Dried red chilies', quantity: '2', unit: 'whole' },
      { name: 'Turmeric powder', quantity: '1/2', unit: 'tsp' },
      { name: 'Tomato', quantity: '2', unit: 'medium' },
      { name: 'Garlic', quantity: '4', unit: 'cloves' },
      { name: 'Onion', quantity: '1', unit: 'medium' },
      { name: 'Salt', quantity: '1', unit: 'tsp' },
      { name: 'Fresh coriander', quantity: '2', unit: 'tbsp' },
    ],
    instructions: `1. Wash and pressure cook toor dal with turmeric and 3 cups of water for 3-4 whistles until soft.
2. Mash the cooked dal well and set aside.
3. In a pan, heat ghee over medium heat.
4. Add cumin seeds, mustard seeds, and dried red chilies. Let them splutter.
5. Add asafoetida, then chopped garlic and onions. Sauté until golden.
6. Add chopped tomatoes and cook until soft and mushy.
7. Pour the cooked dal into the pan and mix well. Add salt to taste.
8. Simmer for 5 minutes. Garnish with fresh coriander.
9. Drizzle extra ghee on top before serving with steamed rice.`,
  },
  {
    title: 'Paneer Butter Masala',
    description: 'Rich and velvety tomato-cashew gravy with soft cubes of cottage cheese.',
    category: 'Dinner',
    prepTime: '15 mins',
    cookTime: '30 mins',
    servings: 4,
    isAIGenerated: false,
    ingredients: [
      { name: 'Paneer', quantity: '250', unit: 'g' },
      { name: 'Butter', quantity: '3', unit: 'tbsp' },
      { name: 'Cashews', quantity: '15', unit: 'whole' },
      { name: 'Tomatoes', quantity: '4', unit: 'large' },
      { name: 'Onion', quantity: '2', unit: 'medium' },
      { name: 'Garlic', quantity: '5', unit: 'cloves' },
      { name: 'Fresh ginger', quantity: '1', unit: 'inch' },
      { name: 'Kashmiri chili powder', quantity: '1.5', unit: 'tsp' },
      { name: 'Garam masala', quantity: '1', unit: 'tsp' },
      { name: 'Sugar', quantity: '1', unit: 'tsp' },
      { name: 'Heavy cream', quantity: '1/4', unit: 'cup' },
      { name: 'Fenugreek leaves (kasuri methi)', quantity: '1', unit: 'tsp' },
      { name: 'Salt', quantity: '1', unit: 'tsp' },
    ],
    instructions: `1. Boil tomatoes with onions, garlic, ginger, and cashews for 15 minutes. Let cool.
2. Blend the mixture into a smooth puree and pass through a strainer.
3. Heat butter in a pan. Add the strained puree.
4. Add Kashmiri chili powder, garam masala, sugar, and salt. Cook for 10 minutes on low heat.
5. Add heavy cream and mix well.
6. Add cubed paneer and crushed kasuri methi. Stir gently.
7. Simmer for 5 minutes until paneer absorbs the flavors.
8. Serve hot with butter naan or jeera rice.`,
  },
  {
    title: 'Biryani with Whole Spices',
    description: 'Fragrant basmati rice layered with spiced meat and whole aromatic spices.',
    category: 'Dinner',
    prepTime: '30 mins',
    cookTime: '60 mins',
    servings: 6,
    isAIGenerated: false,
    ingredients: [
      { name: 'Basmati rice', quantity: '2', unit: 'cups' },
      { name: 'Chicken (bone-in)', quantity: '700', unit: 'g' },
      { name: 'Yogurt', quantity: '1', unit: 'cup' },
      { name: 'Bay leaves', quantity: '3', unit: 'whole' },
      { name: 'Green cardamom', quantity: '5', unit: 'pods' },
      { name: 'Black cardamom', quantity: '2', unit: 'pods' },
      { name: 'Cloves', quantity: '6', unit: 'whole' },
      { name: 'Cinnamon stick', quantity: '2', unit: 'inch' },
      { name: 'Star anise', quantity: '2', unit: 'whole' },
      { name: 'Mace (javitri)', quantity: '1', unit: 'blade' },
      { name: 'Saffron', quantity: '1/4', unit: 'tsp' },
      { name: 'Warm milk', quantity: '3', unit: 'tbsp' },
      { name: 'Caramelized onions', quantity: '1', unit: 'cup' },
      { name: 'Mint leaves', quantity: '1/2', unit: 'cup' },
      { name: 'Biryani masala', quantity: '2', unit: 'tbsp' },
      { name: 'Ghee', quantity: '4', unit: 'tbsp' },
      { name: 'Salt', quantity: '2', unit: 'tsp' },
    ],
    instructions: `1. Soak basmati rice for 30 minutes. Par-boil with whole spices (bay leaf, cardamom, cloves, cinnamon, star anise) until 70% cooked. Drain.
2. Marinate chicken in yogurt, biryani masala, salt, and half the caramelized onions for 1 hour.
3. In a heavy pot, cook the marinated chicken on medium heat for 15 minutes.
4. Dissolve saffron in warm milk.
5. Layer par-cooked rice over the chicken. Top with remaining caramelized onions, mint leaves, saffron milk, and ghee.
6. Seal the pot with foil and cook on low heat (dum) for 25-30 minutes.
7. Gently mix from the bottom before serving. Serve with raita.`,
  },
  {
    title: 'Chole Masala (Spiced Chickpeas)',
    description: 'Tangy, robust chickpea curry made with an earthy blend of Indian spices.',
    category: 'Vegan',
    prepTime: '10 mins',
    cookTime: '40 mins',
    servings: 4,
    isAIGenerated: false,
    ingredients: [
      { name: 'Chickpeas (canned or soaked)', quantity: '2', unit: 'cups' },
      { name: 'Onion', quantity: '2', unit: 'large' },
      { name: 'Tomatoes', quantity: '3', unit: 'medium' },
      { name: 'Garlic', quantity: '6', unit: 'cloves' },
      { name: 'Ginger', quantity: '1.5', unit: 'inch' },
      { name: 'Chole masala powder', quantity: '2', unit: 'tbsp' },
      { name: 'Cumin seeds', quantity: '1', unit: 'tsp' },
      { name: 'Anardana (dry pomegranate seeds)', quantity: '1', unit: 'tsp' },
      { name: 'Amchur (dry mango powder)', quantity: '1', unit: 'tsp' },
      { name: 'Black salt', quantity: '1/2', unit: 'tsp' },
      { name: 'Oil', quantity: '3', unit: 'tbsp' },
      { name: 'Fresh coriander', quantity: '3', unit: 'tbsp' },
    ],
    instructions: `1. Heat oil in a pressure cooker or deep pan. Add cumin seeds and let them splutter.
2. Add finely chopped onions and fry until deep brown.
3. Add ginger-garlic paste and cook for 2 minutes.
4. Add tomatoes and cook until oil separates from the masala.
5. Add chole masala, amchur, anardana, and black salt. Stir well.
6. Add chickpeas and 1.5 cups water. Pressure cook for 2 whistles or simmer for 25 minutes.
7. Mash a few chickpeas to thicken the gravy.
8. Garnish with coriander and serve with bhature or puri.`,
  },
  {
    title: 'Masala Chai Spice Blend Cookies',
    description: 'Buttery shortbread cookies infused with cardamom, cinnamon, and ginger.',
    category: 'Dessert',
    prepTime: '20 mins',
    cookTime: '12 mins',
    servings: 24,
    isAIGenerated: false,
    ingredients: [
      { name: 'All-purpose flour', quantity: '2', unit: 'cups' },
      { name: 'Butter (softened)', quantity: '1', unit: 'cup' },
      { name: 'Powdered sugar', quantity: '3/4', unit: 'cup' },
      { name: 'Ground cardamom', quantity: '1.5', unit: 'tsp' },
      { name: 'Ground cinnamon', quantity: '1', unit: 'tsp' },
      { name: 'Ground ginger', quantity: '1/2', unit: 'tsp' },
      { name: 'Ground cloves', quantity: '1/4', unit: 'tsp' },
      { name: 'Black pepper', quantity: '1/4', unit: 'tsp' },
      { name: 'Vanilla extract', quantity: '1', unit: 'tsp' },
      { name: 'Salt', quantity: '1/4', unit: 'tsp' },
    ],
    instructions: `1. Preheat oven to 175°C (350°F). Line baking trays with parchment paper.
2. Beat butter and powdered sugar until light and fluffy.
3. Mix in vanilla extract.
4. Whisk together flour, cardamom, cinnamon, ginger, cloves, black pepper, and salt.
5. Gradually add flour mixture to butter mixture. Mix until just combined.
6. Roll dough into 1-inch balls and press lightly with a fork on the baking tray.
7. Bake for 10-12 minutes until edges are lightly golden.
8. Cool on a wire rack. Dust with extra powdered sugar before serving.`,
  },
  {
    title: 'Aloo Paratha with Spiced Potato Filling',
    description: 'Crispy whole-wheat flatbread stuffed with a spiced mashed potato mixture.',
    category: 'Breakfast',
    prepTime: '25 mins',
    cookTime: '20 mins',
    servings: 4,
    isAIGenerated: false,
    ingredients: [
      { name: 'Whole wheat flour', quantity: '2', unit: 'cups' },
      { name: 'Boiled potatoes', quantity: '4', unit: 'medium' },
      { name: 'Cumin seeds', quantity: '1', unit: 'tsp' },
      { name: 'Ajwain (carom seeds)', quantity: '1/2', unit: 'tsp' },
      { name: 'Green chilies', quantity: '2', unit: 'whole' },
      { name: 'Fresh coriander', quantity: '3', unit: 'tbsp' },
      { name: 'Amchur powder', quantity: '1/2', unit: 'tsp' },
      { name: 'Coriander powder', quantity: '1', unit: 'tsp' },
      { name: 'Garam masala', quantity: '1/2', unit: 'tsp' },
      { name: 'Ginger (grated)', quantity: '1', unit: 'tsp' },
      { name: 'Salt', quantity: '1.5', unit: 'tsp' },
      { name: 'Ghee or butter', quantity: '4', unit: 'tbsp' },
    ],
    instructions: `1. Knead whole wheat flour with water and a pinch of salt into a soft dough. Rest for 20 minutes.
2. Mash boiled potatoes. Mix in cumin seeds, ajwain, chopped green chilies, coriander, amchur, coriander powder, garam masala, ginger, and salt.
3. Divide dough into equal balls. Flatten each ball, place a potato filling ball in the center.
4. Fold the dough over the filling and seal edges. Gently roll into a flat circle.
5. Cook on a hot tawa (griddle) for 2-3 minutes each side.
6. Brush with ghee and press gently until golden brown spots appear.
7. Serve hot with yogurt, pickle, and a knob of butter.`,
  },
  {
    title: 'Lamb Rogan Josh',
    description: 'Slow-cooked Kashmiri lamb curry with whole spices and fiery red chilies.',
    category: 'Dinner',
    prepTime: '15 mins',
    cookTime: '90 mins',
    servings: 4,
    isAIGenerated: false,
    ingredients: [
      { name: 'Lamb (bone-in, cubed)', quantity: '700', unit: 'g' },
      { name: 'Mustard oil', quantity: '4', unit: 'tbsp' },
      { name: 'Kashmiri dry red chilies', quantity: '6', unit: 'whole' },
      { name: 'Green cardamom', quantity: '4', unit: 'pods' },
      { name: 'Black cardamom', quantity: '2', unit: 'pods' },
      { name: 'Cloves', quantity: '5', unit: 'whole' },
      { name: 'Cinnamon stick', quantity: '1', unit: 'inch' },
      { name: 'Fennel powder (saunf)', quantity: '2', unit: 'tsp' },
      { name: 'Dry ginger powder (sonth)', quantity: '1', unit: 'tsp' },
      { name: 'Asafoetida', quantity: '1/4', unit: 'tsp' },
      { name: 'Yogurt (beaten)', quantity: '1', unit: 'cup' },
      { name: 'Salt', quantity: '1.5', unit: 'tsp' },
    ],
    instructions: `1. Heat mustard oil to smoking point. Add whole red chilies, cardamoms, cloves, and cinnamon.
2. Add lamb pieces and sear on high heat until browned on all sides.
3. Reduce heat. Add asafoetida, fennel powder, and dry ginger powder. Mix well.
4. Add beaten yogurt one tablespoon at a time, stirring constantly to avoid curdling.
5. Add salt and 1 cup of water. Cover and cook on low heat for 60-75 minutes until lamb is tender.
6. The oil will separate on top when done. Adjust salt.
7. Serve with steamed rice or Kashmiri bread (lavasa).`,
  },
  {
    title: 'Mango Lassi',
    description: 'Chilled, creamy yogurt drink blended with ripe Alphonso mango and cardamom.',
    category: 'Breakfast',
    prepTime: '5 mins',
    cookTime: '0 mins',
    servings: 2,
    isAIGenerated: false,
    ingredients: [
      { name: 'Ripe mango (Alphonso preferred)', quantity: '2', unit: 'medium' },
      { name: 'Full-fat yogurt', quantity: '1', unit: 'cup' },
      { name: 'Cold milk', quantity: '1/2', unit: 'cup' },
      { name: 'Sugar', quantity: '2', unit: 'tbsp' },
      { name: 'Ground cardamom', quantity: '1/4', unit: 'tsp' },
      { name: 'Saffron strands', quantity: '5', unit: 'strands' },
      { name: 'Ice cubes', quantity: '6', unit: 'cubes' },
      { name: 'Rose water', quantity: '1/2', unit: 'tsp' },
    ],
    instructions: `1. Peel and cube the ripe mangoes.
2. Add mango, yogurt, cold milk, sugar, and cardamom to a blender.
3. Blend until completely smooth.
4. Add ice cubes and blend again briefly.
5. Pour into tall glasses.
6. Garnish with a few saffron strands soaked in 1 tsp warm water and a dash of rose water.
7. Serve immediately while cold.`,
  },
  {
    title: 'Samosa Chaat',
    description: 'Crushed crispy samosas topped with chickpeas, tangy chutneys, and spiced yogurt.',
    category: 'Snack',
    prepTime: '15 mins',
    cookTime: '10 mins',
    servings: 3,
    isAIGenerated: false,
    ingredients: [
      { name: 'Samosas (store-bought or homemade)', quantity: '6', unit: 'pieces' },
      { name: 'Boiled chickpeas', quantity: '1', unit: 'cup' },
      { name: 'Whisked yogurt', quantity: '1', unit: 'cup' },
      { name: 'Tamarind chutney', quantity: '3', unit: 'tbsp' },
      { name: 'Green mint chutney', quantity: '3', unit: 'tbsp' },
      { name: 'Chaat masala', quantity: '1.5', unit: 'tsp' },
      { name: 'Roasted cumin powder', quantity: '1', unit: 'tsp' },
      { name: 'Red chili powder', quantity: '1/2', unit: 'tsp' },
      { name: 'Sev (crunchy chickpea noodles)', quantity: '1/2', unit: 'cup' },
      { name: 'Pomegranate seeds', quantity: '3', unit: 'tbsp' },
      { name: 'Fresh coriander', quantity: '2', unit: 'tbsp' },
    ],
    instructions: `1. Lightly crush samosas and place them in serving bowls or plates.
2. Top with boiled chickpeas.
3. Drizzle generously with whisked yogurt.
4. Add tamarind chutney and green mint chutney on top.
5. Sprinkle chaat masala, roasted cumin powder, and red chili powder.
6. Top with a generous handful of sev.
7. Garnish with pomegranate seeds and fresh coriander.
8. Serve immediately so the samosas stay crunchy.`,
  },
  {
    title: 'Palak Paneer',
    description: 'Silky spinach gravy with cottage cheese cubes, seasoned with whole spices.',
    category: 'Vegan',
    prepTime: '15 mins',
    cookTime: '25 mins',
    servings: 4,
    isAIGenerated: false,
    ingredients: [
      { name: 'Fresh spinach (palak)', quantity: '500', unit: 'g' },
      { name: 'Paneer', quantity: '200', unit: 'g' },
      { name: 'Onion', quantity: '1', unit: 'large' },
      { name: 'Tomato', quantity: '2', unit: 'medium' },
      { name: 'Garlic', quantity: '5', unit: 'cloves' },
      { name: 'Ginger', quantity: '1', unit: 'inch' },
      { name: 'Green chilies', quantity: '2', unit: 'whole' },
      { name: 'Cumin seeds', quantity: '1', unit: 'tsp' },
      { name: 'Garam masala', quantity: '1', unit: 'tsp' },
      { name: 'Ghee', quantity: '2', unit: 'tbsp' },
      { name: 'Cream', quantity: '2', unit: 'tbsp' },
      { name: 'Salt', quantity: '1', unit: 'tsp' },
    ],
    instructions: `1. Blanch spinach in boiling water for 2 minutes. Transfer to ice water immediately.
2. Blend blanched spinach with green chilies into a smooth puree.
3. Heat ghee. Add cumin seeds, then chopped onions. Sauté until golden.
4. Add garlic-ginger paste and cook 2 minutes. Add tomatoes and cook until soft.
5. Add garam masala and salt. Mix well.
6. Pour in the spinach puree. Stir and cook for 5-7 minutes on medium heat.
7. Add paneer cubes and stir gently. Simmer 3 minutes.
8. Drizzle cream on top and serve with roti or rice.`,
  },
  {
    title: 'Tandoori Spice Roasted Vegetables',
    description: 'Smoky, charred mixed vegetables marinated in a bold tandoori spice paste.',
    category: 'Quick Meals',
    prepTime: '15 mins',
    cookTime: '25 mins',
    servings: 3,
    isAIGenerated: false,
    ingredients: [
      { name: 'Bell peppers (mixed)', quantity: '2', unit: 'large' },
      { name: 'Cauliflower', quantity: '1/2', unit: 'head' },
      { name: 'Zucchini', quantity: '1', unit: 'large' },
      { name: 'Red onion', quantity: '1', unit: 'large' },
      { name: 'Yogurt', quantity: '1/2', unit: 'cup' },
      { name: 'Tandoori masala', quantity: '2', unit: 'tbsp' },
      { name: 'Lemon juice', quantity: '2', unit: 'tbsp' },
      { name: 'Kashmiri chili powder', quantity: '1', unit: 'tsp' },
      { name: 'Oil', quantity: '2', unit: 'tbsp' },
      { name: 'Salt', quantity: '1', unit: 'tsp' },
      { name: 'Chaat masala', quantity: '1', unit: 'tsp' },
    ],
    instructions: `1. Preheat oven to 220°C (425°F) or fire up a grill.
2. Cut all vegetables into large, equal chunks.
3. Whisk together yogurt, tandoori masala, lemon juice, Kashmiri chili powder, oil, and salt.
4. Toss all vegetables in the marinade. Let sit for at least 20 minutes.
5. Spread on a baking tray in a single layer.
6. Roast for 22-25 minutes, flipping once halfway, until edges are charred.
7. Sprinkle chaat masala and a squeeze of lemon immediately after removing from oven.
8. Serve with mint chutney and warm rotis.`,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    await Recipe.deleteMany({});
    console.log('Cleared existing recipes');

    const inserted = await Recipe.insertMany(recipes);
    console.log(`Inserted ${inserted.length} Indian spice recipes successfully!`);

    inserted.forEach((r) => console.log(`  ✓ ${r.title} [${r.category}]`));
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
