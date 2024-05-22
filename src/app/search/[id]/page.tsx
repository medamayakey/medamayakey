'use client';
import { fetchRecipeDetail } from '@/actions/api/fetchRecipesData';
import RecipeDetail from '@/app/search/RecipeDetail';
import Loading from '@/components/Loading';
import type RecipeData from '@/types/recipe';
import { Fish } from 'lucide-react';
import { useEffect, useState } from 'react';

interface RecipeDetailPageProps {
	params: {
		id: string;
	};
}

export default function RecipeDetailPage({ params }: RecipeDetailPageProps) {
	const [recipeDetail, setRecipeDetail] = useState<RecipeData>();

	useEffect(() => {
		const fetchApi = async () => {
			try {
				const response = await fetchRecipeDetail(params.id);
				setRecipeDetail(response);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchApi();
	}, [params.id]);

	if (!recipeDetail) {
		return <Loading />;
	}

	const ingredientNames = recipeDetail.extendedIngredients.map(
		(ingredient) => ({ id: ingredient.id, name: ingredient.name }),
	);

	return (
		<>
			<div className='p-9 px-80'>
				<RecipeDetail recipeDetail={recipeDetail} />
				<h2 className='mt-10 mb-2 flex items-center font-bold text-xl'>
					<Fish />
					<p className='ml-2'>Ingredients</p>
				</h2>
				{ingredientNames.map((ingredientName) => (
					<li className='pr-2 text-lg' key={ingredientName.id}>
						{ingredientName.name}
					</li>
				))}
			</div>
		</>
	);
}
