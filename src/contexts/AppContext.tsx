'use client';
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

import Item from '@/types/item';

interface AppContextType {
  fridgeItems: Item[];
  setFridgeItems: Dispatch<SetStateAction<Item[]>>;
  fetchedRecipesData: string[];
  setFetchedRecipesData: Dispatch<SetStateAction<string[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fridgeItems, setFridgeItems] = useState<Item[]>([]);
  const [fetchedRecipesData, setFetchedRecipesData] = useState<string[]>([]); 

  return (
    <AppContext.Provider value={{ fridgeItems, setFridgeItems, fetchedRecipesData, setFetchedRecipesData }}>
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
