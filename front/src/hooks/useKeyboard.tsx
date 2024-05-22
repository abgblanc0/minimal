import { KeyboardEvent, useRef } from "react";
import { useAppContext } from "../contexts/AppProvider";
import { useTermContext } from "../contexts/TerminalProvider";
import { useAuth } from "../contexts/AuthProvider";
import { useCommand } from "./useCommand";
import { mergeStringsBetweenQuotes } from "../utils/funcs";

export const useKeyboard = (
  input: string,
  setInput: (input: string) => void
) => {
  const { history, setHistory, dir } = useTermContext();
  const { user } = useAuth();
  const historyIndex = useRef(-1);
  const commands = useCommand();
  const { terminals, setTerminals } = useAppContext();

  
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
        const result = commands[command]
          ? await commands[command](args)
          : [`${command}: command not found`];
        setHistory([
          ...history,
          {
            username: user?.username,
            dir: dir,
            command: `${input}`,
            outputs: result,
          },
        ]);
        setInput("");
      } else if (event.key === "ArrowUp") {
        if (historyIndex.current < history.length - 1) {
          historyIndex.current++;

          setInput(history[history.length - 1 - historyIndex.current].command);
        }

        event.preventDefault();
      } else if (event.key === "ArrowDown") {
        if (historyIndex.current > -1) {
          historyIndex.current--;
          setInput(
            historyIndex.current >= 0
              ? history[history.length - 1 - historyIndex.current].command
              : ""
          );
        }
        event.preventDefault();
      } else if (event.key === "Tab") {
        event.preventDefault();

        const autoCompleteCommand = Object.keys(commands).find((cmd) =>
          cmd.startsWith(input)
        );

        if (autoCompleteCommand) {
          setInput(autoCompleteCommand);
        }
      }
    }
  };
  return { handleKeyDown };
};
