# Pantry to Plate

A MERN stack web application that helps users manage recipes, plan meals, and reduce food waste using Generative AI.

## Team Members
- **Divakar Reddy Ravi** — Backend architecture, MongoDB schema, REST API (Feature 1: Recipe CRUD)
- **Yashasree Duggiempudi** — Frontend components, UI/UX design (Feature 2: Search & Filtering)
- **Mrunali Vaidya Manohar** — React Router, API integration (Feature 3: Meal Planner & Shopping List)

## Features

### Feature 1: Recipe Management (CRUD)
Add, view, edit, and delete recipes with ingredients, instructions, categories, prep/cook times.

### Feature 2: Search & Filtering
Search recipes by title or ingredient. Filter by category (Breakfast, Vegan, etc.) with live results.

### Feature 3: Meal Planner & Shopping List
Select recipes for your weekly plan and auto-generate an aggregated shopping list.

### Bonus: Chef AI
Enter leftover ingredients → get a complete AI-generated recipe powered by Google Gemini.

## Tech Stack
- **Frontend**: React 18, React Router v6, Axios, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **AI**: Google Gemini 1.5 Flash API

## Pages
1. `/` — Discover (search & browse all recipes)
2. `/box` — My Recipe Box (CRUD operations)
3. `/planner` — Meal Planner + Chef AI
4. `/recipe/:id` — Recipe Detail view

## Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)
- Google Gemini API key (free at [Google AI Studio](https://aistudio.google.com))

### Backend
```bash
cd pantry-backend
npm install
cp .env.example .env
# Edit .env: add your MONGODB_URI and GEMINI_API_KEY
npm run dev
```

### Frontend
```bash
cd pantry-frontend
npm install
npm start
```

App runs at `http://localhost:3000`, API at `http://localhost:5000`.

## What We Learned
- Full-stack MERN architecture with RESTful API design
- MongoDB schema design with Mongoose ODM
- React component composition and state management
- React Router v6 for client-side navigation
- Integrating third-party Generative AI APIs securely via backend
- Git collaboration with feature branches and pull requests
