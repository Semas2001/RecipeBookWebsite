import dbConnect from "@/lib/mongodb";
import Recipe from "@/models/Recipe";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: { json: { newTitle: any; newDes: any; newIngredients: any; newInstructions: any; newCategory: any; }; }, {params}: any){
    const {id} = params;
    const {newTitle: title, newDes: des,  newIngredients: ingredients,  newInstructions: instructions, newCategory: category} = request.json;
    await  dbConnect();
    await Recipe.findByIdAndUpdate(id,  {title, des, ingredients, instructions, category});
    return NextResponse.json({message: "Recipe updated"}, {status: 200})
}

export async function GET(request: any, {params}: any){
    const {id} = params;
    await dbConnect();
    const recipe = await Recipe.findOne({_id: id});
    return NextResponse.json({recipe},  {status: 200});
}