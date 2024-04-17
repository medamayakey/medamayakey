import { columns } from "@/app/payments/columns";
import { DataTable } from "@/app/payments/dataTable";
import { getFridgeItems } from "@/db/firebase/firestore";

async function getData() {
  return await getFridgeItems();
}

export default async function Sidebar() {
  const data = await getData();

  return (
    <aside className="min-w-72 bg-slate-50 p-6">
      <div>
        Table dayo
        {/* <DataTable columns={columns} data={data} /> */}
      </div>
    </aside>
  );
}
