"use client";
import { usePathname, useSearchParams } from "next/navigation";
import router from "next/router";
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
  const searchParams = useSearchParams();
  const isEditing = searchParams.get("edit") === "true";
  const title = pathname.split("/").pop();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatedRecipe, setUpdatedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (title) {
      fetch(`/api/recipes/${title}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            console.error(data.message);
          } else {
            setRecipe(data);
            setUpdatedRecipe(data); // Initialize edit state
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching recipe:", error);
          setLoading(false);
        });
    }
  }, [title]);  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (updatedRecipe) {
      setUpdatedRecipe({
        ...updatedRecipe,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/recipes/${title}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (!response.ok) {
        throw new Error("Failed to update recipe");
      }

      alert("Recipe updated successfully!");
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Failed to update recipe.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;

    try {
      const response = await fetch(`/api/recipes/${title}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete recipe");
      }

      alert("Recipe deleted successfully!");
      router.push("/my-recipes"); // Redirect to recipes list
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe.");
    }
  };

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
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">{isEditing ? "Edit Recipe" : recipe.title}</h1>
        <img src={recipe.imageUrl} alt={recipe.title} className="mb-4" />
  
        {isEditing ? (
          <div>
            <label className="block mb-2 font-bold">Title:</label>
            <input
              type="text"
              name="title"
              value={updatedRecipe?.title || ""}
              onChange={handleInputChange}
              className="border p-2 w-full mb-4"
            />
  
            <label className="block mb-2 font-bold">Description:</label>
            <textarea
              name="des"
              value={updatedRecipe?.des || ""}
              onChange={handleInputChange}
              className="border p-2 w-full mb-4"
            />

            <label className="block mb-2 font-bold">Ingredients:</label>
            <textarea
              name="ingredient"
              value={updatedRecipe?.ingredients || ""}
              onChange={handleInputChange}
              className="border p-2 w-full mb-4"
            />
  
            <label className="block mb-2 font-bold">Instructions:</label>
            <textarea
              name="instructions"
              value={updatedRecipe?.instructions || ""}
              onChange={handleInputChange}
              className="border p-2 w-full mb-4"
            />
  
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete Recipe
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-4">{recipe.des}</p>
            <h2 className="text-2xl font-bold mb-2">Ingredients:</h2>
            <p>{recipe.ingredients}</p>
            <h2 className="text-2xl font-bold mb-2">Instructions:</h2>
            <p className="mb-4">{recipe.instructions}</p>
            
            
          </div>
        )}
      </div>
    );
  }
