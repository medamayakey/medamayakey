"use client";
import { Cookie } from "lucide-react";

export default function RecipeLoading() {
  return (
    <>
      <div className="fixed top-[50%] left-0 translate-y-[-50%] w-full z-[999]">
        <div className="relative w-48 h-48 bg-white opacity-90 rounded-md m-auto">
          <div className="flex flex-col justify-center items-center gap-4 p-9">
            <Cookie className="animate-spin !w-20 !h-20 m-auto stroke-slate-500 !stroke-1" />
            <p>Loading...</p>
          </div>
        </div>
      </div>
    </>
  );
}
