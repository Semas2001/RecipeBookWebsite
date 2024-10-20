"use client";
import Navbar from '@/components/navbar';
import React, { useRef, useState } from 'react';
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

  const ingredientInputRef = useRef<HTMLInputElement>(null);

  const handleAddIngredient = () => {
    // Add ingredient logic here
    if (ingredientInput) {
      setIngredients([...ingredients, ingredientInput]);
      setIngredientInput(''); // Clear input

      // Focus back on the input after adding
      if (ingredientInputRef.current) {
        ingredientInputRef.current.focus();
      }
    }
  }

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
    <div className="flex justify-center min-h-screen items-center bg-slate-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add a New Recipe</h1>
          
          <input
            className="block w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Recipe Title"
          />
          
          <input
            className="block w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setDes(e.target.value)}
            value={des}
            type="text"
            placeholder="Description"
          />
  
          {/* Ingredients Input */}
          <div className="flex space-x-2">
            <input
              ref={ingredientInputRef}
              className="block w-full p-3 border border-gray-300 cursor-text rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Add an ingredient"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddIngredient}
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>
  
          {/* Display Added Ingredients */}
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
  
          <textarea
            className="block w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setInstructions(e.target.value)}
            value={instructions}
            placeholder="Instructions"
            rows={4}
          />
  
          {/* Category Dropdown */}
          <select
            className="block w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="block w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
  
          {error && <p className="text-red-500 text-sm">{error}</p>}
  
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
  
}

export default AddRecipe;
