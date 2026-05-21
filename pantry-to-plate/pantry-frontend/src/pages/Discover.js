import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import './Discover.css';

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Vegan', 'Quick Meals'];

export default function Discover() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addedMsg, setAddedMsg] = useState('');

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (category !== 'All') params.category = category;
      const res = await axios.get('/api/recipes', { params });
      setRecipes(res.data);
    } catch {
      setError('Unable to load recipes. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  useEffect(() => {
    const timer = setTimeout(fetchRecipes, 300);
    return () => clearTimeout(timer);
  }, [fetchRecipes]);

  const handleAddToPlanner = async (recipeId) => {
    try {
      await axios.post(`/api/mealplan/add/${recipeId}`);
      setAddedMsg('Added to meal planner!');
      setTimeout(() => setAddedMsg(''), 2500);
    } catch {
      setError('Failed to add to planner.');
    }
  };

  return (
    <div className="container">
      <div className="discover-header">
        <h1>Discover Recipes</h1>
        <p>Find your next meal from our collection</p>
      </div>

      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search by title or ingredient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="clear-btn" onClick={() => setSearch('')}>✕</button>
        )}
      </div>

      <div className="category-chips">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`chip ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {addedMsg && <div className="success-banner">{addedMsg}</div>}
      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <div className="loading-spinner">Loading recipes...</div>
      ) : recipes.length === 0 ? (
        <div className="empty-state">
          <h2>No recipes found</h2>
          <p>Try a different search or add recipes in My Recipe Box.</p>
        </div>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              showPlanner={true}
              onAddToPlanner={handleAddToPlanner}
            />
          ))}
        </div>
      )}
    </div>
  );
}
