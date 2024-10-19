
import { NextResponse } from 'next/server';
import Recipe from '@/models/Recipe';
import dbConnect from '@/lib/mongodb';

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
