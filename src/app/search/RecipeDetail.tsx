'use client';
import Loading from '@/components/Loading';
import type RecipeData from '@/types/recipe';
import Image from 'next/image';
import { RecipesItemButton } from './RecipesItemButton';
import { Fish, CookingPot, ChefHat } from 'lucide-react';
import type { Step } from '@/types/recipe';

interface RecipeDetailProps {
	recipeDetail: RecipeData | undefined;
}

export default function RecipeDetail({ recipeDetail }: RecipeDetailProps) {
	if (!recipeDetail) {
		return <Loading />;
	}

	return (
		<div className='flex flex-col items-center'>
			<h1 className='text-3xl mb-8 font-bold	'>{recipeDetail.title}</h1>
			<div className='flex justify-center items-center gap-10'>
				<p>
					Servings: <span>{recipeDetail.servings}</span>
				</p>
				<p>
					Total Time: <span>{recipeDetail.readyInMinutes}</span>
				</p>
			</div>
			<div className='lg:flex flex-col'>
				<div className='w-24 mb-3'>
					<RecipesItemButton recipe={recipeDetail} />
				</div>
				<div className='mb-4 flex justify-center'>
					<Image
						src={recipeDetail.image}
						alt={recipeDetail.title}
						width={700}
						height={300}
						className='rounded-md'
					/>
				</div>
				<div className='flex-1 mb-10'>
					<div className='mt-10 mb-2 flex items-center font-bold text-xl'>
						<CookingPot />
						<h2 className='ml-2 text-xl font-extrabold'>Summary</h2>
					</div>
					<p
						className='leading-relaxed text-lg'
						dangerouslySetInnerHTML={{ __html: recipeDetail.summary }}
					/>
				</div>
				<div className='mt-14'>
					<div className='mt-10 mb-2 flex items-center'>
						<Fish />
						<h2 className='ml-2 text-xl font-extrabold'>Ingredients</h2>
					</div>
					<ul className='list-disc'>
						{recipeDetail.extendedIngredients.map((ingredient) => (
							<li key={ingredient.id} className='pr-2 mb-3 text-lg'>
								{ingredient.original}
							</li>
						))}
					</ul>
				</div>
				<div className='mt-14'>
					<div className='mt-10 mb-2 flex items-center'>
						<ChefHat />
						<h2 className='ml-2 text-xl font-extrabold'>Recipe Steps</h2>
					</div>
					<ol className='list-decimal'>
						{recipeDetail.analyzedInstructions[0].steps.map((step: Step) => (
							<li key={step.number} className='mb-5 text-lg'>
								{step.step}
							</li>
						))}
					</ol>
				</div>
			</div>
		</div>
	);
}
