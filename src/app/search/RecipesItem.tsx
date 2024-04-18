// "use client";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RecipeDetails } from '@/contexts/recipeContext';
import { useEffect, useState } from 'react';
import { fetchRecipesData } from '../../actions/api/fetchRandomRecipesData';
import RecipeData from '@/types/recipe';

interface RecipesItemProps {
  recipeItem: RecipeDetails;
}

export default function RecipesItem({ recipeItem }: RecipesItemProps) {
  // const response = await fetchRecipesData();
  // const recipeData = (await response.json()) as RecipeData;

  return (
    <>
      <li className="relative grid grid-cols-3 gap-4">
        <div className="rounded-md w-full bg-white shadow-md">
          <Link href={`/search/${recipeItem.id}`}>
            <Image
              src={recipeItem.image}
              alt={recipeItem.title}
              width={640}
              height={100}
              className="rounded-t-md"
            />
          </Link>

          <div className="p-4">
            <h2 className="line-clamp-2">{recipeItem.title}</h2>
            <div className=" flex gap-2 justify-between mt-4">
              <Button asChild className="w-full" size="sm" variant="outline">
                <Link href={`/search/${recipeItem.id}`}>More</Link>
              </Button>
              <Button className="w-full" size="sm">
                Add
              </Button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
