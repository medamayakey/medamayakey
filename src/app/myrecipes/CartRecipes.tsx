"use client";
import Image from "next/image";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { getRecipes, deleteRecipe } from "@/db/firebase/firestore";
import NewRrcipeData from "@/types/newRrcipeData";
import { Trash2 } from "lucide-react";

export default function CartRecipes() {
  const [recipes, setRecipes] = useState([]);

  console.log(recipes);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteRecipe = async (id) => {
    try {
      await deleteRecipe(id);
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <>
      {recipes && recipes.length > 0 ? (
        <Accordion type="single" collapsible>
          {recipes.map((recipe: NewRrcipeData) => (
            <AccordionItem value={recipe.id} key={recipe.id} id={recipe.id}>
              <AccordionTrigger>
                <div className="flex items-center justify-between w-full gap-4">
                  <Link href="" className="min-w-16">
                    <Image src={recipe.image} alt={recipe.title} width={64} height={64} className="rounded-md" />
                  </Link>
                  <h2 className="flex-1 text-left">{recipe.title}</h2>
                  <button className="absolute z-50 left-2" onClick={() => handleDeleteRecipe(recipe.id)}>
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
