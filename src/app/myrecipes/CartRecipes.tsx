'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Trash2 } from 'lucide-react';

import {
  getRecipes,
  deleteRecipe,
  getShoppingListItems,
  deleteShoppingItem,
} from '@/actions/db/firebase/firestore';
import NewRrcipeData from '@/types/newRrcipeData';
import { useApp } from '@/contexts/AppContext';

export default function CartRecipes() {
  const { addedRecipes, setAddedRecipes, setCartItems } = useApp();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipes();
        if (data) setAddedRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteRecipe = async (id: string, recipe: NewRrcipeData) => {
    try {
      await deleteRecipe(id);
      setAddedRecipes(
        addedRecipes.filter((addedRecipe) => addedRecipe.id !== id)
      );

      const ingredients = recipe.ingredients;
      const shoppingItems = await getShoppingListItems();
      if (shoppingItems) {
        ingredients.forEach(async (ingredient) => {
          const itemToDelete = shoppingItems.find(
            (item) => item.name === ingredient.name
          );

          if (itemToDelete) {
            await deleteShoppingItem(itemToDelete.id);
            setCartItems((prevItems) =>
              prevItems.filter((item) => item.id !== itemToDelete.id)
            );
          }
        });
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <>
      {addedRecipes && addedRecipes.length > 0 ? (
        <Accordion type="single" collapsible>
          {addedRecipes.map((recipe: NewRrcipeData) => (
            <AccordionItem value={recipe.id} key={recipe.id} id={recipe.id}>
              <AccordionTrigger>
                <div className="flex items-center justify-between w-full gap-4">
                  <Link href="" className="min-w-16">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      width={64}
                      height={64}
                      className="rounded-md"
                    />
                  </Link>
                  <h2 className="flex-1 text-left">{recipe.title}</h2>
                  <button
                    className="absolute z-50 left-2"
                    onClick={() => handleDeleteRecipe(recipe.id, recipe)}
                  >
                    <Trash2 className="h-4 w-4 stroke-red-600 shrink-0 transition-transform duration-200" />
                  </button>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="h-screen text-center">
          <p>Recipe is empty.</p>
        </div>
      )}
    </>
  );
}
