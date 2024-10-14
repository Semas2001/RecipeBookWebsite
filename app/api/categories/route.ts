import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb'; // Your database connection utility
import Recipe from '@/models/Recipe'; // Ensure this path is correct

export async function GET() {
  try {
    await dbConnect(); // Connect to the database
    const recipes = await Recipe.find(); // Fetch all recipes
    return NextResponse.json(recipes); // Return recipes as JSON
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
    return NextResponse.error(); // Return an error response
  }
}
