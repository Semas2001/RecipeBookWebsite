import connectMongo from "@/lib/mongodb"; // Adjust the import based on your file structure
import RecipeModel, { Recipe } from "@/models/Recipe"; // Adjust the import based on your file structure
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongo(); // Connect to MongoDB
  const recipes: Recipe[] = await RecipeModel.find().populate("categoryId");
  return NextResponse.json(recipes);
}
