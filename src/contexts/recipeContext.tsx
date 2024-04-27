'use client';
import { fetchRecipesData } from '@/actions/api/fetchRecipesData';
import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	createContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

interface Props {
	children: ReactNode;
}

export interface RecipeDetails {
	id: number;
	title: string;
	readyInMinutes: number;
	image: string;
	summary: string;
	instructions: string;
}

type RecipesContextState = {
	recipesData: RecipeDetails[];
	setRecipesData: Dispatch<SetStateAction<RecipeDetails[]>>;
};

export const RecipesContext = createContext<RecipesContextState>({
	recipesData: [],
	setRecipesData: () => {},
});

export const RecipeResultProvider = ({ children }: Props) => {
	const [recipesData, setRecipesData] = useState<RecipeDetails[]>([]);

	const recipeContextValue = useMemo(
		() => ({
			recipesData,
			setRecipesData,
		}),
		[recipesData, setRecipesData],
	);
	return (
		<RecipesContext.Provider value={recipeContextValue}>
			{children}
		</RecipesContext.Provider>
	);
};
