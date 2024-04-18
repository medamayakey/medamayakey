import { useFilterContext } from "../search/RecipesFilterList";

export default async function fetchFilteredRecipesData(cuisine: string[], intolerance: string[], diet: string[]) {

  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}&cuisine=${cuisine}&intolerances=${intolerance}&diet=${diet}`;

  console.log(url);
  return url;

  // return fetch(url)
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch data");
  //     }
  //     return response.json();
  //   })
  //   .then((data) => data.results);
}

