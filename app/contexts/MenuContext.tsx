// contexts/MenuContext.tsx
import { createContext, useState, ReactNode, FC } from 'react';

interface MenuContextType {
  isMenuVisible: boolean;
  setIsMenuVisible: (value: boolean) => void;
}

// Provide a default implementation so TS knows these exist
const defaultMenuContext: MenuContextType = {
  isMenuVisible: false,
  setIsMenuVisible: () => {},
};

export const MenuContext = createContext<MenuContextType>(defaultMenuContext);

export const MenuProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <MenuContext.Provider value={{ isMenuVisible, setIsMenuVisible }}>
      {children}
    </MenuContext.Provider>
  );
};
