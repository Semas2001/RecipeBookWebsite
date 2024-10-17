"use client";
import React, { useEffect, useState } from "react";
import { Carousel, Card } from "@/components/ui/carousel"; 

const RecipeCarousel = () => {
  const [recipes, setRecipes] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchRecentRecipes = async () => {
      try {
        const response = await fetch("/api/recipes");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRecipes(data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      }
    };

    fetchRecentRecipes();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="py-10">
      <h2 className="text-center text-3xl font-semibold mb-4">Recent Recipes</h2>
      <Carousel
        items={recipes.map((recipe, index) => (
          <Card
            key={index}
            card={{
              src: recipe.imageUrl,
              title: recipe.title, 
              category: recipe.category,
              content: <p className="text-black">{recipe.des}</p>,
            }}
            index={index}
          />
        ))}
      />
    </div>
  );
};

export default RecipeCarousel;
