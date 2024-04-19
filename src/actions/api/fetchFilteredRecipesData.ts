'use server'
export default async function fetchFilteredRecipesData(
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

  console.log(url);

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((data) => data.results);
}
