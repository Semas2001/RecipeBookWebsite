'use client'
import Navbar from '@/components/navbar';
import React, { useRef, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const AddRecipe = () => {
  const { data: session } = useSession(); // Fetch session
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", amount: "", unit: "" }]); // Ingredient state
  const [ingredientName, setIngredientName] = useState(""); // Name of the ingredient
  const [amount, setAmount] = useState(""); // Amount for ingredient
  const [unit, setUnit] = useState(""); // Unit of measurement
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

  const measurementUnits = [
    "g",
    "kg",
    "ml",
    "L",
    "cups",
    "tsp",
    "TB",
    "oz",
    "lb",
  ];

  useEffect(() => {
    if (session?.user?.name) {
      console.log(`Logged-in user: ${session.user.name}`);
    }
  }, [session]);

  const handleAddIngredient = () => {
    if (!ingredientName.trim() || !amount.trim()) {
      setError("Both ingredient name and amount are required.");
      return;
    }
    const newIngredient = {
      name: ingredientName,
      amount: amount.trim(),
      unit: unit.trim() || "",
    };
    setIngredients([...ingredients, newIngredient]);
    setIngredientName("");
    setAmount("");
    setUnit("");
    setError(null); // Clear any previous errors
    if (ingredientInputRef.current) {
      ingredientInputRef.current.focus();
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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
    formData.append("ingredients", JSON.stringify(ingredients)); // Send ingredients as JSON
    formData.append("instructions", instructions);
    formData.append("category", category);
    formData.append("user", session.user.id);

    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      formData.append("image", defaultImages[category]);
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
      setIngredients([{ name: "", amount: "", unit: "" }]); // Reset ingredients to default state
      setAmount("");
      setUnit("");
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
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[40rem]">
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

          <div className="space-y-4">
            {/* Ingredient Name */}
            <input
              ref={ingredientInputRef}
              className="block w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              type="text"
              placeholder="Ingredient Name"
            />
            
            {/* Amount and Unit */}
            <div className="flex items-center space-x-2">
              <div className="flex-1 p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <div className="flex space-x-2">
                  <input
                    className="flex-1 p-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="text"
                    placeholder="Amount"
                  />
                  <select
                    className="p-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  >
                    <option value="">Select Unit (Optional)</option>
                    {measurementUnits.map((unit, index) => (
                      <option key={index} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddIngredient}
                className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
              >
                Add Ingredient
              </button>
            </div>

            <ul className="list-disc pl-5 text-gray-700">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center justify-between">
                  {ingredient.name} - {ingredient.amount} {ingredient.unit}
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                    className="text-red-500 ml-2 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

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
