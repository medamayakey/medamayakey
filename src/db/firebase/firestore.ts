import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import Item from '@/types/item';

const collectionFridgeItemsRef = collection(db, 'fridge_items');

export const getFridgeItems = async () => {
  try {
    const querySnapshot = await getDocs(collectionFridgeItemsRef);
    const fetchedData = querySnapshot.docs.map((item) => {
      // item.id = id of each document
      // console.log('id', item.id);

      const data = item.data() as Item;
      return { ...data };
    });

    return fetchedData;
  } catch (error) {
    console.error('Error getting fridge items:', error);
  }
};
