import Image from "next/image";

import fetchRandomRecipesData from "@/app/api/fetchRandomRecipesData";
import RecipeData from "@/types/recipe";

export default async function Card() {
  const recipeData = await fetchRandomRecipesData();

  return (
    <div className="grid grid-cols-3 gap-4">
      {recipeData.map((recipe: RecipeData) => (
        <div className="card w-80 bg-white shadow-xl" key={recipe.id}>
          <figure>
            <Image src={recipe.image} alt="Shoes" width={320} height={100} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{recipe.title}</h2>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">More</button>
              <button className="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
