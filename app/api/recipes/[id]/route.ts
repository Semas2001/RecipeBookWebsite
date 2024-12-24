
import { NextResponse } from 'next/server';
import Recipe from '@/models/Recipe';
import dbConnect from '@/lib/mongodb';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import mongoose from "mongoose";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Not authenticated", { status: 401 });
    }

    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response("Invalid ObjectId", { status: 400 });
    }
    const recipe = await Recipe.findOne({ _id: id, user: session.user.id });

    if (!recipe) {
      return new Response("Recipe not found or unauthorized", { status: 404 });
    }
    return new Response(JSON.stringify(recipe), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return new Response("Failed to fetch recipe", { status: 500 });
  }
};


export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Not authenticated", { status: 401 });
    }

    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response("Invalid ObjectId", { status: 400 });
    }

    const updatedData = await req.json();
    const recipe = await Recipe.findOneAndUpdate(
      { _id: id, user: session.user.id },
      { $set: updatedData },
      { new: true }
    );

    if (!recipe) {
      return new Response("Recipe not found or unauthorized", { status: 404 });
    }

    return new Response(JSON.stringify(recipe), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating recipe:", error);
    return new Response("Failed to update recipe", { status: 500 });
  }
};


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Not authenticated", { status: 401 });
    }

    const { id } = params;

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response("Invalid ObjectId", { status: 400 });
    }

    // Delete the recipe by ObjectId and ensure the user is the owner
    const result = await Recipe.deleteOne({ _id: id, user: session.user.id });

    if (result.deletedCount === 0) {
      return new Response("Recipe not found or unauthorized", { status: 404 });
    }

    return new Response("Recipe deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return new Response("Failed to delete recipe", { status: 500 });
  }
};