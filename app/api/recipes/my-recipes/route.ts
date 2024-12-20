import { getServerSession } from 'next-auth';
import Recipe from "@/models/Recipe";
import { authOptions } from "../../auth/[...nextauth]/route";

export const GET = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Not authenticated", { status: 401 });
    }

    const recipes = await Recipe.find({ user: session.user.id });
    return new Response(JSON.stringify(recipes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return new Response("Failed to fetch recipes", { status: 500 });
  }
};
