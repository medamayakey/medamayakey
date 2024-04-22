'use client';
import { Button } from '@/components/ui/button';
import { addRecipe, addShoppingItem } from '@/actions/db/firebase/firestore';
import RecipeData, { Ingredient } from '@/types/recipe';
import { useApp } from '@/contexts/AppContext';
import Item from '@/types/item';
import generateItemPrice from '@/actions/generateItemPrice';

interface RecipesItemButtonProps {
  recipe: RecipeData;
}
export function RecipesItemButton({ recipe }: RecipesItemButtonProps) {
  const { setCartItems, fridgeItems, setAddedRecipes } = useApp();

  const handleClick = async () => {
    const recipeToAdd = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
      ingredients: recipe.extendedIngredients,
    };
    const ingredients = recipeToAdd.ingredients;
    const uniqueItems: Ingredient[] = compareItems(ingredients, fridgeItems);
    addRecipe(recipeToAdd);
    setAddedRecipes((prevRecipes) => [...prevRecipes, recipeToAdd]);

    const itemsToAdd: Item[] = uniqueItems.map((ingredient) => ({
      // id: ingredient.id,
      name: ingredient.name,
      price: generateItemPrice(),
      quantity: 1,
    }));

    setCartItems((prevItems) => [...prevItems, ...itemsToAdd]);
    addShoppingItem(itemsToAdd);
  };

  function compareItems(ingredients: Ingredient[], list: Item[]) {
    return ingredients.filter(
      (ingredient) =>
        !list.some((fridgeItem) => fridgeItem.name === ingredient.name)
    );
  }

  return (
    <Button className="w-full" size="sm" onClick={handleClick}>
      Add
    </Button>
  );
}
