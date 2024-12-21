import { getServerSession } from "next-auth";
import Recipe from "@/models/Recipe";
import { authOptions } from "../../auth/[...nextauth]/route";

export const GET = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return new Response("Not authenticated", { status: 401 });
    }

    const recipes = await Recipe.find({ user: session.user.id });

    const jsonResponse = JSON.stringify(recipes);
    return new Response(jsonResponse, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // Adjust if caching is required
      },
    });
  } catch (error) {
    console.error("Error fetching recipes:", error.message);

    return new Response(
      JSON.stringify({ error: "Failed to fetch recipes", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
