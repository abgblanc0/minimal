import React, { createContext, useContext, useState } from "react";
import { User } from "../models";

// Definimos el tipo para el contexto de autenticación
interface AuthContextType {
  user: User | undefined;
  login: (user: User) => void;
  logout: () => void;
}

// Creamos el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente proveedor de autenticación
export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();

  // Función para iniciar sesión
  const login = (user: User) => {
    setUser(user);
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(undefined);
  };

  // Retornamos el proveedor con el contexto y los valores de estado y funciones de autenticación
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
