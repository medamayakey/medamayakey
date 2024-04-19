import { SignedIn } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar";
import RecipesFilter from "@/app/search/(filter)/RecipesFilter";
import { RecipeResultProvider } from "@/contexts/recipeContext";
import RecipesItem from "./RecipesItem";

export default function RecipesSearch() {
  return (
    <>
      <div className="flex">
        <SignedIn>
          <Sidebar />
        </SignedIn>
        <main className="p-9">
          <RecipeResultProvider>
            <RecipesFilter />
            <RecipesItem />
          </RecipeResultProvider>
        </main>
      </div>
    </>
  );
}
