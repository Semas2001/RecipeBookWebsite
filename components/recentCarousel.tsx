"use client";
import React, { useEffect, useState } from "react";
import { Carousel, Card } from "@/components/ui/carousel"; // Ensure the path is correct

const RecipeCarousel = () => {
  const [recipes, setRecipes] = useState<any[]>([]); // State for holding recipes
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchRecentRecipes = async () => {
      try {
        const response = await fetch("/api/recipes"); // Fetching from your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRecipes(data); // Store fetched recipes in state
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      }
    };

    fetchRecentRecipes();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="py-10">
      <h2 className="text-center text-3xl font-semibold mb-4">Recent Recipes</h2>
      <Carousel
        items={recipes.map((recipe, index) => (
          <Card
            key={index}
            card={{
              src: recipe.imageUrl, // Assuming your API returns an image URL
              title: recipe.title, // Assuming your API returns the title
              category: recipe.category, // Assuming your API returns the category
              content: <p className="text-black">{recipe.des}</p>, // Assuming your API returns a description
            }}
            index={index}
          />
        ))}
      />
    </div>
  );
};

export default RecipeCarousel;
