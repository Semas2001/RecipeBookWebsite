"use client"; 

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Recipe {
  title: string;
  des: string;
  instructions: string;
  ingredient:string;
  imageUrl: string;

}

export default function RecipeDetail() {
  const pathname = usePathname();
  const title = pathname.split('/').pop();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (title) {
      fetch(`/api/recipes/${title}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            console.error(data.message);
          } else {
            setRecipe(data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching recipe:', error);
          setLoading(false);
        });
    }
  }, [title]);

  if (loading) return <p>Loading...</p>;
  if (!recipe) return <p>not found.</p>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.imageUrl} alt={recipe.title} />
      <p>{recipe.des}</p>
    </div>
  );
}
