import RecipesFilter from '@/app/search/(filter)/RecipesFilter';
import Sidebar from '@/components/Sidebar';
import { RecipeResultProvider } from '@/contexts/recipeContext';
import { SignedIn } from '@clerk/nextjs';
import RecipesItem from './RecipesItem';

export default function RecipesSearch() {
	return (
		<>
			<div className='flex'>
				<SignedIn>
					<Sidebar />
				</SignedIn>
				<main className='p-9'>
					<RecipeResultProvider>
						<RecipesFilter />
						<RecipesItem />
					</RecipeResultProvider>
				</main>
			</div>
		</>
	);
}
