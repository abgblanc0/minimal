import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import handleCommand from "../utils/commands";
import { useAuth } from "./AuthProvider";
import { Command } from "../models";
import { Directory } from "../models/directory";
import { User } from "../models/user";

type InputProps = {
  setType: (type: string) => void;
  terminals: number;
  setTerminals: (terminals: number) => void;
  setLabels: (labels: string[]) => void;
  dir: Directory;
  setDir: (dir: Directory) => void;
  history: Command[];
  setHistory: (newHistory: Command[]) => void;
  user?: User;
};

export default function Input({
  setType,
  terminals,
  setTerminals,
  setLabels,
  dir,
  setDir,
  history,
  setHistory,
  user,
}: InputProps) {
  const { logout } = useAuth();
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
      if (event.key == "Enter") {
        setTerminals(terminals + 1);
      }
      if (event.key == "e") {
        event.preventDefault();
        setTerminals(terminals - 1);
      }
      if (event.key == "l") {
        event.preventDefault();
        setHistory([]);
      }
    } else {
      if (event.key == "Enter") {
        const [command, ...args] = input.split(" ");
        const output = await handleCommand(
          command,
          args,
          setLabels,
          dir,
          setDir,
          logout,
          setType,
          user
        );
        setHistory([
          ...history,
          {
            username: user?.username,
            dir: dir,
            command: `${command} ${args.join(" ")}`,
            outputs: output,
          },
        ]);
        setInput("");
      }
    }
  };
  return (
    <div>
      <input
        onKeyDown={handleKeyDown}
        value={input}
        ref={inputRef}
        onChange={handleChange}
        className="bg-transparent focus:outline-none flex-grow"
      />
    </div>
  );
}
