import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Discover from './pages/Discover';
import RecipeBox from './pages/RecipeBox';
import MealPlanner from './pages/MealPlanner';
import RecipeDetail from './pages/RecipeDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Discover />} />
            <Route path="/box" element={<RecipeBox />} />
            <Route path="/planner" element={<MealPlanner />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>Pantry to Plate &copy; 2026 &mdash; Divakar, Yashasree &amp; Mrunali</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
