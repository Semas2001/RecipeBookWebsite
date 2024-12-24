
import { NextResponse } from 'next/server';
import Recipe from '@/models/Recipe';
import dbConnect from '@/lib/mongodb';

interface Params {
  title: string;
}

export async function GET(request: Request, { params }: { params: { title: string } }) {
  const { title } = params;
  console.log('Unformatted title from URL:', title);
  const formattedTitle = title.replace(/-/g, ' ');
  console.log('Formatted title for DB query:', formattedTitle);

  try {
    await dbConnect();
    const recipe = await Recipe.findOne({ title: { $regex: new RegExp(`^${formattedTitle}$`, 'i') } });
    if (!recipe) {
      return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
    }
    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


export const PUT = async (req: Request, { params }: { params: Params }) => {
  try {
    const title = params.title;
    const updatedRecipe = await req.json();

    const recipe = await Recipe.findOneAndUpdate(
      { title },
      updatedRecipe,
      { new: true }
    );

    if (!recipe) {
      return new Response("Recipe not found", { status: 404 });
    }

    return new Response(JSON.stringify(recipe), { status: 200 });
  } catch (error) {
    console.error("Error updating recipe:", error);
    return new Response("Failed to update recipe", { status: 500 });
  }
};


export const DELETE = async (req: Request, { params }: { params: Params }) => {
  try {
    const title = params.title;

    const recipe = await Recipe.findOneAndDelete({ title });

    if (!recipe) {
      return new Response("Recipe not found", { status: 404 });
    }

    return new Response("Recipe deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return new Response("Failed to delete recipe", { status: 500 });
  }
};