import { useState } from "react";
import Terminal from "./components/Terminal";
import { AuthProvider } from "./components/AuthProvider";

export default function App() {
  const [terminals, setTerminals] = useState(1);
  const terminalArray = Array.from({ length: terminals }, (_, index) => index);
  return (
    <AuthProvider>
      <div
        className={`bg-[url('/wallpaper.png')] bg-cover bg-center bg-no-repeat h-screen grid gap-2 place-items-center font-hack text-xl ${
          terminalArray.length > 1 ? "grid-cols-2" : ""
        }`}
      >
        {terminalArray.map((index) => (
          <Terminal
            style={index === 0 ? "" : ""}
            key={index}
            terminals={terminals}
            setTerminals={setTerminals}
          />
        ))}
      </div>
    </AuthProvider>
  );
}
