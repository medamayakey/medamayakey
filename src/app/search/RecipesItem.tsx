'use client';
import { fetchRecipesData } from '@/actions/api/fetchRecipesData';
import { getRecipes } from '@/actions/db/firebase/firestore';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import type RecipeData from '@/types/recipe';
import { FilteredRecipeData } from '@/types/recipe';
import { SignedIn } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { RecipesItemButton } from './RecipesItemButton';

export default function RecipesItem() {
	const [recipeData, setRecipeData] = useState<RecipeData[]>([]);
	const { fetchedRecipesData, setFetchedRecipesData, setAddedRecipes } =
		useApp();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const recipesItems = useCallback(async () => {
		const items = await fetchRecipesData();
		const cartRecipeData = await getRecipes();

		setFetchedRecipesData(items.recipes);

		setRecipeData(items.recipes);
		if (cartRecipeData) {
			setAddedRecipes(cartRecipeData);
		}
		return items;
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		recipesItems();
	}, []);

	return (
		<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
			{fetchedRecipesData.map((recipe: RecipeData) => (
				<div className='rounded-md w-full bg-white shadow-md' key={recipe.id}>
					<Link href={`/search/${recipe.id}`}>
						<Image
							src={recipe.image}
							alt={recipe.title}
							width={640}
							height={100}
							className='rounded-t-md'
						/>
					</Link>

					<div className='p-4'>
						<h2 className='line-clamp-2'>{recipe.title}</h2>
						<div className='flex gap-2 justify-between mt-4'>
							<Button asChild className='w-full' size='sm' variant='outline'>
								<Link href={`/search/${recipe.id}`}>More</Link>
							</Button>
							<SignedIn>
								<RecipesItemButton recipe={recipe} />
							</SignedIn>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
