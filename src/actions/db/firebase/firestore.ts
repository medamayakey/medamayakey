'use server';

import { db } from '@/firebaseConfig';
import type Item from '@/types/item';
import type NewRrcipeData from '@/types/newRrcipeData';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';
import { auth } from '@clerk/nextjs/server';

const collectionFridgeItemsRef = collection(db, 'fridge_items');
const collectionRecipesRef = collection(db, 'recipes');
const collectionShoppingListRef = collection(db, 'shopping list');

const { userId } = auth();

export const getRecipes = async () => {
	try {
		const querySnapshot = await getDocs(
			query(collectionRecipesRef, where('userId', '==', userId)),
		);
		const fetchedData = querySnapshot.docs.map((item) => {
			const data = item.data() as NewRrcipeData;

			return { ...data, id: item.id };
		});

		return fetchedData;
	} catch (error) {
		console.error('Error adding recipe:', error);
	}
};

export const addRecipe = async (addedRecipe: NewRrcipeData) => {
	try {
		const id = addedRecipe.id.toString();
		await setDoc(doc(db, 'recipes', id), {
			title: addedRecipe.title,
			image: addedRecipe.image,
			summary: addedRecipe.summary,
			ingredients: addedRecipe.ingredients,
			userId,
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
		const querySnapshot = await getDocs(
			query(collectionFridgeItemsRef, where('userId', '==', userId)),
		);

		const fetchedData = querySnapshot.docs.map((item) => {
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
		// const fridgeItems = await getDocs(collectionFridgeItemsRef);
		// const existingItem = fridgeItems.docs.find(
		//   (fridgeItem) => fridgeItem.data().name === newFridgeItem.name
		// );
		// if (existingItem) {
		//   const id = existingItem.id.toString();
		//   const fridgeItemsRef = doc(db, 'fridge_items', id);
		//   await updateDoc(fridgeItemsRef, {
		//     quantity: existingItem.data().quantity + 1,
		//   });
		//   return;
		// }

		const result = await addDoc(collectionFridgeItemsRef, {
			...newFridgeItem,
			userId,
		}).catch((error) => console.error(error));
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

export const getShoppingListItems = async () => {
	try {
		const querySnapshot = await getDocs(
			query(collectionShoppingListRef, where('userId', '==', userId)),
		);
		const fetchedData = querySnapshot.docs.map((item) => {
			const data = item.data() as Item;
			return { id: item.id, ...data };
		});

		return fetchedData;
	} catch (error) {
		console.error('Error getting fridge items:', error);
	}
};

export const addShoppingItem = async (cartItems: Item[]) => {
	try {
		for (const item of cartItems) {
			const result = await addDoc(collectionShoppingListRef, {
				...item,
				userId,
			}).catch((error) => console.error(error));
		}
	} catch (error) {
		console.error('Error adding recipe:', error);
	}
};

export const deleteShoppingItem = async (documentId: string) => {
	try {
		const docToUpdate = doc(collectionShoppingListRef, documentId);
		console.log(docToUpdate);

		await deleteDoc(docToUpdate);
	} catch (error) {
		console.error('Error deleting recipe:', error);
	}
};
