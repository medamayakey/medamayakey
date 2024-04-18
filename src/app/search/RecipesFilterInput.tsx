"use client";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import { SheetTrigger } from "@/components/ui/sheet";
import { RecipesContext } from "@/contexts/recipeContext";
import { fetchRecipesData } from "../api/fetchRandomRecipesData";

export default function RecipesFilterInput() {
  const [query, setQuery] = useState("");
  const recipesData = useContext(RecipesContext);

  const getRecipe = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetchRecipesData(query);
      recipesData?.setRecipesData(response.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="flex justify-end gap-x-6 mb-6">
        <Input
          placeholder="Search item"
          icon={<Search className="stroke-slate-400" />}
          className="pl-10 w-80"
          type="text"
        />
        <button onClick={getRecipe}>search</button>
        <SheetTrigger asChild>
          <Button variant="outline">
            <Filter className="mr-2" />
            Filter
          </Button>
        </SheetTrigger>
      </div>
    </>
  );
}
