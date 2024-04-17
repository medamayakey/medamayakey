import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Cartbar from "@/components/Cartbar";
import CartRecipes from "@/app/myrecipes/CartRecipes";

export default function Myrecipes() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-9">
          <CartRecipes />
        </main>
        <Cartbar />
      </div>
    </>
  );
}
