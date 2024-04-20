"use client";
import { useEffect, useState } from "react";
import { fetchRecipeDetail } from "@/actions/api/fetchRecipesData";
import RecipeData from "@/types/recipe";
import RecipeDetail from "@/app/search/RecipeDetail";
import { Cookie, Fish } from "lucide-react";
import { Modal } from "./modal";
import Loading from "@/components/Loading";

interface RecipeDetailPageProps {
  params: {
    id: string;
  };
}

export default function RecipeDetailModal({ params }: RecipeDetailPageProps) {
  const [recipeDetail, setRecipeDetail] = useState<RecipeData>();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetchRecipeDetail(params.id);
        setRecipeDetail(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchApi();
  }, [params.id]);

  if (!recipeDetail) {
    return <Loading />;
  }

  const ingredientNames = recipeDetail.extendedIngredients.map((ingredient) => ingredient.name);

  return (
    <Modal>
      <RecipeDetail recipeDetail={recipeDetail} />
      <h2 className="mb-2 flex items-center">
        <Fish />
        <p className="ml-2">Ingredients</p>
      </h2>
      {ingredientNames.map((name: string, index: number) => (
        <span className="text-sm pr-2" key={index}>
          {name},
        </span>
      ))}
    </Modal>
  );
}
