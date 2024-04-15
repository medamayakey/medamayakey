import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/ui/card";

export default function Search() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="p-9">
          <Card />
        </main>
      </div>
    </>
  );
}
