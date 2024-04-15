export default async function fetchRandomRecipesData() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}&number=10`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data.recipes;
}
