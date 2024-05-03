import { useState } from "react";
import Terminal from "./components/Terminal";

export default function App() {
  const [terminals, setTerminals] = useState(1);
  const terminalArray = Array.from({ length: terminals }, (_, index) => index);
  return (
    //first:cols-span-1 doesnt work2 or idk how to do it
    <div
      className={`bg-zinc-400 h-screen grid gap-5 place-items-center font-hack text-xl ${
        terminalArray.length > 1 ? "grid-cols-2" : ""
      }`}
    >
      {terminalArray.map((index) => (
        <Terminal
          key={index}
          terminals={terminals}
          setTerminals={setTerminals}
        />
      ))}
    </div>
  );
}
