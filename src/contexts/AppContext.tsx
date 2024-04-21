'use client';
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

import Item from '@/types/item';
import RecipeData from '@/types/recipe';
import NewRrcipeData from '@/types/newRrcipeData';

interface AppContextType {
  fridgeItems: Item[];
  setFridgeItems: Dispatch<SetStateAction<Item[]>>;
  fetchedRecipesData: RecipeData[];
  setFetchedRecipesData: Dispatch<SetStateAction<RecipeData[]>>;
  addedRecipes: NewRrcipeData[];
  setAddedRecipes: Dispatch<SetStateAction<NewRrcipeData[]>>;
  cartItems: Item[];
  setCartItems: Dispatch<SetStateAction<Item[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [fridgeItems, setFridgeItems] = useState<Item[]>([]);
  const [fetchedRecipesData, setFetchedRecipesData] = useState<RecipeData[]>(
    []
  );
  const [addedRecipes, setAddedRecipes] = useState<NewRrcipeData[]>([]);
  const [cartItems, setCartItems] = useState<Item[]>([]);

  return (
    <AppContext.Provider
      value={{
        fridgeItems,
        setFridgeItems,
        addedRecipes,
        setAddedRecipes,
        fetchedRecipesData,
        setFetchedRecipesData,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within a AppProvider');
  }
  return context;
};
