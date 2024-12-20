"use client";
import Navbar from '@/components/navbar';
import React, { useRef, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const AddRecipe = () => {
  const { data: session } = useSession(); // Fetch session
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]); // Array of ingredients
  const [ingredientInput, setIngredientInput] = useState(""); // Single ingredient input
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null); // Image file state
  const [error, setError] = useState<string | null>(null);
  const ingredientInputRef = useRef<HTMLInputElement>(null); // Ref for focusing on ingredient input

  const defaultImages: { [key: string]: string } = {
    Breakfast: "/Breakfast.jpg",
    Lunch: "/Lunch.jpg",
    Dinner: "/Dinner.jpg",
    Snack: "/Snacks.png",
    Dessert: "/Dessert.jpg",
    Drink: "/Drinks.jpg",
    Salad: "/Salads.jpeg",
    Pastry: "/Pastry.jpeg",
    Sourdough: "/Sourdough.png",
  };

  const categories = Object.keys(defaultImages);

  useEffect(() => {
    if (session?.user?.name) {
      console.log(`Logged-in user: ${session.user.name}`);
    }
  }, [session]);

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput(""); // Clear input
      if (ingredientInputRef.current) {
        ingredientInputRef.current.focus(); // Focus back on input
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state

    if (!session?.user?.id) {
      setError("You must be logged in to add a recipe.");
      return;
    }

    if (!title || !des || !ingredients.length || !instructions || !category) {
      setError("All fields are required, including at least one ingredient.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("des", des);
    formData.append("ingredients", ingredients.join(", "));
    formData.append("instructions", instructions);
    formData.append("category", category);
    formData.append("user", session.user.id);
    console.log("User ID:", session.user.id);

    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      formData.append("image", defaultImages[category]); // Default image
    }

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      alert("Recipe added successfully!");
      // Reset form fields
      setTitle("");
      setDes("");
      setIngredients([]);
      setIngredientInput("");
      setInstructions("");
      setCategory("");
      setImageFile(null);
    } catch (err: any) {
      console.error("Error submitting the recipe:", err);
      setError("Failed to submit the recipe.");
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-slate-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add a New Recipe</h1>
          
          <input
            className="block w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Recipe Title"
          />
          
          <input
            className="block w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={des}
            onChange={(e) => setDes(e.target.value)}
            type="text"
            placeholder="Description"
          />

          <div className="flex space-x-2">
            <input
              ref={ingredientInputRef}
              className="block w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              type="text"
              placeholder="Add an ingredient"
            />
            <button
              type="button"
              onClick={handleAddIngredient}
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>

          <ul className="list-disc pl-5 text-gray-700">
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <textarea
            className="block w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Instructions"
            rows={4}
          />

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
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
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
};

export default AddRecipe;
