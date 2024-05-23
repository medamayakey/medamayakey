'use client';
import { addRecipe, addShoppingItem } from '@/actions/db/firebase/firestore';
import generateItemPrice from '@/actions/generateItemPrice';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import type Item from '@/types/item';
import type RecipeData from '@/types/recipe';
import type { Ingredient } from '@/types/recipe';

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
				!list.some((fridgeItem) => fridgeItem.name === ingredient.name),
		);
	}

	return (
		<Button className='w-full' size='sm' onClick={handleClick}>
			Save
		</Button>
	);
}
