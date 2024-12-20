"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { title } from "process";

interface Recipe {
  _id: string;
  title: string;
  des: string;
  ingredients: string[];
  instructions: string;
  category: string;
  image: string;
}

const MyRecipesPage = () => {
  const { data: session } = useSession();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!session) {
        setError("You must be logged in to view your recipes.");
        return;
      }

      try {
        const response = await fetch("/api/recipes/my-recipes");
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRecipes();
  }, [session]);

  return (
    <div>
      <h1>My Recipes</h1>
      {error && <p>{error}</p>}
      <div>
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <h2>{recipe.title}</h2>
              <p>{recipe.des}</p>
              <img src={recipe.image} alt={recipe.title} />
              <button
                onClick={() => {
                  window.location.href = `/recipes/${recipe.title}`;
                }}
              >
                View Recipe
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyRecipesPage;
