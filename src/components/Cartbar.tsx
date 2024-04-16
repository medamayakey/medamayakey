import { columns } from "@/app/payments/columns";
import { DataTable } from "@/app/payments/dataTable";
import { getFridgeItems } from "@/db/firebase/firestore";

async function getData() {
  return await getFridgeItems();
}

export default async function Cartbar() {
  const data = await getData();

  return (
    <aside className="min-w-72 p-6 border-l">
      <div>Item to buy</div>
    </aside>
  );
}
