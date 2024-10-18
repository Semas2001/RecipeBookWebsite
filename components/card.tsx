"use client";
import { cn } from "@/lib/utils";
import React, { useState } from 'react';

interface Recipe {
  id: number;
  title: string;
  category: string; // Category displayed instead of prep time
  des: string;
  imageUrl: string;
}

interface RecipesProps {
  recipes: Recipe[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const categoryColors: { [key: string]: string } = {
  Breakfast: "bg-yellow-100 text-yellow-800",
  Lunch: "bg-teal-100 text-teal-800",
  Dinner: "bg-blue-100 text-blue-800",
  Dessert: "bg-red-200 text-red-800",
  Snack: "bg-gray-100 text-gray-800",
  Drinks: "bg-purple-100 text-purple-800",
  Sourdough: "bg-green-100 text-green-800",
  Salads: "bg-orange-100 text-orange-800",
  Pastr: "bg-pink-100 text-pink-800",
};

export default function Recipes({ recipes, selectedCategory, setSelectedCategory }: RecipesProps) {
  const filteredRecipes = selectedCategory === 'All' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === selectedCategory);

  return (
    <div className="h-auto mt-20 "> 
      <div className="m-10 flex flex-wrap justify-evenly">
      {filteredRecipes.map((recipe) => (
        <div key={recipe.id} className="m-2 mb-20 w-80">
          <div className="bg-[#e2d1bf] shadow-lg rounded-lg overflow-visible relative"> 

            <div
              style={{
                backgroundImage: `url(${recipe.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '160px', 
                borderRadius: '50%', 
                position: 'absolute', 
                top: '-80px', 
                left: '50%',
                transform: 'translateX(-50%)',
                width: '160px', 
                zIndex: 1,
                marginTop: '10px', 
              }}
            ></div>
            <div className="p-4 pt-32"> 
              <h1 className="font-bold text-xl text-gray-800 mb-2">{recipe.title}</h1>
              <span className={`inline-flex items-center gap-x-1.5 py-1 px-2 rounded-full text-xs font-medium ${categoryColors[recipe.category]}`}>
                {recipe.category}
              </span>
              <hr className="border-gray-300 my-2" />
              <p className="text-sm text-gray-600 mb-4">{recipe.des}</p>
              <button className="w-full bg-[#cfbfa7] text-black py-2 rounded-lg hover:bg-[#e4d5b7] transition">
                View Recipe
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}
