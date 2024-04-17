import Image from "next/image";
import Link from "next/link";

import fetchRandomRecipesData from "@/app/api/fetchRandomRecipesData";
import RecipeData from "@/types/recipe";
import { Button } from "./button";

export default async function Card() {
  const recipeData = await fetchRandomRecipesData();

  return (
    <div className="relative grid grid-cols-3 gap-4">
      {recipeData.map((recipe: RecipeData) => (
        <div className="rounded-md w-full bg-white shadow-md" key={recipe.id}>
          <Link href={`/search/${recipe.id}`}>
            <Image src={recipe.image} alt={recipe.title} width={320} height={100} className="rounded-t-md" />
          </Link>

          <div className="p-4">
            {recipe.id}
            <h2 className="line-clamp-2">{recipe.title}</h2>
            <div className=" flex gap-2 justify-between mt-4">
              <Button asChild className="w-full" size="sm" variant="outline">
                <Link href={`/search/${recipe.id}`}>More</Link>
              </Button>

              <Button className="w-full" size="sm">
                Add
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
