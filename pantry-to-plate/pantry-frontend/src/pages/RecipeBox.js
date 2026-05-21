import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import RecipeForm from '../components/RecipeForm';
import './RecipeBox.css';

export default function RecipeBox() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editRecipe, setEditRecipe] = useState(null);

  const fetchRecipes = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/api/recipes');
      setRecipes(res.data);
    } catch {
      setError('Failed to load recipes. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSubmit = async (formData) => {
    setFormLoading(true);
    setError('');
    try {
      if (editRecipe) {
        await axios.put(`/api/recipes/${editRecipe._id}`, formData);
      } else {
        await axios.post('/api/recipes', formData);
      }
      setShowForm(false);
      setEditRecipe(null);
      fetchRecipes();
    } catch {
      setError('Failed to save recipe. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this recipe?')) return;
    try {
      await axios.delete(`/api/recipes/${id}`);
      setRecipes((prev) => prev.filter((r) => r._id !== id));
    } catch {
      setError('Failed to delete recipe.');
    }
  };

  const openEdit = (recipe) => {
    setEditRecipe(recipe);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditRecipe(null);
    setError('');
  };

  return (
    <div className="container">
      <div className="box-header">
        <div>
          <h1>My Recipe Box</h1>
          <p>{recipes.length} recipe{recipes.length !== 1 ? 's' : ''} saved</p>
        </div>
        {!showForm && (
          <button className="add-btn" onClick={() => setShowForm(true)}>
            + Add Recipe
          </button>
        )}
      </div>

      {error && <div className="error-banner">{error}</div>}

      {showForm && (
        <div className="form-card">
          <h2>{editRecipe ? 'Edit Recipe' : 'Add New Recipe'}</h2>
          <RecipeForm
            initialData={editRecipe}
            onSubmit={handleSubmit}
            onCancel={closeForm}
            loading={formLoading}
          />
        </div>
      )}

      {loading ? (
        <div className="loading-spinner">Loading your recipes...</div>
      ) : recipes.length === 0 && !showForm ? (
        <div className="empty-state">
          <h2>Your recipe box is empty</h2>
          <p>Click "Add Recipe" to get started!</p>
        </div>
      ) : (
        <div className="recipe-grid-box">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="card-wrapper">
              <RecipeCard recipe={recipe} showDelete={true} onDelete={handleDelete} />
              <button className="edit-btn" onClick={() => openEdit(recipe)}>Edit</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
