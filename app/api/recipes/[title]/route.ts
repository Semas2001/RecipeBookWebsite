// app/api/recipes/[title]/route.ts
import { NextResponse } from 'next/server';
import Recipe from '@/models/Recipe';
import dbConnect from '@/lib/mongodb';

export async function GET(request: Request, { params }: { params: { title: string } }) {
  const { title } = params;

  // Convert the title to match your database format
  const formattedTitle = title.replace(/-/g, ' '); // Convert to "Banana Bread"

  try {
    await dbConnect(); // Ensure DB connection
    const recipe = await Recipe.findOne({ title: formattedTitle }); // Fetch recipe by title

    if (!recipe) {
      return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
    }

    return NextResponse.json(recipe); // Return the found recipe
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
