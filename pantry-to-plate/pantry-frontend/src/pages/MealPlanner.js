import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import './MealPlanner.css';

export default function MealPlanner() {
  const [plan, setPlan] = useState(null);
  const [shoppingList, setShoppingList] = useState([]);
  const [showShopping, setShowShopping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState('');
  const [leftovers, setLeftovers] = useState('');
  const [aiRecipe, setAiRecipe] = useState(null);
  const [saveMsg, setSaveMsg] = useState('');

  const fetchPlan = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/mealplan');
      setPlan(res.data);
    } catch {
      setError('Failed to load meal plan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  const handleRemove = async (recipeId) => {
    try {
      const res = await axios.delete(`/api/mealplan/remove/${recipeId}`);
      setPlan(res.data);
      setShowShopping(false);
    } catch {
      setError('Failed to remove from plan.');
    }
  };

  const fetchShoppingList = async () => {
    try {
      const res = await axios.get('/api/mealplan/shopping-list');
      setShoppingList(res.data.items);
      setShowShopping(true);
    } catch {
      setError('Failed to generate shopping list.');
    }
  };

  const handleGenerateAI = async () => {
    if (!leftovers.trim()) return setError('Please enter some ingredients first.');
    setAiLoading(true);
    setError('');
    setAiRecipe(null);
    try {
      const res = await axios.post('/api/ai/generate', { leftovers });
      setAiRecipe(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'AI generation failed. Try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const saveAiRecipe = async () => {
    if (!aiRecipe) return;
    try {
      await axios.post('/api/recipes', aiRecipe);
      setSaveMsg('Recipe saved to your Recipe Box!');
      setTimeout(() => setSaveMsg(''), 3000);
    } catch {
      setError('Failed to save AI recipe.');
    }
  };

  return (
    <div className="container">
      {/* Chef AI Section */}
      <div className="ai-section">
        <div className="ai-header">
          <span className="ai-icon">🤖</span>
          <div>
            <h2>Chef AI</h2>
            <p>Enter what's in your fridge and get a custom recipe instantly</p>
          </div>
        </div>

        <div className="ai-input-row">
          <input
            type="text"
            placeholder="e.g., chicken, spinach, heavy cream, garlic..."
            value={leftovers}
            onChange={(e) => setLeftovers(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerateAI()}
          />
          <button className="generate-btn" onClick={handleGenerateAI} disabled={aiLoading}>
            {aiLoading ? 'Thinking...' : '✨ Generate'}
          </button>
        </div>

        {error && <div className="error-banner">{error}</div>}
        {saveMsg && <div className="success-banner">{saveMsg}</div>}

        {aiRecipe && (
          <div className="ai-result">
            <div className="ai-result-header">
              <h3>{aiRecipe.title}</h3>
              <span className="ai-tag">AI Generated</span>
            </div>
            {aiRecipe.description && <p className="ai-description">{aiRecipe.description}</p>}
            <div className="ai-meta">
              {aiRecipe.prepTime && <span>Prep: {aiRecipe.prepTime}</span>}
              {aiRecipe.cookTime && <span>Cook: {aiRecipe.cookTime}</span>}
              {aiRecipe.servings && <span>Serves: {aiRecipe.servings}</span>}
            </div>
            <div className="ai-columns">
              <div>
                <h4>Ingredients</h4>
                <ul className="ai-ingredient-list">
                  {aiRecipe.ingredients?.map((ing, i) => (
                    <li key={i}>{ing.quantity} {ing.unit} {ing.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Instructions</h4>
                <p className="ai-instructions">{aiRecipe.instructions}</p>
              </div>
            </div>
            <button className="save-ai-btn" onClick={saveAiRecipe}>
              💾 Save to Recipe Box
            </button>
          </div>
        )}
      </div>

      {/* Meal Plan Section */}
      <div className="plan-section">
        <div className="plan-header">
          <h2>This Week's Meal Plan</h2>
          {plan?.recipes?.length > 0 && (
            <button className="shopping-btn" onClick={fetchShoppingList}>
              🛒 View Shopping List
            </button>
          )}
        </div>

        {loading ? (
          <div className="loading-spinner">Loading meal plan...</div>
        ) : !plan || plan.recipes.length === 0 ? (
          <div className="empty-state">
            <h3>No meals planned yet</h3>
            <p>Browse recipes and click "+ Planner" to add them here.</p>
          </div>
        ) : (
          <div className="plan-grid">
            {plan.recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                showDelete={true}
                onDelete={handleRemove}
              />
            ))}
          </div>
        )}
      </div>

      {/* Shopping List Modal */}
      {showShopping && (
        <div className="modal-overlay" onClick={() => setShowShopping(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🛒 Shopping List</h3>
              <button onClick={() => setShowShopping(false)}>✕</button>
            </div>
            {shoppingList.length === 0 ? (
              <p>No ingredients found.</p>
            ) : (
              <ul className="shopping-list">
                {shoppingList.map((item, i) => (
                  <li key={i}>
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">{item.quantity} {item.unit}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
