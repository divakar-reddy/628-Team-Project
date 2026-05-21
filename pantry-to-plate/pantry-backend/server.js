const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const recipeRoutes = require('./routes/recipeRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/recipes', recipeRoutes);
app.use('/api/mealplan', mealPlanRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Pantry to Plate API is running' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
