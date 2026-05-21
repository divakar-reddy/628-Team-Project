import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetail.css';

const CATEGORY_COLORS = {
  Breakfast: '#f39c12', Lunch: '#27ae60', Dinner: '#2980b9',
  Snack: '#8e44ad', Dessert: '#e91e8c', Vegan: '#16a085', 'Quick Meals': '#e74c3c',
};

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addedMsg, setAddedMsg] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`/api/recipes/${id}`);
        setRecipe(res.data);
      } catch {
        setError('Recipe not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const addToPlanner = async () => {
    try {
      await axios.post(`/api/mealplan/add/${id}`);
      setAddedMsg('Added to meal planner!');
      setTimeout(() => setAddedMsg(''), 2500);
    } catch {
      setError('Failed to add to planner.');
    }
  };

  if (loading) return <div className="loading-spinner container">Loading recipe...</div>;
  if (error) return <div className="container"><div className="error-banner">{error}</div></div>;
  if (!recipe) return null;

  const categoryColor = CATEGORY_COLORS[recipe.category] || '#e67e22';
  const steps = recipe.instructions.split(/\n|(?=\d+\.)/g).filter((s) => s.trim());

  return (
    <div className="container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-hero" style={{ borderTop: `6px solid ${categoryColor}` }}>
        <div className="detail-tags">
          <span className="detail-category" style={{ background: categoryColor }}>{recipe.category}</span>
          {recipe.isAIGenerated && <span className="detail-ai-tag">AI Generated</span>}
        </div>
        <h1 className="detail-title">{recipe.title}</h1>
        {recipe.description && <p className="detail-description">{recipe.description}</p>}

        <div className="detail-meta">
          {recipe.prepTime && <div className="meta-item"><span>⏱</span><div><small>Prep</small><strong>{recipe.prepTime}</strong></div></div>}
          {recipe.cookTime && <div className="meta-item"><span>🔥</span><div><small>Cook</small><strong>{recipe.cookTime}</strong></div></div>}
          {recipe.servings && <div className="meta-item"><span>🍽</span><div><small>Serves</small><strong>{recipe.servings}</strong></div></div>}
          {recipe.ingredients?.length > 0 && <div className="meta-item"><span>🧂</span><div><small>Ingredients</small><strong>{recipe.ingredients.length}</strong></div></div>}
        </div>

        {addedMsg && <div className="success-banner-inline">{addedMsg}</div>}

        <button className="planner-add-btn" onClick={addToPlanner}>
          + Add to Meal Planner
        </button>
      </div>

      <div className="detail-columns">
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <ul className="ingredient-list">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>
                <span className="ing-qty">{ing.quantity} {ing.unit}</span>
                <span className="ing-name">{ing.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="instructions-section">
          <h2>Instructions</h2>
          <ol className="steps-list">
            {steps.map((step, i) => (
              <li key={i}>{step.replace(/^\d+\.\s*/, '').trim()}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
