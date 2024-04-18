import { SignedIn } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar";
import RecipesFilter from "@/app/search/(filter)/RecipesFilter";
import RecipesList from "./RecipesList";
import { RecipeResultProvider } from "@/contexts/recipeContext";

export default async function RecipesSearch() {
  return (
    <>
      <div className="flex">
        <SignedIn>
          <Sidebar />
        </SignedIn>
        <main className="p-9">
          <RecipeResultProvider>
            <RecipesFilter />
            <RecipesList />
          </RecipeResultProvider>
        </main>
      </div>
    </>
  );
}
