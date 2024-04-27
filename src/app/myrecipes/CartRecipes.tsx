'use client';
import {
	deleteRecipe,
	deleteShoppingItem,
	getRecipes,
	getShoppingListItems,
} from '@/actions/db/firebase/firestore';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { useApp } from '@/contexts/AppContext';
import type NewRrcipeData from '@/types/newRrcipeData';
import { Fish, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

interface Ingredient {
	id: string | number;
	name: string;
}

export default function CartRecipes() {
	const { addedRecipes, setAddedRecipes, setCartItems } = useApp();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getRecipes();
				if (data) setAddedRecipes(data);
			} catch (error) {
				console.error('Error fetching recipes:', error);
			}
		};

		fetchData();
	}, []);

	const handleDeleteRecipe = async (id: string, recipe: NewRrcipeData) => {
		try {
			await deleteRecipe(id);
			setAddedRecipes(
				addedRecipes.filter((addedRecipe) => addedRecipe.id !== id),
			);

			const ingredients = recipe.ingredients;
			const shoppingItems = await getShoppingListItems();
			if (shoppingItems) {
				for (const ingredient of ingredients) {
					const itemToDelete = shoppingItems.find(
						(item) => item.name === ingredient.name,
					);

					if (itemToDelete) {
						await deleteShoppingItem(itemToDelete.id);
						setCartItems((prevItems) =>
							prevItems.filter((item) => item.id !== itemToDelete.id),
						);
					}
				}
			}
		} catch (error) {
			console.error('Error deleting recipe:', error);
		}
	};

	let ingredientNames: Ingredient[] = [];
	if (addedRecipes) {
		ingredientNames = addedRecipes.flatMap((recipe) =>
			recipe.ingredients.map((ingredient) => ({
				id: ingredient.id,
				name: ingredient.name,
			})),
		);
	}

	return (
		<>
			{addedRecipes && addedRecipes.length > 0 ? (
				<Accordion type='single' collapsible>
					{addedRecipes.map((recipe: NewRrcipeData) => (
						<AccordionItem value={recipe.id} key={recipe.id} id={recipe.id}>
							<div className='relative flex items-center w-full'>
								<button
									type='button'
									className='w-8'
									onClick={() => handleDeleteRecipe(recipe.id, recipe)}
								>
									<Trash2 className='h-4 w-4 stroke-red-600 shrink-0 transition-transform duration-200' />
								</button>
								<AccordionTrigger>
									<div className='flex items-center justify-between w-full gap-4'>
										<Link href='' className='min-w-16'>
											<Image
												src={recipe.image}
												alt={recipe.title}
												width={64}
												height={64}
												className='rounded-md'
											/>
										</Link>
										<h2 className='flex-1 text-left'>{recipe.title}</h2>
									</div>
								</AccordionTrigger>
							</div>
							<AccordionContent>
								{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
								<p dangerouslySetInnerHTML={{ __html: recipe.summary }} />
								<div className='flex items-center mt-6 mb-2'>
									<Fish />
									<h3 className='ml-2'>Ingredients</h3>
								</div>
								<p>
									{ingredientNames.map((ingredientNames) => (
										<span className='text-sm pr-2' key={ingredientNames.id}>
											{ingredientNames.name},
										</span>
									))}
								</p>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			) : (
				<div className='h-screen text-center'>
					<p>Recipe is empty.</p>
				</div>
			)}
		</>
	);
}
