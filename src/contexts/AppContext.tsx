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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC = ({ children }) => {
  const [fridgeItems, setFridgeItems] = useState<Item[]>([]);

  return (
    <AppContext.Provider value={{ fridgeItems, setFridgeItems }}>
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
