export async function fetchRecipesData() {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?query=${query}?apiKey=${process.env.SPOONACULAR_API_KEY}&number=18`
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
