"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/carousel"; // Make sure the path is correct

const RecipeCarousel = () => {
  // Array of recipe cards
  const recipeCards = [
    {
      src: "/Photo1.jpg",
      title: "Chicken Alfredo",
      category: "Pasta",
      content: <p>Delicious creamy chicken alfredo pasta.</p>,
    },
    {
      src: "/Photo2.jpg",
      title: "Grandma's Apple Pie",
      category: "Dessert",
      content: <p>A classic apple pie recipe from grandma.</p>,
    },
    {
      src: "/Dinner.jpg",
      title: "BBQ Ribs",
      category: "Dinner",
      content: <p>Succulent BBQ ribs cooked to perfection.</p>,
    },
    {
        src: "/Salads.jpeg",
        title: "Salad",
        category: "Salad",
        content: <p>Succulent BBQ ribs cooked to perfection.</p>,
    },
    {
        src: "/Snacks.png",
        title: "Snacks",
        category: "Snakcs",
        content: <p>Succulent BBQ ribs cooked to perfection.</p>,
    },

  ];

  return (
    <div className="py-10">
      <h2 className="text-center text-3xl font-semibold mb-4">Recent Recipes</h2>
      <Carousel items={recipeCards.map((card, index) => (
        <Card key={index} card={card} index={index} />
      ))} />
    </div>
  );
};

export default RecipeCarousel;
