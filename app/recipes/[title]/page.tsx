"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Recipe {
  title: string;
  des: string;
  instructions: string;
  ingredients: string;
  imageUrl: string;
}

export default function RecipeDetail() {
  const pathname = usePathname();
  const title = pathname.split("/").pop();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (title) {
      fetch(`/api/recipes/${title}`)
      
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            console.error(data.message);
          } else {
            setRecipe(data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching recipe:", error);
          setLoading(false);
        });
    }
  }, [title]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        <p>Loading...</p>
      </div>
    );
  if (!recipe)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        <p>Recipe not found.</p>
      </div>
    );

  return (
    <div className="container mx-auto p-4 text-gray-800 dark:text-gray-200">
      <div className="flex flex-col items-center text-center mb-6">
        <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full max-w-lg rounded-lg shadow-lg"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 dark:text-gray-300">{recipe.des}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          {Array.isArray(recipe.ingredients)
            ? recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)
            : recipe.ingredients.split(",").map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
        </ul>
      </div>


      <div>
        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {recipe.instructions}
        </p>
      </div>
    </div>
  );
}
