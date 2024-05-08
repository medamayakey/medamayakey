'use server';
import { getCache, setCache } from '@/cache/cache';
export async function fetchRecipesData() {
	try {
		const cachedData = getCache('recipes');
		if (cachedData) {
			console.log('Using cached data: random recipes');
			return cachedData;
		}
		const response = await fetch(
			`https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONACULAR_API_KEY}&number=18`,
		);
		console.log('Fetching new data: random recipes');
		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}

		const data = await response.json();
		setCache('recipes', data);
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}

export async function fetchFilteredRecipesData(
	cuisine: string[],
	intolerance: string[],
	diet: string[],
) {
	try {
		const cacheKey = generateCacheKey(cuisine, intolerance, diet);
		const cachedData = getCache(cacheKey);
		if (cachedData) {
			console.log('Using cached data: filtered recipes');
			return cachedData;
		}

		let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}&number=18`;

		if (cuisine.length > 0) {
			url += `&cuisine=${cuisine}`;
		}

		if (intolerance.length > 0) {
			url += `&intolerance=${intolerance}`;
		}

		if (diet.length > 0) {
			url += `&diet=${diet}`;
		}

		const response = await fetch(url);
		console.log('Fetching new data: filtered recipes');
		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}
		const data = await response.json();
		// console.log(data);
		// get recipe ids
		const recipeIds = data.results.map((recipe: { id: string }) => recipe.id);

		// fetch recipe details
		const recipeDetails = await Promise.all(
			recipeIds.map(async (id: string) => {
				const detailResponse = await fetch(
					`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`,
				);
				if (!detailResponse.ok) {
					throw new Error('Failed to fetch recipe details');
				}
				const detailData = await detailResponse.json();
				return detailData;
			}),
		);
		setCache(cacheKey, recipeDetails);
		return recipeDetails;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}

export async function fetchQueryRecipesData(query: string) {
	const modifiedQuery = query.replace(/\s/g, '%20');

	try {
		const cachedData = getCache(modifiedQuery);
		if (cachedData) {
			console.log('Using cached data: query recipes');
			return cachedData;
		}
		const response = await fetch(
			`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}&titleMatch=${query}&number=18`,
		);
		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}
		const data = await response.json();
		// console.log(data);
		// get recipe ids
		const recipeIds = data.results.map((recipe: { id: string }) => recipe.id);

		// fetch recipe details
		const recipeDetails = await Promise.all(
			recipeIds.map(async (id: string) => {
				const detailResponse = await fetch(
					`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`,
				);
				if (!detailResponse.ok) {
					throw new Error('Failed to fetch recipe details');
				}
				const detailData = await detailResponse.json();
				return detailData;
			}),
		);

		return recipeDetails;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}

export async function fetchRecipeDetail(id: string) {
	try {
		const cachedData = getCache(id);
		if (cachedData) {
			console.log('Using cached data: recipe detail');
			return cachedData;
		}
		const response = await fetch(
			`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`,
		);
		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}
		const data = await response.json();
		console.log('Fetching new data: recipe detail');
		setCache(id, data);
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}

function generateCacheKey(
	cuisine: string[],
	intolerance: string[],
	diet: string[],
) {
	return JSON.stringify({ cuisine, intolerance, diet });
}
