import { createContext, useContext, useState } from "react";
import { Command, Directory } from "../models";

interface TerminalContextType {
  dir: Directory;
  setDir: (dir: Directory) => void;
  history: Command[];
  setHistory: (history: Command[]) => void;
  labels: string[];
  setLabels: (labels: string[]) =>  void;
  type: string;
  setType: (type: string) => void;
  data: FormData;
}

export const home: Directory = {
  ctime: "",
  dirname: "~",
  id: 1,
  username: "root",
};

const TerminalContext = createContext<TerminalContextType | undefined>(
  undefined
);

export const TerminalProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [dir, setDir] = useState<Directory>(home);
  const [history, setHistory] = useState<Command[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [type, setType] = useState("");
  const [data] = useState(new FormData())
  return (
    <TerminalContext.Provider value={{ dir, setDir, history, setHistory, labels, setLabels, type, setType, data }}>
      {children}
    </TerminalContext.Provider>
  );
};

export const useTermContext = () => {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error("useTermContext debe ser usado dentro de un AuthProvider");
  }
  return context;
}