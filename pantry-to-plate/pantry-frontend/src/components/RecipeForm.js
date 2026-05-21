import React, { useState, useEffect } from 'react';
import './RecipeForm.css';

const EMPTY_INGREDIENT = { name: '', quantity: '', unit: '' };

const DEFAULT_FORM = {
  title: '',
  description: '',
  category: 'Dinner',
  ingredients: [{ ...EMPTY_INGREDIENT }],
  instructions: '',
  prepTime: '',
  cookTime: '',
  servings: 2,
};

export default function RecipeForm({ initialData, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm({
        ...DEFAULT_FORM,
        ...initialData,
        ingredients: initialData.ingredients?.length > 0 ? initialData.ingredients : [{ ...EMPTY_INGREDIENT }],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (index, field, value) => {
    const updated = form.ingredients.map((ing, i) =>
      i === index ? { ...ing, [field]: value } : ing
    );
    setForm({ ...form, ingredients: updated });
  };

  const addIngredient = () => {
    setForm({ ...form, ingredients: [...form.ingredients, { ...EMPTY_INGREDIENT }] });
  };

  const removeIngredient = (index) => {
    if (form.ingredients.length === 1) return;
    setForm({ ...form, ingredients: form.ingredients.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setError('Title is required.');
    if (!form.instructions.trim()) return setError('Instructions are required.');
    const validIngredients = form.ingredients.filter((i) => i.name.trim());
    if (validIngredients.length === 0) return setError('Add at least one ingredient.');
    setError('');
    onSubmit({ ...form, ingredients: validIngredients });
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      {error && <div className="error-banner">{error}</div>}

      <div className="form-group">
        <label>Title *</label>
        <input name="title" value={form.title} onChange={handleChange} placeholder="e.g., Creamy Pasta" required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={form.category} onChange={handleChange}>
            {['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Vegan', 'Quick Meals'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Servings</label>
          <input type="number" name="servings" value={form.servings} onChange={handleChange} min={1} max={50} />
        </div>
        <div className="form-group">
          <label>Prep Time</label>
          <input name="prepTime" value={form.prepTime} onChange={handleChange} placeholder="e.g., 15 mins" />
        </div>
        <div className="form-group">
          <label>Cook Time</label>
          <input name="cookTime" value={form.cookTime} onChange={handleChange} placeholder="e.g., 30 mins" />
        </div>
      </div>

      <div className="form-group">
        <label>Description</label>
        <input name="description" value={form.description} onChange={handleChange} placeholder="Short description..." />
      </div>

      <div className="form-group">
        <label>Ingredients *</label>
        {form.ingredients.map((ing, i) => (
          <div key={i} className="ingredient-row">
            <input
              placeholder="Name"
              value={ing.name}
              onChange={(e) => handleIngredientChange(i, 'name', e.target.value)}
            />
            <input
              placeholder="Qty"
              value={ing.quantity}
              onChange={(e) => handleIngredientChange(i, 'quantity', e.target.value)}
              style={{ width: '80px' }}
            />
            <input
              placeholder="Unit"
              value={ing.unit}
              onChange={(e) => handleIngredientChange(i, 'unit', e.target.value)}
              style={{ width: '80px' }}
            />
            <button type="button" className="remove-btn" onClick={() => removeIngredient(i)}>✕</button>
          </div>
        ))}
        <button type="button" className="add-ingredient-btn" onClick={addIngredient}>+ Add Ingredient</button>
      </div>

      <div className="form-group">
        <label>Instructions *</label>
        <textarea
          name="instructions"
          value={form.instructions}
          onChange={handleChange}
          placeholder="Step 1: ... Step 2: ..."
          rows={6}
          required
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Saving...' : initialData ? 'Update Recipe' : 'Add Recipe'}
        </button>
      </div>
    </form>
  );
}
