import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useTermContext } from "../contexts/TerminalProvider";
import { useKeyboard } from "../hooks/useKeyboard";

export default function Form() {
  const [input, setInput] = useState("");
  const {handleChange} = useKeyboard(input, setInput)
  const {labels, setLabels, data} = useTermContext();
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      data.set(labels[0].trim().slice(0,-1), input);
      setLabels(labels?.slice(1));
      setInput("");
    }
  };
  return (
    <div>
      <label>{labels[0]}</label>
      <input
        onChange={handleChange}
        value={input}
        ref={inputRef}
        onKeyDown={handleKeyDown}
        className="bg-transparent focus:outline-none flex-grow"
        type="text"
      />
    </div>
  );
}
