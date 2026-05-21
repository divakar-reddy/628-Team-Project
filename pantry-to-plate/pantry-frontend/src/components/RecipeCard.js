import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeCard.css';

const CATEGORY_COLORS = {
  Breakfast: '#f39c12',
  Lunch: '#27ae60',
  Dinner: '#2980b9',
  Snack: '#8e44ad',
  Dessert: '#e91e8c',
  Vegan: '#16a085',
  'Quick Meals': '#e74c3c',
};

export default function RecipeCard({ recipe, onDelete, onAddToPlanner, showDelete = false, showPlanner = false }) {
  const navigate = useNavigate();
  const categoryColor = CATEGORY_COLORS[recipe.category] || '#e67e22';

  return (
    <div className="recipe-card" onClick={() => navigate(`/recipe/${recipe._id}`)}>
      <div className="card-header" style={{ background: categoryColor }}>
        <span className="card-category">{recipe.category}</span>
        {recipe.isAIGenerated && <span className="ai-badge">AI</span>}
      </div>
      <div className="card-body">
        <h3 className="card-title">{recipe.title}</h3>
        <p className="card-description">{recipe.description || 'No description provided.'}</p>
        <div className="card-meta">
          {recipe.prepTime && <span>Prep: {recipe.prepTime}</span>}
          {recipe.cookTime && <span>Cook: {recipe.cookTime}</span>}
          {recipe.servings && <span>Serves: {recipe.servings}</span>}
        </div>
        <p className="card-ingredients">
          {recipe.ingredients.slice(0, 3).map((i) => i.name).join(', ')}
          {recipe.ingredients.length > 3 && ` +${recipe.ingredients.length - 3} more`}
        </p>
      </div>
      <div className="card-actions" onClick={(e) => e.stopPropagation()}>
        {showPlanner && (
          <button className="btn btn-secondary" onClick={() => onAddToPlanner(recipe._id)}>
            + Planner
          </button>
        )}
        {showDelete && (
          <button className="btn btn-danger" onClick={() => onDelete(recipe._id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
