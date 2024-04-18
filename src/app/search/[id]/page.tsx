"use client";
import { fetchRecipeDetail } from "@/app/api/fetchRecipeDetail";
import { RecipeDetails } from "@/app/search/recipeDetails";
import RecipeData from "@/types/recipe";
import { useEffect, useState } from "react";

interface RecipeDetailPageProps {
  params: {
    id: string;
  };
}

export const RecipeDetailPage = async ({ params }: RecipeDetailPageProps) => {
  const response = await fetchRecipeDetail(params.id);
  const recipeData = (await response.json()) as RecipeData;
  // export const RecipeDetailPage = ({ params }: RecipeDetailPageProps) => {
  //   const [recipeData, setRecipeData] = useState<RecipeData | null>();

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const response = await fetchRecipeDetail(params.id);
  //       const data = (await response.json()) as RecipeData;
  //       setRecipeData(data);
  //     };

  //     fetchData();
  //   }, [params.id]);

  //   if (!recipeData) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <main>
      <div className="rounded-md w-full bg-white shadow-md">
        <RecipeDetails
          id={recipeData.id}
          title={recipeData.title}
          readyInMinutes={recipeData.readyInMinutes}
          image={recipeData.image}
          summary={recipeData.summary}
          instructions={recipeData.instructions}
        />
      </div>
    </main>
  );
};
