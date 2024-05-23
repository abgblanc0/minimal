import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useKeyboard } from "../hooks/useKeyboard";
import { useCommand } from "../hooks/useCommand";

export default function Input() {
  const [input, setInput] = useState("");
  const commands = useCommand();
  const [suggestion, setSuggestion] = useState("");
  const { handleKeyDown } = useKeyboard(input, setInput);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    const match = Object.keys(commands).find((cmd) =>
      cmd.startsWith(event.target.value)
    );
    setSuggestion(match ? match : "");
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <div className="flex-grow flex">
      <input
        onKeyDown={handleKeyDown}
        value={input}
        ref={inputRef}
        onChange={handleChange}
        className={`bg-transparent text-transparent caret-g ${input == "" ? "caret-white" : "caret-gray-500"} focus:outline-none flex-grow`}
      />
      <div className="absolute">
        {input &&
          input.split("").map((ltr, index) => (
            <span key={index}>
              {ltr}
            </span>
          ))}
        {suggestion && input && suggestion.startsWith(input) && (
          <span className="text-gray-500">
            {suggestion.slice(input.length)}
          </span>
        )}
      </div>
    </div>
  );
}