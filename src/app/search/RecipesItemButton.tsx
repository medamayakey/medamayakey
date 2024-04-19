"use client";
import { Button } from "@/components/ui/button";
import RecipeData from "@/types/recipe";
interface RecipesItemButtonProps {
  recipe: RecipeData;
}
export function RecipesItemButton({ recipe }: RecipesItemButtonProps) {
  return (
    <Button className="w-full" size="sm">
      Add
    </Button>
  );
}
