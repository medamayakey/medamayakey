"use client";
import { fetchRecipeDetail } from "@/app/api/fetchRecipeDetail";

import { RecipeDetails } from "@/app/search/recipeDetails";
import RecipeData from "@/types/recipe";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../../../../components/ui/dialog";

interface RecipeDetailModalProps {
  params: {
    id: string;
  };
}

export const RecipeDetailModalPage = async ({ params }: RecipeDetailModalProps) => {
  const response = await fetchRecipeDetail(params.id);
  const recipeData = (await response.json()) as RecipeData;
  const router = useRouter();
  // export const RecipeDetailModalPage = ({ params }: RecipeDetailModalProps) => {
  //   const [recipeData, setRecipeData] = useState<RecipeData | null>();
  //   const router = useRouter();

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const response = await fetchRecipeDetail(params.id);
  //       const recipeData = (await response.json()) as RecipeData;
  //       setRecipeData(recipeData);
  //     };

  //     fetchData();
  //   }, [params.id]);

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  //   if (!recipeData) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <Dialog onOpenChange={handleOnOpenChange}>
      <DialogContent>
        <RecipeDetails
          id={recipeData.id}
          title={recipeData.title}
          readyInMinutes={recipeData.readyInMinutes}
          image={recipeData.image}
          summary={recipeData.summary}
          instructions={recipeData.instructions}
        />
      </DialogContent>
    </Dialog>
  );
};
