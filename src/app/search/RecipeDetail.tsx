'use client';
import Loading from '@/components/Loading';
import type RecipeData from '@/types/recipe';
import Image from 'next/image';
import { RecipesItemButton } from './RecipesItemButton';

interface RecipeDetailProps {
	recipeDetail: RecipeData | undefined;
}

export default function RecipeDetail({ recipeDetail }: RecipeDetailProps) {
	if (!recipeDetail) {
		return <Loading />;
	}

	return (
		<>
			<h1 className='text-2xl mb-8'>{recipeDetail.title}</h1>
			<div className='lg:flex justify-between'>
				<div className='mb-4'>
					<Image
						src={recipeDetail.image}
						alt={recipeDetail.title}
						width={480}
						height={100}
						className='rounded-md'
					/>
				</div>
				<div className='lg:px-6 flex-1'>
					<p
						className='text-sm'
						dangerouslySetInnerHTML={{ __html: recipeDetail.summary }}
					></p>
					<div className='w-24 mt-6'>
						<RecipesItemButton recipe={recipeDetail} />
					</div>
				</div>
			</div>
		</>
	);
}
