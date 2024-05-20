import { ChangeEvent, KeyboardEvent } from "react";
import { useAppContext } from "../contexts/AppProvider";
import { useTermContext } from "../contexts/TerminalProvider";
import { useAuth } from "../contexts/AuthProvider";
import { useCommand } from "./useCommand";
import { mergeStringsBetweenQuotes } from "../utils/funcs";

export const useKeyboard = (
  input: string,
  setInput: (input: string) => void
) => {
  const { history, setHistory, dir} = useTermContext();
  const { user } = useAuth();
  const commands = useCommand();
  const { terminals, setTerminals } = useAppContext();
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
        const [command, ...argsr] = input.split(" ");
        const args = mergeStringsBetweenQuotes(argsr);
        const result = commands[command] ? await commands[command](args) : [`${command}: command not found`];
        setHistory([
            ...history,
            {
              username: user?.username,
              dir: dir,
              command: `${command} ${args.join(" ")}`,
              outputs: result,
            },
          ]);
        setInput("");
      }
    }
  };
  return { handleChange, handleKeyDown };
};
