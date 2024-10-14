// utils/db.ts (or another appropriate file)

import { Recipe } from "@/models/Recipe";
import { Category } from "@/models/Category";

// Example mock data (replace with your database access logic)
const categories: Category[] = [
    { id: "1", name: "Breakfast" },
    { id: "2", name: "Lunch" },
];

const recipes: Recipe[] = [
    {
        id: "1",
        title: "Chicken Alfredo",
        ingredients: ["Chicken", "Pasta", "Cream"],
        instructions: "Cook the pasta and mix with cream and chicken.",
        categoryId: "1",
        imageUrl: "/Photo1.jpg",
    },
];

// Function to get all categories
export const getCategories = () => {
    return categories;
};

// Function to get all recipes
export const getRecipes = () => {
    return recipes;
};

// Function to get recipes by category ID
export const getRecipesByCategoryId = (categoryId: string) => {
    return recipes.filter(recipe => recipe.categoryId === categoryId);
};
