"use client";
import { useEffect, useState } from "react";
import { getFridgeItems } from "@/db/firebase/firestore";
import { Item } from "firebase/analytics";
import { Trash2 } from "lucide-react";

export default function Cartbar() {
  const [cartData, setCartData] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFridgeItems();
      if (data) {
        setCartData(data);
      }
    };

    fetchData();
  }, []);

  return (
    <aside className="min-w-72 border-l">
      <h2 className="border-b pb-6 p-6">Item to buy</h2>
      <ul>
        {cartData.map((cartItem: Item) => (
          <li value={cartItem.id} key={cartItem.id} className="border-b p-6">
            {cartItem.name}
            <Trash2 className="h-4 w-4 stroke-red-600 shrink-0 transition-transform duration-200" />
          </li>
        ))}
      </ul>
    </aside>
  );
}
