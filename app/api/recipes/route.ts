import { NextResponse } from 'next/server';
import Recipe from "@/models/Recipe";
import dbConnect from '@/lib/mongodb';
import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  try {
    await dbConnect();
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    return NextResponse.json(recipes); 
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();
    
    // Check session
    const session = await getServerSession(authOptions);
    console.log('Session:', session);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse form data
    const formData = await request.formData();
    const title = formData.get('title')?.toString() || '';
    const des = formData.get('des')?.toString() || '';
    const ingredients = JSON.parse(formData.get('ingredients')?.toString() || '[]');
    const instructions = formData.get('instructions')?.toString() || '';
    const category = formData.get('category')?.toString() as
      | 'Breakfast'
      | 'Lunch'
      | 'Dinner'
      | 'Snack'
      | 'Dessert'
      | 'Drink'
      | 'Salad'
      | 'Pastry'
      | 'Sourdough'
      | '' || ''; // Ensure category is typed
    const image = formData.get('image');
    const user = formData.get('user');


    const formattedIngredients = ingredients.map((ingredient: { name: string; amount: string; unit: string }) => ({
      name: ingredient.name, // This goes to the 'name' in the ingredient schema
      amount: ingredient.amount, // This goes to the 'amount' in the ingredient schema
      unit: ingredient.unit || '', // This goes to the 'unit' in the ingredient schema
    }));

    // Validate required fields
    if (!title || !des || !ingredients || !instructions || !category) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }


    let imageUrl: string;

    // Handle image
    if (image instanceof Blob) {
      // Save uploaded image
      const buffer = Buffer.from(await image.arrayBuffer());
      const imageName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.jpg`;
      const imagePath = path.join(process.cwd(), 'public', imageName);

      try {
        fs.writeFileSync(imagePath, buffer);
        imageUrl = `/${imageName}`;
      } catch (fileError) {
        console.error('Error saving image:', fileError);
        return NextResponse.json({ error: 'Error saving image' }, { status: 500 });
      }
    } else {
      // Use default image based on category
      const defaultImages: Record<typeof category, string> = {
        Breakfast: '/Breakfast.jpg',
        Lunch: '/Lunch.jpg',
        Dinner: '/Dinner.jpg',
        Snack: '/Snacks.png',
        Dessert: '/Dessert.jpg',
        Drink: '/Drinks.jpg',
        Salad: '/Salads.jpeg',
        Pastry: '/Pastry.jpeg',
        Sourdough: '/Sourdough.png',
      };
      imageUrl = defaultImages[category] || '/default-image.jpg'; // Fallback default image
    }

    // Prepare recipe data to be saved
    console.log('Data to be saved:', {
      title,
      des,
      formattedIngredients,
      instructions,
      category,
      imageUrl,
      user,
    });

    // Create the recipe in the database
    await Recipe.create({
      title,
      des,
      ingredients: formattedIngredients,
      instructions,
      category,
      imageUrl,
      user,
    });

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
