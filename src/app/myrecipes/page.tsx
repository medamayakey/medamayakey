import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function Myrecipes() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="p-9">Myrecipes</main>
      </div>
    </>
  );
}
