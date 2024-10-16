"use client";
import { cn } from "@/lib/utils";
import React, { useState } from 'react';

interface Recipe {
  id: number;
  title: string;
  category: string;
  des: string;
  imageUrl: string;
}

interface RecipesProps {
  recipes: Recipe[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

// Define a mapping of categories to badge colors
const categoryColors: { [key: string]: string } = {
  Breakfast: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500",
  Lunch: "bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500",
  Dinner: "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500",
  Dessert: "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500",
  Snack: "bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white",
  Drinks: "bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-500",
  Sourdough: "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500",
  Salads: "bg-orange-100 text-orange-800 dark:bg-orange-800/30 dark:text-orange-500",
  Pastr: "bg-pink-100 text-pink-800 dark:bg-pink-800/30 dark:text-pink-500",
};

export default function Recipes({ recipes, selectedCategory, setSelectedCategory }: RecipesProps) {
  const [hoveredRecipeId, setHoveredRecipeId] = useState<number | null>(null);

  // Function to filter recipes by category
  const filteredRecipes = selectedCategory === 'All' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === selectedCategory);

  return (
    <div className="m-10 justify-evenly">
      <ul className="list-none flex flex-wrap justify-evenly">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id}>
            <div
              style={{
                backgroundImage: `url(${recipe.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className={cn(
                "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4"
              )}
            >
              <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
              <div className="flex flex-row items-center space-x-4 z-10">
                {/* Render the category badge */}
                <span className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${categoryColors[recipe.category] || "bg-gray-200 text-gray-600"}`}>
                  {recipe.category}
                </span>
              </div>
              <div className="text content">
                <h1 className="font-bold text-xl bg-[#C3B091] p-2 rounded-lg md:text-2xl text-gray-50 relative z-10">
                  {recipe.title}
                </h1>
                <p className="font-normal text-sm bg-[#C3B091] p-2 rounded-lg text-black relative z-10 my-4">
                  {recipe.des}
                </p>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}