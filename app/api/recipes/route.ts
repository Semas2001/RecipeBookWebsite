import { NextResponse } from 'next/server';
import Recipe from "@/models/Recipe";
import dbConnect from '@/lib/mongodb';
import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    await dbConnect();
    const recipes = await Recipe.find().sort({ createdAt: -1 }); // Get the 5 most recent recipes
    return NextResponse.json(recipes); 
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const formData = await request.formData();
    const title = formData.get('title')?.toString() || '';
    const des = formData.get('des')?.toString() || '';
    const ingredients = formData.get('ingredients')?.toString() || '';
    const instructions = formData.get('instructions')?.toString() || '';
    const category = formData.get('category')?.toString() || '';
    const image = formData.get('image') as Blob;

    if (!title || !des || !ingredients || !instructions || !category || !image) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Handle image saving
    const buffer = Buffer.from(await image.arrayBuffer());
    const imageName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.jpg`;
    const imagePath = path.join(process.cwd(), 'public', imageName);

    fs.writeFileSync(imagePath, buffer);

    // The URL accessible from the frontend (excluding 'public' in the URL)
    const imageUrl = `/${imageName}`;

    // Save recipe to the database, including the image URL
    await Recipe.create({ title, des, ingredients, instructions, category, imageUrl: imageUrl });

    return NextResponse.json({ message: 'Recipe created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error saving recipe:', error);
    return NextResponse.json({ error: 'Failed to save recipe' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  
  if (!id) {
    return NextResponse.json({ error: 'Recipe ID is required' }, { status: 400 });
  }

  try {
    await dbConnect();
    await Recipe.findByIdAndDelete(id);
    return NextResponse.json({ message: "Recipe deleted" }, { status: 200 });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return NextResponse.json({ error: 'Error deleting recipe' }, { status: 500 });
  }
}
