"use client";
import { Button } from "@/components/ui/button";
import { diets, intolerances, cuisines } from "@/types/options";
import RecipesFilterInput from "./RecipesFilterInput";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function RecipesFilterList() {
  return (
    <>
      <Sheet>
        <RecipesFilterInput />
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter</SheetTitle>
            <SheetDescription>
              <div className="my-3">
                <p className="text-base mb-2">Cuisines</p>
                {cuisines.map((cuisine, index) => (
                  <Button variant="outline" size="sm" key={index} className="m-1">
                    {cuisine}
                  </Button>
                ))}
              </div>
              <div className="my-3">
                <p className="text-base mb-2">Intolerances</p>
                {intolerances.map((intolerance, index) => (
                  <Button variant="outline" size="sm" key={index} className="m-1">
                    {intolerance}
                  </Button>
                ))}
              </div>
              <div className="my-3">
                <p className="text-base mb-2">Diets</p>
                {diets.map((diet, index) => (
                  <Button variant="outline" size="sm" key={index} className="m-1">
                    {diet}
                  </Button>
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" className="w-52">
                Save
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
