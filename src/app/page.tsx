import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-2">
      <Link href="/testpage">shadcn/ui and Aceternity test</Link>

      <div className="mb-2">
        <Button>Button</Button>
      </div>
      <div className="mb-2">
        <Button variant="destructive">destructive</Button>
      </div>
      <div className="mb-2">
        <Button variant="outline">outline</Button>
      </div>
      <div className="mb-2">
        <Button variant="secondary">secondary</Button>
      </div>
      <div className="mb-2">
        <Button variant="defaultOutline" size="sm">
          Button
        </Button>
      </div>
    </main>
  );
}
