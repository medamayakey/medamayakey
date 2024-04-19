'use client';

import RecipeData from '@/types/recipe';

import { addRecipe } from '@/actions/db/firebase/firestore';

interface recipeProp {
  recipe: RecipeData;
}

export default function AddButton({ recipe }: recipeProp) {
  const handleClick = async () => {
    const addedRecipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
      ingredients: recipe.extendedIngredients,
    };
    addRecipe(addedRecipe);
  };

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      Add
    </button>
  );
}
