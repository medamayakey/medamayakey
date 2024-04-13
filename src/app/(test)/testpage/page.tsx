import Image from "next/image";
import { Button } from "@/components/ui/button"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default function PageOne() {
  const words = [
    {
      text: "test",
    },
    {
      text: "page",
    },
    {
      text: "of",
    },
    {
      text: "shadcn/ui",
    },
    {
      text: "and",
    },
    {
      text: "Aceternity.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">

        <div className="flex flex-col items-center justify-center h-[40rem]  ">
        <TypewriterEffectSmooth words={words} />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <Button variant="outline">Button</Button>
          </div>
        </div>
      </div>
    </main>
  );
}

