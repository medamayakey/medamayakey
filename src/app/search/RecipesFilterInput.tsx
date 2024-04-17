"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import { SheetTrigger } from "@/components/ui/sheet";

export default function RecipesFilterInput() {
  return (
    <>
      <div className="flex justify-end gap-x-6 mb-6">
        <Input
          placeholder="Search item"
          icon={<Search className="stroke-slate-400" />}
          className="pl-10 w-80"
          type="text"
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
