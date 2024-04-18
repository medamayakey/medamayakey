"use client";
import { useEffect, useState } from "react";
import { fetchRecipeDetail } from "@/app/api/fetchRandomRecipesData";
import RecipeData from "@/types/recipe";
import RecipeDetail from "@/app/search/RecipeDetail";
import { Modal } from "./modal";

interface RecipeDetailModalProps {
  params: {
    id: string;
  };
}

export default function RecipeDetailModal({ params }: RecipeDetailModalProps) {
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

  return (
    <Modal>
      <RecipeDetail recipeDetail={recipeDetail} />
    </Modal>
  );
}
