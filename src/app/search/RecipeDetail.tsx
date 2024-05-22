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
		<div className='flex flex-col items-center'>
			<h1 className='text-2xl mb-8 font-bold	'>{recipeDetail.title}</h1>
			<div className='lg:flex flex-col'>
				<div className='w-24 mb-3'>
					<RecipesItemButton recipe={recipeDetail} />
				</div>
				<div className='mb-4 flex justify-center'>
					<Image
						src={recipeDetail.image}
						alt={recipeDetail.title}
						width={480}
						height={100}
						className='rounded-md'
					/>
				</div>
				<div className='flex-1 mb-10'>
					<h2 className='font-bold text-xl'>Summary</h2>
					<p
						className='leading-relaxed'
						dangerouslySetInnerHTML={{ __html: recipeDetail.summary }}
					/>
				</div>
				<div className='flex-1'>
					<h2 className='font-bold text-xl'>Instructions</h2>
					<p
						className='leading-relaxed'
						dangerouslySetInnerHTML={{ __html: recipeDetail.instructions }}
					/>
				</div>
			</div>
		</div>
	);
}
