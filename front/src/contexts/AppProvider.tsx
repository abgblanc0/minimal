import { createContext, useContext, useState } from "react";

interface AppContextType {
    terminals: number;
    setTerminals: (terminals: number) => void;
}
  
  const AppContext = createContext<AppContextType | undefined>(
    undefined
  );
  
  export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
  }) => {
    const [terminals, setTerminals] = useState(1);
    return (
      <AppContext.Provider value={{ terminals, setTerminals }}>
        {children}
      </AppContext.Provider>
    );
  };
  
  export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error("useAppContext debe ser usado dentro de un AppProvider");
    }
    return context;
  }