import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find();
    console.log(categories)
    return NextResponse.json(categories); 
  } catch (error: any) {
    console.error('Failed to fetch recipes:', error);
    return NextResponse.error();
  }
}
