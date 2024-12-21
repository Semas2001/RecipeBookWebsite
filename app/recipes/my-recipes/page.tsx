"use client";
import React, { useState, useEffect } from 'react';
import Recipes from '@/components/card';
import Footer from '@/components/footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function myRecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function fetchRecipes() {
      const res = await fetch("/api/recipes/my-recipes");
      const recipes = await res.json();
      setRecipes(recipes);
    }
    fetchRecipes();
  }, []);

  const uniqueCategories = ['All', ...new Set(recipes.map(recipe => recipe.category))];

  return (
    <div className="flex flex-col text-black container mx-auto p-4">
      
      <h1 className="text-6xl font-bold  my-10 text-center">My Recipes</h1>
      
      <div className='min-h-[80dvh]'>
        {/* Tabs List */}
        <div className="flex justify-start">
          <Tabs defaultValue={selectedCategory} className="w-full">
            <TabsList className="flex gap-x-1 p-1 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded-lg">
              {uniqueCategories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className={`py-3 px-4 text-sm font-medium rounded-lg bg-transparent text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 dark:text-neutral-400 dark:hover:text-white dark:focus:text-white ${
                    selectedCategory === category ? 'bg-white text-gray-700 dark:bg-neutral-800 dark:text-neutral-400' : ''
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-3 flex-grow">
              {/* Tab Content for "All" */}
              <TabsContent value="All">
                {selectedCategory === 'All' && (
                  <Recipes recipes={recipes} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                )}
              </TabsContent>

              {/* Tab Content for Specific Categories */}
              {uniqueCategories.filter(category => category !== 'All').map((category) => (
                <TabsContent key={category} value={category}>
                  {selectedCategory === category && (
                    <Recipes recipes={recipes.filter(recipe => recipe.category === category)} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                  )}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}
