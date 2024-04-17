import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Cartbar from '@/components/Cartbar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import fetchRandomRecipesData from '@/app/api/fetchRandomRecipesData';
import RecipeData from '@/types/recipe';
import { Trash2 } from 'lucide-react';
import CartRecipes from '@/app/myrecipes/CartRecipes';

export default function Myrecipes() {
  // const recipeData = await fetchRandomRecipesData();

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="p-9">
          {/* <Accordion type="single" collapsible>
            {recipeData.map((recipe: RecipeData) => (
              <AccordionItem value={recipe.id} key={recipe.id}>
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
                    <div className="absolute z-50 left-2">
                      <Trash2 className="h-4 w-4 stroke-red-600 shrink-0 transition-transform duration-200" />
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion> */}
          <CartRecipes />
        </main>
        <Cartbar />
      </div>
    </>
  );
}
