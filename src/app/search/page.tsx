import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

import RecipeData from "@/types/recipe";
import { Button } from "@/components/ui/button";
import { fetchRecipeDetail } from "@/app/api/fetchRecipeDetail";
import fetchRandomRecipesData from "@/app/api/fetchRandomRecipesData";
import RecipesFilter from "@/app/search/RecipesFilter";
import { useEffect, useState } from "react";

export default async function RecipesSearch() {
  const recipeData = await fetchRandomRecipesData();
  // const [recipeData, setRecipeData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetchRandomRecipesData();
  //     if (data) {
  //       setRecipeData(data);
  //     } catch (error) {
  //       console.error("Error fetching recipes:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="p-9">
          <RecipesFilter />
          <div className="relative grid grid-cols-3 gap-4">
            {recipeData
              // .filter((recipe: RecipeData) =>
              //   selectedCuisines.length > 0 ? recipe.cuisines.some((c) => selectedCuisines.includes(c)) : true
              // )
              // .filter((recipe: RecipeData) =>
              //   selectedIntolerances.length > 0
              //     ? recipe.intolerances.some((i) => selectedIntolerances.includes(i))
              //     : true
              // )
              // .filter((recipe: RecipeData) =>
              //   selectedDiets.length > 0 ? recipe.diets.some((d) => selectedDiets.includes(d)) : true
              // )
              .map((recipe: RecipeData) => (
                <div className="rounded-md w-full bg-white shadow-md" key={recipe.id}>
                  <Link href={`/search/${recipe.id}`}>
                    <Image src={recipe.image} alt={recipe.title} width={640} height={100} className="rounded-t-md" />
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
        </main>
      </div>
    </>
  );
}
