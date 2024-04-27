'use client';
import { fetchFilteredRecipesData } from '@/actions/api/fetchRecipesData';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { useApp } from '@/contexts/AppContext';
import { cuisines, diets, intolerances } from '@/types/options';
import { createContext, useContext, useState } from 'react';
import RecipesFilterInput from './RecipesFilterBox';

import { join } from 'node:path';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';

interface FilterContextType {
	selectedCuisine: string[];
	selectedIntolerance: string[];
	selectedDiet: string[];
	toggleCuisine: (cuisine: string) => void;
	toggleIntolerance: (intolerance: string) => void;
	toggleDiet: (diet: string) => void;
}

const initialContext: FilterContextType = {
	selectedCuisine: [],
	selectedIntolerance: [],
	selectedDiet: [],
	toggleCuisine: () => {},
	toggleIntolerance: () => {},
	toggleDiet: () => {},
};

export const FilterContext = createContext<FilterContextType>(initialContext);

export const useFilterContext = () => useContext(FilterContext);

export default function RecipesFilterList() {
	const [selectedCuisine, setSelectedCuisine] = useState<string[]>([]);
	const [selectedIntolerance, setSelectedIntolerance] = useState<string[]>([]);
	const [selectedDiet, setSelectedDiet] = useState<string[]>([]);
	const { fetchedRecipesData, setFetchedRecipesData } = useApp();

	// Toggle functions for each filter
	const toggleCuisine = (cuisine: string) => {
		if (selectedCuisine.includes(cuisine)) {
			setSelectedCuisine(selectedCuisine.filter((c) => c !== cuisine));
		} else {
			setSelectedCuisine([...selectedCuisine, cuisine]);
		}
	};
	const toggleIntolerance = (intolerance: string) => {
		if (selectedIntolerance.includes(intolerance)) {
			setSelectedIntolerance(
				selectedIntolerance.filter((i) => i !== intolerance),
			);
		} else {
			setSelectedIntolerance([...selectedIntolerance, intolerance]);
		}
	};
	const toggleDiet = (diet: string) => {
		if (selectedDiet.includes(diet)) {
			setSelectedDiet(selectedDiet.filter((d) => d !== diet));
		} else {
			setSelectedDiet([...selectedDiet, diet]);
		}
	};

	const replaceSpace = (arr: string[]) => {
		return arr.map((item) => item.replace(/\s/g, '%20'));
	};

	const deleteFilter = () => {
		setSelectedCuisine([]);
		setSelectedIntolerance([]);
		setSelectedDiet([]);
	};

	const handleSaveButton = async () => {
		const filteredData = await fetchFilteredRecipesData(
			replaceSpace(selectedCuisine),
			replaceSpace(selectedIntolerance),
			replaceSpace(selectedDiet),
		);

		if (Array.isArray(filteredData)) {
			setFetchedRecipesData(filteredData);
			deleteFilter();
		}
		// setFetchedRecipesData(filteredData);
		// deleteFilter();
	};

	return (
		<>
			<Sheet>
				<RecipesFilterInput />
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Filter</SheetTitle>
						<SheetDescription>
							<div className='my-3'>
								<p className='text-base mb-2'>Cuisines</p>
								{cuisines.map((cuisine, index) => (
									<Toggle
										variant='outline'
										size='sm'
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										key={index}
										className='m-1'
										onClick={() => toggleCuisine(cuisine)}
									>
										{cuisine}
									</Toggle>
								))}
							</div>
							<div className='my-3'>
								<p className='text-base mb-2'>Intolerances</p>
								{intolerances.map((intolerance, index) => (
									<Toggle
										variant='outline'
										size='sm'
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										key={index}
										className='m-1'
										onClick={() => toggleIntolerance(intolerance)}
									>
										{intolerance}
									</Toggle>
								))}
							</div>
							<div className='my-3'>
								<p className='text-base mb-2'>Diets</p>
								{diets.map((diet, index) => (
									<Toggle
										variant='outline'
										size='sm'
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										key={index}
										className='m-1'
										onClick={() => toggleDiet(diet)}
									>
										{diet}
									</Toggle>
								))}
							</div>
						</SheetDescription>
					</SheetHeader>
					<SheetFooter>
						<SheetClose asChild>
							<Button
								type='submit'
								className='w-52'
								onClick={() => {
									handleSaveButton();
								}}
							>
								Save
							</Button>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</>
	);
}
