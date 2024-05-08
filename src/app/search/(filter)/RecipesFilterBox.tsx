'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SheetTrigger } from '@/components/ui/sheet';
import { useApp } from '@/contexts/AppContext';
import { RecipesContext } from '@/contexts/recipeContext';
import type RecipeData from '@/types/recipe';
import { FilteredRecipeData } from '@/types/recipe';
import { Filter, Search } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { fetchRecipesData } from '../../../actions/api/fetchRecipesData';
import { fetchQueryRecipesData } from '../../../actions/api/fetchRecipesData';

export default function RecipesFilterInput() {
	const [query, setQuery] = useState('');

	const recipesData = useContext(RecipesContext);

	const { fetchedRecipesData, setFetchedRecipesData } = useApp();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (query.trim() !== '') {
			const delayDebounceFn = setTimeout(async () => {
				console.log(query);
				// const response = await fetchQueryRecipesData(query);
				const response = await fetchQueryRecipesData(query);
				console.log('response in RecipesFilterBox.tsx', response);

				// setFetchedRecipesData(response);
				// getRecipe();
			}, 1500);
			return () => clearTimeout(delayDebounceFn);
		}
	}, [query]);

	return (
		<>
			<div className='flex justify-end gap-x-6 mb-6'>
				<Input
					placeholder='Search item'
					icon={<Search className='stroke-slate-400' />}
					className='pl-10 w-80'
					type='text'
					value={query}
					onChange={(e) => {
						setQuery(e.target.value);
					}}
				/>
				<SheetTrigger asChild>
					<Button variant='outline'>
						<Filter className='mr-2' />
						Filter
					</Button>
				</SheetTrigger>
			</div>
		</>
	);
}
