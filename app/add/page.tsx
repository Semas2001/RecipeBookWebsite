"use client"
import Navbar from '@/components/navbar'
import React, { useState } from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [ingredients, setIngredients] = useState("");
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

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const session = await getServerSession();
    if(!session){
      redirect('/login')
    }

    if (!title || !des || !ingredients || !instructions || !category || !imageUrl) {
      setError("All fields including the image need to be filled");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("des", des);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    formData.append("category", category);
    formData.append("image", imageUrl); // Append image to FormData

    try {
      const response = await fetch('http://localhost:3000/api/recipes', {
        method: "POST",
        body: formData, // Send FormData
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      setError(""); // Clear error message if successful
      alert("Recipe added successfully!");

      // Clear the form
      setTitle("");
      setDes("");
      setIngredients("");
      setInstructions("");
      setCategory("");
      setImage(null);

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
        <input
          className="block w-full p-2 bg-gray-700"
          onChange={(e) => setIngredients(e.target.value)}
          value={ingredients}
          type="text"
          placeholder='Ingredients (comma separated)'
        />
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
  )
}

export default AddRecipe;
