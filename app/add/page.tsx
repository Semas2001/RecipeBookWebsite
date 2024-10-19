"use client";
import Navbar from '@/components/navbar';
import React, { useState } from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]); // Change to array
  const [ingredientInput, setIngredientInput] = useState(""); // Input for new ingredient
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  

  // List of recipe categories
  const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack",
    "Dessert",
    "Beverage",
    "Salad",
    "Soup",
    "Appetizer"
  ];

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setIngredients((prev) => [...prev, ingredientInput.trim()]);
      setIngredientInput(""); // Clear input field after adding
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !des || !ingredients.length || !instructions || !category || !imageUrl) {
      setError("All fields including the image need to be filled");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("des", des);
    formData.append("ingredients", ingredients.join(", ")); // Join ingredients into a comma-separated string
    formData.append("instructions", instructions);
    formData.append("category", category);
    formData.append("image", imageUrl); // Append image to FormData

    try {
      const response = await fetch('http://localhost:3000/api/recipes', {
        method: "POST",
        body: formData, 
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      setError(""); // Clear error message if successful
      alert("Recipe added successfully!");

      // Clear the form
      setTitle("");
      setDes("");
      setIngredients([]); // Clear the ingredients list
      setInstructions("");
      setCategory("");
      setImage(null);
      setIngredientInput(""); // Clear input field after submission

    } catch (error) {
      console.error("Error submitting the recipe:", error);
      setError("Failed to submit recipe");
    }
  };

  return (
    <div className="text-gray-200 container mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="block w-full p-2 bg-gray-700"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          placeholder='Title of Recipe'
        />
        <input
          className="block w-full p-2 bg-gray-700"
          onChange={(e) => setDes(e.target.value)}
          value={des}
          type="text"
          placeholder='Description of Recipe'
        />

        {/* Ingredients Input */}
        <div className="flex space-x-2">
          <input
            className="block w-full p-2 bg-gray-700"
            type="text"
            placeholder='Add an ingredient'
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAddIngredient}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Ingredient
          </button>
        </div>

        {/* Display Added Ingredients */}
        <ul className="list-disc pl-5">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-300">{ingredient}</li>
          ))}
        </ul>

        <input
          className="block w-full p-2 bg-gray-700"
          onChange={(e) => setInstructions(e.target.value)}
          value={instructions}
          type="text"
          placeholder='Instructions'
        />

        {/* Category Dropdown */}
        <select
          className="block w-full p-2 bg-gray-700"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          className="block w-full p-2 bg-gray-700"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
