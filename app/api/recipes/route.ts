import { NextResponse } from 'next/server';
import Recipe from "@/models/Recipe"
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    await dbConnect();
    const recipes = await Recipe.find();
    console.log(recipes)
    return NextResponse.json(recipes); 
  } catch (error: any) {
    console.error('Failed to fetch recipes:', error);
    return NextResponse.error();
  }
}
