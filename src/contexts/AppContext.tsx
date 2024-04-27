'use client';
import type React from 'react';
import {
	type Dispatch,
	type SetStateAction,
	createContext,
	useContext,
	useState,
} from 'react';

import type Item from '@/types/item';
import type NewRrcipeData from '@/types/newRrcipeData';
import type RecipeData from '@/types/recipe';

interface AppContextType {
	fridgeItems: Item[];
	setFridgeItems: Dispatch<SetStateAction<Item[]>>;
	fetchedRecipesData: RecipeData[];
	setFetchedRecipesData: Dispatch<SetStateAction<RecipeData[]>>;
	addedRecipes: NewRrcipeData[];
	setAddedRecipes: Dispatch<SetStateAction<NewRrcipeData[]>>;
	cartItems: Item[];
	setCartItems: Dispatch<SetStateAction<Item[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [fridgeItems, setFridgeItems] = useState<Item[]>([]);
	const [fetchedRecipesData, setFetchedRecipesData] = useState<RecipeData[]>(
		[],
	);
	const [addedRecipes, setAddedRecipes] = useState<NewRrcipeData[]>([]);
	const [cartItems, setCartItems] = useState<Item[]>([]);

	return (
		<AppContext.Provider
			value={{
				fridgeItems,
				setFridgeItems,
				addedRecipes,
				setAddedRecipes,
				fetchedRecipesData,
				setFetchedRecipesData,
				cartItems,
				setCartItems,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useApp = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useApp must be used within a AppProvider');
	}
	return context;
};
