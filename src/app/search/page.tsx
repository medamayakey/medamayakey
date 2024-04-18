import { SignedIn } from "@clerk/nextjs";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import RecipesFilter from "@/app/search/RecipesFilter";
import RecipesList from "./RecipesList";
import { RecipeResultProvider } from "@/contexts/recipeContext";

export default async function RecipesSearch() {
  return (
    <>
      <Header />
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
