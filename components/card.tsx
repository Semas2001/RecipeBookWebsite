"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

interface Recipe {
  [x: string]: string;
  id: string;
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

const formatTitleForURL = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, '-');
};

export default function Recipes({ recipes, selectedCategory, setSelectedCategory }: RecipesProps) {
  const pathname = usePathname();
  const filteredRecipes = selectedCategory === 'All' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === selectedCategory);

  if (filteredRecipes.length === 0) {
    return <p className="text-center mt-4">No recipes found in this category.</p>;
  }

  return (
    <div className="h-auto mt-20 "> 
      <div className="m-10 flex flex-wrap justify-evenly">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="m-2 mb-20 w-80">
            <div className="bg-[#e2d1bf] shadow-lg rounded-lg overflow-visible relative"> 

              <div
                className="bg-cover bg-center rounded-full"
                style={{
                  backgroundImage: `url(${recipe.imageUrl})`,
                  height: '160px', 
                  width: '160px', 
                  position: 'absolute', 
                  top: '-80px', 
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 1,
                  marginTop: '10px', 
                }}
                aria-label={recipe.title}
              ></div>
              <div className="p-4 pt-32"> 
                <h1 className="font-bold text-xl text-gray-800 mb-2">{recipe.title}</h1>
                <span className={`inline-flex items-center gap-x-1.5 py-1 px-2 rounded-full text-xs font-medium ${categoryColors[recipe.category]}`}>
                  {recipe.category}
                </span>
                <hr className="border-gray-300 my-2" />
                <p className="text-sm text-gray-600 mb-4">{recipe.des}</p>
                <Link
                  href={`/recipes/${formatTitleForURL(recipe._id)}`}
                  className="text-blue-500 hover:underline ml-2"
                >
                  View Recipe
                </Link>
                {pathname.includes('/my-recipes') && (
                  <Link href={`/recipes/${recipe._id}?edit=true`} className="text-blue-500 hover:underline ml-20">
                  Update Recipe
                </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

