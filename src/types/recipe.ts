interface Measure {
	amount: number;
	unitShort: string;
	unitLong: string;
}

export interface Ingredient {
	id: number;
	name: string;
	localizedName: string;
	image: string;
	original: string;
	originalName: string;
	amount: number;
	unit: string;
	meta: string[];
	measures: {
		us: Measure;
		metric: Measure;
	};
}

export interface Step {
	number: number;
	step: string;
	ingredients: Ingredient[];
	equipment: Equipment[];
	length?: {
		number: number;
		unit: string;
	};
}

export interface AnalyzedInstruction {
	name: string;
	steps: Step[];
}

interface Equipment {
	id: number;
	name: string;
	localizedName: string;
	image: string;
}

export interface FilteredRecipeData {
	id: number;
	title: string;
	image: string;
	imageType: string;
}

export default interface RecipeData {
	vegetarian: boolean;
	vegan: boolean;
	glutenFree: boolean;
	dairyFree: boolean;
	veryHealthy: boolean;
	cheap: boolean;
	veryPopular: boolean;
	sustainable: boolean;
	lowFodmap: boolean;
	weightWatcherSmartPoints: number;
	gaps: string;
	preparationMinutes: number;
	cookingMinutes: number;
	aggregateLikes: number;
	healthScore: number;
	creditsText: string;
	license: string;
	sourceName: string;
	pricePerServing: number;
	extendedIngredients: Ingredient[];
	id: number;
	title: string;
	readyInMinutes: number;
	servings: number;
	sourceUrl: string;
	image: string;
	imageType: string;
	summary: string;
	cuisines: string[];
	dishTypes: string[];
	diets: string[];
	occasions: string[];
	instructions: string;
	analyzedInstructions: AnalyzedInstruction;
	originalId: number | null;
	spoonacularScore: number;
	spoonacularSourceUrl: string;
}
