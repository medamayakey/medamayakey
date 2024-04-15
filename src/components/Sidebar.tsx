import { columns, Payment } from "@/app/payments/columns";
import { DataTable } from "@/app/payments/dataTable";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "aaaaaaaaa",
    },
    {
      id: "728ed52f",
      name: "cccc",
    },
    {
      id: "728ed52f",
      name: "bbbb",
    },
    {
      id: "728ed52f",
      name: "ddddddddddd",
    },
  ];
}

export default async function Sidebar() {
  const data = await getData();

  return (
    <aside className="min-w-72 bg-slate-50 p-6">
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </aside>
  );
}
