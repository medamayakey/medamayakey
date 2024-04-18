import Image from "next/image";
import type { FC } from "react";

interface RecipeDetailsProps {
  id: number;
  title: string;
  readyInMinutes: number;
  image: string;
  summary: string;
  instructions: string;
}

export const RecipeDetails: FC<RecipeDetailsProps> = ({ id, title, readyInMinutes, image, summary, instructions }) => {
  return (
    <div className="relative grid grid-cols-3 gap-4">
      <div className="rounded-md w-full bg-white shadow-md" key={id}>
        <Image src={image} alt={title} width={320} height={100} className="rounded-t-md" />

        <div className="p-4">
          <h2 className="line-clamp-2">{title}</h2>
          <div className=" flex gap-2 justify-between mt-4">
            {readyInMinutes}
            {summary}
            {instructions}
          </div>
        </div>
      </div>
    </div>
  );
};
