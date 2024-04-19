'use client';
import { Button } from '@/components/ui/button';
import { addRecipe } from '@/actions/db/firebase/firestore';
import RecipeData from '@/types/recipe';

interface RecipesItemButtonProps {
  recipe: RecipeData;
}
export function RecipesItemButton({ recipe }: RecipesItemButtonProps) {
  const handleClick = async () => {
    const addedRecipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
      ingredients: recipe.extendedIngredients,
    };
    addRecipe(addedRecipe);
  };

  return (
    <Button className="w-full" size="sm" onClick={handleClick}>
      Add
    </Button>
  );
}
