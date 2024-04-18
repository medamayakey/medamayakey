"use client";
import { useContext, useState } from "react";
import RecipesItem from "./RecipesItem";
import { RecipesContext } from "@/contexts/recipeContext";

export default function RecipesList() {
  const recipeData = useContext(RecipesContext);

  return (
    <ul>
      {recipeData?.recipesData.map((recipeItem) => (
        <RecipesItem key={recipeItem.id} recipeItem={recipeItem} />
      ))}
    </ul>
  );
}
