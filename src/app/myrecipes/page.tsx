import CartRecipes from '@/app/myrecipes/CartRecipes';
import Cartbar from '@/components/Cartbar';
import Sidebar from '@/components/Sidebar';

export default function Myrecipes() {
	return (
		<>
			<div className='flex h-full'>
				<Sidebar />
				<main className='flex-1 p-9 h-full'>
					<CartRecipes />
				</main>
				<Cartbar />
			</div>
		</>
	);
}
