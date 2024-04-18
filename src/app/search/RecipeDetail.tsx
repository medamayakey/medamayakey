"use client";
import Image from "next/image";
import { RecipeDetails } from "@/contexts/recipeContext";

interface RecipeDetailProps {
  recipeDetail: RecipeDetails;
}

export default function RecipeDetail({ recipeDetail }: RecipeDetailProps) {
  if (!recipeDetail) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <main className="p-9">
        <div className="flex justify-center">
          <div className="relative gap-4">
            <Image src={recipeDetail.image} alt={recipeDetail.title} width={480} height={100} className="rounded-md" />
            <div className="p-4">
              <h2 className="text-2xl">{recipeDetail.title}</h2>
              <p> {recipeDetail.readyInMinutes}</p>
              <p>{recipeDetail.summary}</p>
              <p>{recipeDetail.instructions}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
