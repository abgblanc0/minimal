import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import handleCommand from "../utils/commands";
import { useAuth } from "./AuthProvider";
import { Command, User } from "../types";

type InputProps = {
  terminals: number;
  setTerminals: (terminals: number) => void;
  path: string;
  setPath: (newPath: string) => void;
  history: Command[];
  setHistory: (newHistory: Command[]) => void;
  user?: User
};

export default function Input({
  terminals,
  setTerminals,
  path,
  setPath,
  history,
  setHistory,
  user
}: InputProps) {
  const { login, logout } = useAuth();
  const [input, setInput] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey) {
        if(event.key == "Enter"){
            setTerminals(terminals + 1);
        }
        if(event.key == "e") {
            event.preventDefault();
            setTerminals(terminals - 1);
        }
        if(event.key == "l"){
            event.preventDefault();
            setHistory([]);
        }
    } else {
      if (event.key == "Enter") {
        const [command, ...args] = input.split(" ");
        const output = await handleCommand(
          command,
          args,
          path,
          setPath,
          login,
          logout,
          user
        );
        setHistory([...history, { username: user?.username, path: path, command: `${command} ${args}`, outputs: output }]);
        setInput("");
      }
    }
  };
  return (
    <input
      onKeyDown={handleKeyDown}
      value={input}
      ref={inputRef}
      onChange={handleChange}
      className="bg-transparent focus:outline-none flex-grow"
    />
  );
}
