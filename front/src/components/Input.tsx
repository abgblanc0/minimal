import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useKeyboard } from "../hooks/useKeyboard";
import { useCommand } from "../hooks/useCommand";

export default function Input() {
  const [input, setInput] = useState("");
  const commands = useCommand();
  const [suggestion, setSuggestion] = useState("");
  const { handleKeyDown } = useKeyboard(input, setInput);
  const inputRef = useRef<HTMLInputElement>(null);
  const sugRef = useRef<HTMLSpanElement>(null)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    const match = Object.keys(commands).find((cmd) => cmd.startsWith(event.target.value));
    setSuggestion(match ? match : "");
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if(sugRef.current)
      sugRef.current.style.marginLeft = `${input.length}rem`
  }, [input])

  return (
    <div className="flex-grow flex">
      <input
        onKeyDown={handleKeyDown}
        value={input}
        ref={inputRef}
        onChange={handleChange}
        className="bg-transparent focus:outline-none flex-grow"
      />
      {suggestion &&
        input &&
        suggestion.startsWith(input) && (
          <span ref={sugRef} className="absolute text-gray-500">{suggestion.slice(input.length)}</span>
        )}
    </div>
  );
}
