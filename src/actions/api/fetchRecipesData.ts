"use server";
export async function fetchRecipesData() {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONACULAR_API_KEY}&number=18`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function fetchFilteredRecipesData(
  cuisine: string[],
  intolerance: string[],
  diet: string[]
)
{
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
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  // console.log(data);  
  // get recipe ids
  const recipeIds = data.results.map((recipe: { id: string }) => recipe.id);

  // fetch recipe details 
  const recipeDetails = await Promise.all(recipeIds.map(async (id: string) => {
    const detailResponse = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`);
    if (!detailResponse.ok) {
      throw new Error("Failed to fetch recipe details");
    }
    const detailData = await detailResponse.json();
    return detailData;
  }));

  return recipeDetails;
}



export async function fetchRecipeDetail(id: string) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
