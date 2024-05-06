import { KeyboardEvent, useState, ChangeEvent, useEffect } from "react";
import handleCommand from "../utils/commands";

interface TerminalProps {
  terminals: number;
  style: string;
  setTerminals: (num: number) => void;
}

export default function Terminal({
  terminals,
  style,
  setTerminals,
}: TerminalProps) {
  const [path, setPath] = useState("/");
  const [prefix, setPrefix] = useState(`user@minimal:~${path} $ `);
  const [text, setText] = useState(prefix);
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  useEffect(() => {
    setPrefix(`user@minimal:~${path} $ `)
    setText(prefix)
  }, [path])
  const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if(event.ctrlKey){
      if (event.code === "Enter") {
        setTerminals(terminals + 1);
      }
      // With KeyQ preventdefault doesnt works idk why -.-
      if(event.code === "KeyE") {
        event.preventDefault();
        setTerminals(terminals - 1);
      }
      if(event.code === "KeyL") {
        event.preventDefault();
        setText(prefix);
      }
    }
    else {
      if (event.key === "Enter") {
        event.preventDefault();
        const input = text.split("\n").pop()?.split("$")[1].trim();
        const {command, args} = parseCommand(input? input: "");
        const result = await handleCommand(path, setPath, command, args);
        setText(text + "\n" + result + "\n" + prefix);
      }
      if (event.key === "Backspace") {
        const lastLine = text.split("\n").pop();
        if (lastLine?.length == prefix.length) event.preventDefault();
      }
    }
  };

  return (
    <textarea
      value={text}
      className={`p-5 grow h-full w-full text-white bg-black border-2 rounded-xl focus:outline-none resize-none ${style}`}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      spellCheck={false}
    >
    </textarea>
  );
}

function parseCommand(input: string): { command: string, args: string[] } {
  const parts = input.trim().split(" ");
  const command = parts.shift() || "";
  const args = parts;
  return { command, args };
}