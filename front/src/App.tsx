import Terminal from "./components/Terminal";
import { AuthProvider } from "./contexts/AuthProvider";
import { TerminalProvider } from "./contexts/TerminalProvider";
import { useAppContext } from "./contexts/AppProvider";

export default function App() {
  const {terminals} = useAppContext();
  const terminalArray = Array.from({ length: terminals }, (_, index) => index);
  return (
    <div
      className={`bg-[url('/wallpaper.png')] bg-cover bg-center bg-no-repeat h-screen grid gap-2 place-items-center font-hack text-xl ${
        terminalArray.length > 1 ? "grid-cols-2" : ""
      }`}
    >
      {terminalArray.map((index) => (
        <AuthProvider>
          <TerminalProvider>
            <Terminal
              //style={index === 0 ? "" : ""}
              key={index}
            />
          </TerminalProvider>
        </AuthProvider>
      ))}
    </div>
  );
}
