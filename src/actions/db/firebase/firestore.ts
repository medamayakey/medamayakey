'use server';

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import Item from '@/types/item';
import NewRrcipeData from '@/types/newRrcipeData';

const collectionFridgeItemsRef = collection(db, 'fridge_items');
const collectionRecipesRef = collection(db, 'recipes');

export const getRecipes = async () => {
  try {
    const querySnapshot = await getDocs(collectionRecipesRef);
    const fetchedData = querySnapshot.docs.map((item) => {
      const data = item.data() as Item;
      // console.log('data in firesttore file', data);

      return { id: item.id, ...data };
    });

    return fetchedData;
  } catch (error) {
    console.error('Error adding recipe:', error);
  }
};

export const addRecipe = async (addedRecipe: NewRrcipeData) => {
  try {
    // const result = await addDoc(collectionRecipesRef, addedRecipe).catch(
    //   (error) => console.error(error)
    // );
    // console.log('addRecipe result:', result);
    const id = addedRecipe.id.toString();

    await setDoc(doc(db, 'recipes', id), {
      title: addedRecipe.title,
      image: addedRecipe.image,
      summary: addedRecipe.summary,
      ingredients: addedRecipe.ingredients,
    }).catch((error) => console.error(error));
  } catch (error) {
    console.error('Error adding recipe:', error);
  }
};

export const deleteRecipe = async (documentId: string) => {
  try {
    const docToUpdate = doc(collectionRecipesRef, documentId);
    await deleteDoc(docToUpdate);
  } catch (error) {
    console.error('Error deleting recipe:', error);
  }
};

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
    const result = await addDoc(collectionFridgeItemsRef, newFridgeItem).catch(
      (error) => console.error(error)
    );
    // console.log("result:", result);
  } catch (error) {
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
