'use client';
import { useEffect } from 'react';
import {
  deleteShoppingItem,
  getShoppingListItems,
} from '@/actions/db/firebase/firestore';
import Item from '@/types/item';
import { Trash2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

export default function Cartbar() {
  const { cartItems, setCartItems } = useApp();

  useEffect(() => {
    const fetchData = async () => {
      const shoppingListItems = await getShoppingListItems();
      if (shoppingListItems) setCartItems(shoppingListItems);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteShoppingItem(id);
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== id));
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const getTotalAmount = () => {
    const totalAmount = cartItems.reduce(
      (amount, cartItem) => amount + cartItem.price,
      0
    );
    return totalAmount.toFixed(2);
  };

  return (
    <aside className="min-w-72 border-l">
      <h2 className="border-b pb-6 p-6">Item to buy</h2>

      {cartItems && cartItems.length > 0 ? (
        <>
          <ScrollArea className="h-screen">
            <ul>
              {cartItems.map((cartItem: Item) => (
                <li
                  value={cartItem.id}
                  key={cartItem.id}
                  id={cartItem.id}
                  className="border-b p-6"
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleDeleteItem(cartItem.id as string)}
                    >
                      <Trash2 className="h-4 w-4 stroke-red-600 shrink-0 transition-transform duration-200" />
                    </button>
                    <div>
                      <p>{cartItem.name}</p>
                      <p>${cartItem.price}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
          <div className="border-y pb-6 p-6">
            <div className="flex justify-between">
              <p className="capitalize">total</p>
              <p>${getTotalAmount()}</p>
            </div>
            <Button size={'lg'} className="mb-4 mt-8">
              Add item
            </Button>
            <Button variant={'outline'} size={'lg'} className="mb-4">
              Keep Shopping
            </Button>
          </div>
        </>
      ) : (
        <div className="h-screen text-center mt-5">
          <p>Cart is empty.</p>
        </div>
      )}
    </aside>
  );
}
