import { KeyboardEvent, useRef, useState } from "react";

interface Props {
  labels: string[];
  setLabels: (asd: string[]) => void;
}
export default function Form({ labels, setLabels }: Props) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log(labels);
      setLabels(labels?.slice(1));
      setInput("");
    }
  };
  return (
    <div>
      <label>{labels[0]}</label>
      <input
        value={input}
        ref={inputRef}
        onKeyDown={handleKeyDown}
        className="bg-transparent focus:outline-none flex-grow"
        type="text"
      />
    </div>
  );
}
