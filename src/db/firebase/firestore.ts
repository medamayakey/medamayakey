'use server';

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
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
      return { id: item.id, ...data };
    });

    return fetchedData;
  } catch (error) {
    console.error('Error getting fridge items:', error);
  }
};

export const addFridgeItems = async (newFridgeItem: Item) => {
  try {
    console.log('collectionFridgeItemsRef', collectionFridgeItemsRef);

    const result = await addDoc(collectionFridgeItemsRef, newFridgeItem).catch(
      (error) => console.error(error)
    );
    console.log('result:', result);
  } catch (error) {
    console.log(error);

    console.error('Error adding fridge items:', error);
  }
};

export const deleteFridgeItems = async (documentId: string) => {
  try {
    const docToUpdate = doc(collectionFridgeItemsRef, documentId);
    await deleteDoc(docToUpdate);
  } catch (error) {
    console.error('Error deleting fridge items:', error);
  }
};
