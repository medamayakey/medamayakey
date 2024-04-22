import Sidebar from "@/components/Sidebar";
import Cartbar from "@/components/Cartbar";
import CartRecipes from "@/app/myrecipes/CartRecipes";

export default function Myrecipes() {
  return (
    <>
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 p-9 h-full">
          <CartRecipes />
        </main>
        <Cartbar />
      </div>
    </>
  );
}
