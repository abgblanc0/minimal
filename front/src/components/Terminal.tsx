import Input from "./Input";
import Prefix from "./Prefix";
import History from "./History";
import { useState } from "react";
import { Command } from "../types";
import { useAuth } from "./AuthProvider";

interface TerminalProps {
  terminals: number;
  setTerminals: (terminals: number) => void;
}

export default function Terminal({ terminals, setTerminals }: TerminalProps) {
  const { user } = useAuth();
  const [history, setHistory] = useState<Command[]>([]);
  const [path, setPath] = useState("");

  return (
    <div
      className={`p-5 grow h-[95%] w-[95%] text-white bg-black/60 border-2 rounded-xl focus:outline-none resize-none overflow-auto`}
    >
      <History history={history} />
      <div className="flex gap-2">
        <Prefix path={path} username={user?.username} />
        <Input
          terminals={terminals}
          setTerminals={setTerminals}
          history={history}
          setHistory={setHistory}
          path={path}
          setPath={setPath}
          user={user!}
        />
      </div>
    </div>
  );
}
