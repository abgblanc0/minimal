import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

interface Props {
  labels: string[];
  setLabels: (asd: string[]) => void;
  data: FormData;
}
export default function Form({labels, setLabels, data }: Props) {
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
    if (event.key === "Enter") {
      data.set(labels[0].trim().toLocaleLowerCase().slice(0,-1), input);
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
