"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import Recipes from '@/components/card';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function fetchRecipes() {
      const res = await fetch("http://localhost:3000/api/recipes");
      const recipes = await res.json();
      setRecipes(recipes);
    }
    fetchRecipes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-2xl font-bold my-10 text-center">Recipes</h1>

      <div className="flex justify-center">
        <div className="flex bg-[#C3B091] rounded-lg transition p-1 dark:bg-neutral-700 dark:hover:bg-neutral-600">
          <nav className="flex gap-x-1" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
            <button 
              type="button" 
              className={`hs-tab-active:bg-white hs-tab-active:text-gray-700 hs-tab-active:dark:bg-neutral-800 hs-tab-active:dark:text-neutral-400 dark:hs-tab-active:bg-gray-800 py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-white dark:focus:text-white ${selectedCategory === 'All' ? 'active' : ''}`} 
              id="segment-item-1" 
              aria-selected={selectedCategory === 'All'} 
              data-hs-tab="#segment-1" 
              aria-controls="segment-1" 
              role="tab" 
              onClick={() => setSelectedCategory('All')}
            >
              All
            </button>
            {Array.from(new Set(recipes.map(recipe => recipe.category))).map((category) => (
              <button 
                key={category} 
                type="button" 
                className={`hs-tab-active:bg-white hs-tab-active:text-gray-700 hs-tab-active:dark:bg-neutral-800 hs-tab-active:dark:text-neutral-400 dark:hs-tab-active:bg-gray-800 py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-white dark:focus:text-white ${selectedCategory === category ? 'active' : ''}`} 
                id={`segment-item-${category}`} 
                aria-selected={selectedCategory === category} 
                data-hs-tab={`#segment-${category}`} 
                aria-controls={`segment-${category}`} 
                role="tab" 
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="mt-3">
        <div id="segment-1" role="tabpanel" aria-labelledby="segment-item-1" className={selectedCategory === 'All' ? '' : 'hidden'}>
          <Recipes recipes={recipes} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </div>
        {Array.from(new Set(recipes.map(recipe => recipe.category))).map((category) => (
          <div 
            key={category} 
            id={`segment-${category}`} 
            role="tabpanel" 
            aria-labelledby={`segment-item-${category}`} 
            className={selectedCategory === category ? '' : 'hidden'}
          >
            <Recipes recipes={recipes.filter(recipe => recipe.category === category)} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          </div>
        ))}
      </div>
    </div>
  );
}