'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/navbar';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const[categories, setCategories] = useState([]);


  useEffect(() => {
    async function fetchRecipes() {
      const res = await fetch("http://localhost:3000/api/recipes");
      const res1 = await fetch("http://localhost:3000/api/categories")
      const recipes = await res.json();
      const categories = await res1.json();
      

      setRecipes(recipes);
      setCategories(categories);
    }
    fetchRecipes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Navbar/>
      <h1 className="text-2xl font-bold mb-4">Recipes</h1>
      <ul className="list-none flex flex-wrap justify-center">
        {recipes.map((recipe: any) => (
          <li key={recipe.title} className="mr-4 mb-4 w-[300px] text-center">
            <Image
              src={recipe.imageUrl}
              alt={recipe.title}
              width={300}
              height={200}
              className="border border-gray-300 rounded p-1 w-full h-[200px] object-cover"
            />
            <div className="mt-2 font-semibold">{recipe.title}</div>
            <div className="mt-1 text-sm">Ingredients: {recipe.ingredients.join(', ')}</div>
            <div className="mt-1">
              <a href={`/recipes/${recipe.category.id}/${recipe.id}`} className="text-blue-500 hover:underline">
                View Recipe
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}