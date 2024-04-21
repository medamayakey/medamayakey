'use client';
import { useContext, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, Search } from 'lucide-react';
import { SheetTrigger } from '@/components/ui/sheet';
import { RecipesContext } from '@/contexts/recipeContext';
import { fetchRecipesData } from '../../../actions/api/fetchRecipesData';
import { fetchQueryRecipesData } from '../../../actions/api/fetchRecipesData'
import { useApp } from '@/contexts/AppContext';
import RecipeData, { FilteredRecipeData } from "@/types/recipe";

export default function RecipesFilterInput() {
  const [query, setQuery] = useState('');
  
  const recipesData = useContext(RecipesContext);

  const { fetchedRecipesData, setFetchedRecipesData } = useApp();



  useEffect(() => {
    if (query.trim() !== '') { 
      const delayDebounceFn = setTimeout(async () => {
      console.log(query);
      const response = await fetchQueryRecipesData(query);
      setFetchedRecipesData(response);
      // getRecipe();

    }
    , 1500);
    return () => clearTimeout(delayDebounceFn);
    }
  }, [query]);


  return (
    <>
      <div className="flex justify-end gap-x-6 mb-6">
        <Input
          placeholder="Search item"
          icon={<Search className="stroke-slate-400" />}
          className="pl-10 w-80"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
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
