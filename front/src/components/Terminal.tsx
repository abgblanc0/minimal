import { KeyboardEvent, useState, ChangeEvent } from "react";
import commands from "../utils/commands";
interface TerminalProps {
  terminals: number;
  setTerminals: (num: number) => void;
}

export default function Terminal({
  terminals,
  setTerminals,
}: TerminalProps) {
  const prefix = "user@machine:~ $ ";
  const [text, setText] = useState(prefix);
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
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
        const command = text.split("\n").pop()?.split("$")[1].trim();
        setText(text + "\n" + commands(command? command: "") + "\n" + prefix);
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
      className="m-5 p-5 w-full h-full text-white bg-black border-2 rounded-xl focus:outline-none resize-none"
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      spellCheck={false}
    ></textarea>
  );
}
