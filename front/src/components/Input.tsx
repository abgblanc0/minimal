import { useEffect, useRef, useState } from "react";
import { useKeyboard } from "../hooks/useKeyboard";

export default function Input() {
  const [input, setInput] = useState("");
  const {handleChange, handleKeyDown} = useKeyboard(input, setInput);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <input
        onKeyDown={handleKeyDown}
        value={input}
        ref={inputRef}
        onChange={handleChange}
        className="bg-transparent focus:outline-none flex-grow"
      />
    </>
  );
}
