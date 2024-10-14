import React from 'react';
import Image from 'next/image';

interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  categoryId: string;
  imageUrl: string;
}

const RecipesPage: React.FC = async () => {
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes`);

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const recipes: Recipe[] = await res.json();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recipes</h1>
      <ul className="list-none flex flex-wrap justify-center">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="mr-4 mb-4 w-[300px] text-center">
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
              <a href={`/recipes/${recipe.id}`} className="text-blue-500 hover:underline">
                View Recipe
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipesPage;
